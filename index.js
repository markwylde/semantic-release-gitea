/* eslint require-atomic-updates: off */

import {defaultTo, castArray} from 'lodash-es';
import verifyGitea from './lib/verify.js';
import addChannelGitea from './lib/add-channel.js';
import publishGitea from './lib/publish.js';

let verified;

async function verifyConditions(pluginConfig, context) {
  const {options} = context;
  // If the Gitea publish plugin is used and has `assets`, `labels` or `assignees` configured, validate it now in order to prevent any release if the configuration is wrong
  if (options.publish) {
    const publishPlugin =
      castArray(options.publish).find(
        (config) =>
          config.path && config.path === '@markwylde/semantic-release-gitea',
      ) || {};

    pluginConfig.assets = defaultTo(pluginConfig.assets, publishPlugin.assets);
  }

  await verifyGitea(pluginConfig, context);
  verified = true;
}

async function publish(pluginConfig, context) {
  if (!verified) {
    await verifyGitea(pluginConfig, context);
    verified = true;
  }

  return publishGitea(pluginConfig, context);
}

async function addChannel(pluginConfig, context) {
  if (!verified) {
    await verifyGitea(pluginConfig, context);
    verified = true;
  }

  return addChannelGitea(pluginConfig, context);
}

function resetVerified() {
  verified = false;
}

export {verifyConditions, addChannel, publish, resetVerified};
