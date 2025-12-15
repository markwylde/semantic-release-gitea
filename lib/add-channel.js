import debug from 'debug';
import {RELEASE_NAME} from './definitions/constants.js';
import parseGitUrl from './parse-git-url.js';
import resolveConfig from './resolve-config.js';
import getClient from './get-client.js';
import isPrerelease from './is-prerelease.js';

const debugLog = debug('markwylde:semantic-release-gitea');

const addChannel = async (pluginConfig, context) => {
  const {
    options: {repositoryUrl},
    branch,
    nextRelease: {name, gitTag, notes},
    logger,
  } = context;
  const {giteaToken, giteaUrl, giteaApiPathPrefix} = resolveConfig(
    pluginConfig,
    context,
  );
  const {owner, repo} = parseGitUrl(repositoryUrl);
  const gitea = getClient(giteaToken, giteaUrl, giteaApiPathPrefix);
  let releaseId;

  const release = {
    prerelease: isPrerelease(branch),
    tag_name: gitTag,
    name,
  };
  debugLog('release object: %O', release);

  let hasTag = true;
  try {
    const releaseByTag = await gitea.getReleaseByTag(owner, repo, gitTag);
    releaseId = releaseByTag.id;
  } catch (error) {
    if (Object.hasOwn(error, 'response') && error.response.statusCode === 404) {
      hasTag = false;
    } else {
      throw error;
    }
  }

  let url = '';

  if (hasTag) {
    debugLog('release release_id: %o', releaseId);

    const responseUpdate = await gitea.updateRelease(
      owner,
      repo,
      releaseId,
      release,
    );
    const parsedResponseUpdate = JSON.parse(responseUpdate.body);
    url = parsedResponseUpdate.url;

    logger.log('Updated Gitea release: %s', url);
  } else {
    logger.log('There is no release for tag %s, creating a new one', gitTag);

    release.body = notes;
    const response = await gitea.createRelease(owner, repo, release);
    const parsedResponse = JSON.parse(response.body);
    url = parsedResponse.url;

    logger.log('Published Gitea release: %s', url);
  }

  return {url, name: RELEASE_NAME};
};

export default addChannel;
