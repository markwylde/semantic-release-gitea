import SemanticReleaseError from '@semantic-release/error';
import ERROR_DEFINITIONS from './definitions/errors.js';

const getError = (code, context = {}) => {
  const {message, details} = ERROR_DEFINITIONS[code](context);
  return new SemanticReleaseError(message, code, details);
};

export default getError;
