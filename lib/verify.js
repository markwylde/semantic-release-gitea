import {isString, isPlainObject, isNil, isArray} from 'lodash-es';
import urlJoin from 'url-join';
import AggregateError from 'aggregate-error';
import parseGitUrl from './parse-git-url.js';
import resolveConfig from './resolve-config.js';
import getClient from './get-client.js';
import getError from './get-error.js';

const isNonEmptyString = (value) => isString(value) && value.trim();
const isStringOrStringArray = (value) =>
  isNonEmptyString(value) ||
  (isArray(value) && value.every((v) => isNonEmptyString(v)));
const isArrayOf = (validator) => (array) =>
  isArray(array) && array.every((value) => validator(value));

const VALIDATORS = {
  /**
   * @use getError.EINVALIDASSETS
   */
  assets: isArrayOf(
    (asset) =>
      isStringOrStringArray(asset) ||
      (isPlainObject(asset) && isStringOrStringArray(asset.path)),
  ),
};

const verify = async (pluginConfig, context) => {
  const {
    options: {repositoryUrl},
    logger,
  } = context;
  const {giteaToken, giteaUrl, giteaApiPathPrefix, ...options} = resolveConfig(
    pluginConfig,
    context,
  );

  const errors = [];
  for (const [option, value] of Object.entries({...options})) {
    if (!isNil(value) && !VALIDATORS[option](value)) {
      errors.push(
        getError(`EINVALID${option.toUpperCase()}`, {[option]: value}),
      );
    }
  }

  const {repo, owner} = parseGitUrl(repositoryUrl);

  if (!giteaUrl) {
    errors.push(getError('ENOGITEAURL'));
  }

  if (!giteaToken) {
    errors.push(getError('ENOGITEATOKEN', {owner, repo}));
  }

  if (!owner || !repo) {
    errors.push(getError('EINVALIDGITEAURL'));
  } else if (giteaUrl && giteaToken) {
    logger.log(
      'Verify Gitea authentication (' +
        urlJoin(giteaUrl, giteaApiPathPrefix) +
        ')',
    );
    try {
      const gitea = getClient(giteaToken, giteaUrl, giteaApiPathPrefix);
      const response = await gitea.getRepo(repo, owner);
      const parsedResponse = JSON.parse(response.body);
      if (!parsedResponse.permissions.push) {
        errors.push(getError('EGITEANOPERMISSION', {owner, repo}));
      }
    } catch (error) {
      if (Object.hasOwn(error, 'response')) {
        switch (error.response.statusCode) {
          case 401: {
            errors.push(getError('EINVALIDGITEATOKEN', {owner, repo}));
            break;
          }

          case 404: {
            errors.push(getError('EMISSINGREPO', {owner, repo}));
            break;
          }

          default: {
            throw error;
          }
        }
      } else {
        throw error;
      }
    }
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
};

export default verify;
