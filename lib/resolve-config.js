import {castArray} from 'lodash-es';

const resolveConfig = ({giteaUrl, giteaApiPathPrefix, assets}, {env}) => ({
  giteaToken: env.GITEA_TOKEN,
  giteaUrl: giteaUrl || env.GITEA_URL,
  giteaApiPathPrefix: giteaApiPathPrefix || env.GITEA_PREFIX || '/api/v1',
  assets: assets ? castArray(assets) : assets,
});

export default resolveConfig;
