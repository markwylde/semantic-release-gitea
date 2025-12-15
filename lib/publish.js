import path from 'node:path';
import fsExtra from 'fs-extra';
import {isPlainObject, template} from 'lodash-es';
import debug from 'debug';
import {RELEASE_NAME} from './definitions/constants.js';
import parseGitUrl from './parse-git-url.js';
import globAssets from './glob-assets.js';
import resolveConfig from './resolve-config.js';
import getClient from './get-client.js';
import isPrerelease from './is-prerelease.js';
import getError from './get-error.js';

const {stat} = fsExtra;

const debugLog = debug('markwylde:semantic-release-gitea');

const publish = async (pluginConfig, context) => {
  const {
    cwd,
    options: {repositoryUrl},
    branch,
    nextRelease: {name, gitTag, notes},
    logger,
  } = context;
  const {giteaToken, giteaUrl, giteaApiPathPrefix, assets} = resolveConfig(
    pluginConfig,
    context,
  );
  const {owner, repo} = parseGitUrl(repositoryUrl);
  const gitea = getClient(giteaToken, giteaUrl, giteaApiPathPrefix);
  const release = {
    tag_name: gitTag,
    name,
    body: notes,
    prerelease: isPrerelease(branch),
  };

  debugLog('release object: %O', release);

  // When there are no assets, we publish a release directly
  if (!assets || assets.length === 0) {
    const responseDirectRelease = await gitea.createRelease(
      owner,
      repo,
      release,
    );
    const parsedResponseDirectRelease = JSON.parse(responseDirectRelease.body);
    const releaseUrl = parsedResponseDirectRelease.url;

    logger.log('Published Gitea release: %s', releaseUrl);
    return {url: releaseUrl, name: RELEASE_NAME};
  }

  // We'll create a draft release, append the assets to it, and then publish it.
  // This is so that the assets are available when we get a Gitea release event.
  const draftRelease = {...release, draft: true};

  const response = await gitea.createRelease(owner, repo, draftRelease);
  const parsedResponse = JSON.parse(response.body);
  const releaseId = parsedResponse.id;

  // Append assets to the release
  const globbedAssets = await globAssets(context, assets);
  debugLog('globed assets: %o', globbedAssets);

  await Promise.all(
    globbedAssets.map(async (asset) => {
      const filePath = template(isPlainObject(asset) ? asset.path : asset)(
        context,
      );
      const fullFilePath = path.resolve(cwd, filePath);
      let file;

      try {
        file = await stat(fullFilePath);
      } catch {
        logger.error(
          'The asset %s cannot be read, and will be ignored.',
          filePath,
        );
        return;
      }

      if (!file || !file.isFile()) {
        logger.error(
          'The asset %s is not a file, and will be ignored.',
          filePath,
        );
        return;
      }

      let assetName = template(asset.name || path.basename(filePath))(context);

      debugLog('file path: %o', filePath);
      debugLog('asset name: %o', assetName);

      if (isPlainObject(asset) && asset.label) {
        assetName = template(asset.label)(context);
      }

      try {
        const responseAsset = await gitea.createReleaseAsset(
          owner,
          repo,
          releaseId,
          {name: assetName, filePath: fullFilePath},
        );
        const parsedResponseAsset = JSON.parse(responseAsset.body);
        const downloadUrl = parsedResponseAsset.browser_download_url;
        logger.log('Published file %s', downloadUrl);
      } catch (error) {
        logger.log('API error while publishing file %s', filePath);
        if (
          Object.hasOwn(error, 'response') &&
          error.response.body.length > 0
        ) {
          const errorBody = JSON.parse(error.response.body);
          throw getError('EGITEAAPIERROR', {message: errorBody.message});
        }

        throw error;
      }
    }),
  );

  const responseUpdate = await gitea.updateRelease(owner, repo, releaseId, {
    draft: false,
  });
  const parsedResponseUpdate = JSON.parse(responseUpdate.body);
  const {url} = parsedResponseUpdate;

  logger.log('Published Gitea release: %s', url);
  return {url, name: RELEASE_NAME};
};

export default publish;
