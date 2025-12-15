import {createReadStream} from 'node:fs';
import FormData from 'form-data';
import got from 'got';
import urlJoin from 'url-join';

class GiteaClient {
  constructor(giteaToken, giteaUrl, giteaApiPathPrefix) {
    this.baseUrl = urlJoin(giteaUrl, giteaApiPathPrefix);
    this.token = giteaToken;
  }

  _makeRequest(verb, apiPath, body) {
    const fullUrl = urlJoin(this.baseUrl, apiPath);
    const apiOptions = {
      headers: {
        Authorization: 'token ' + this.token,
        'Content-Type': 'application/json',
      },
    };

    if (body instanceof FormData) {
      delete apiOptions.headers['Content-Type'];
    } else if (typeof body === 'object') {
      body = JSON.stringify(body);
    }

    switch (verb) {
      case 'post': {
        return got.post(fullUrl, {...apiOptions, body});
      }

      case 'patch': {
        return got.patch(fullUrl, {...apiOptions, body});
      }

      default: {
        return got.get(fullUrl, apiOptions);
      }
    }
  }

  createReleaseAsset(owner, repo, releaseId, asset) {
    const form = new FormData();
    form.append('attachment', createReadStream(asset.filePath));

    return this._makeRequest(
      'post',
      `/repos/${owner}/${repo}/releases/${releaseId}/assets?name=${encodeURIComponent(asset.name)}`,
      form,
    );
  }

  updateRelease(owner, repo, releaseId, data) {
    return this._makeRequest(
      'patch',
      `/repos/${owner}/${repo}/releases/${releaseId}`,
      data,
    );
  }

  createRelease(owner, repo, release) {
    return this._makeRequest(
      'post',
      `/repos/${owner}/${repo}/releases`,
      release,
    );
  }

  async getReleaseByTag(owner, repo, gitTag) {
    let page = 1;
    let releases = [];
    do {
      // eslint-disable-next-line no-await-in-loop
      const request = await this._makeRequest(
        'get',
        `/repos/${owner}/${repo}/releases?page=${page}`,
      );
      releases = JSON.parse(request.body);

      for (const release of releases) {
        if (release.tag_name === gitTag) {
          return release;
        }
      }

      page += 1;
    } while (releases.length > 0);

    const error = new Error('Release not found');
    error.response = {statusCode: 404};
    throw error;
  }

  getRepo(repo, owner) {
    return this._makeRequest('get', `/repos/${owner}/${repo}`);
  }
}

const getClient = (giteaToken, giteaUrl, giteaApiPathPrefix) =>
  new GiteaClient(giteaToken, giteaUrl, giteaApiPathPrefix);

export default getClient;
