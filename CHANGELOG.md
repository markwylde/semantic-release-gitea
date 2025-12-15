# [2.2.0](https://github.com/markwylde/semantic-release-gitea/compare/v2.1.4...v2.2.0) (2025-12-15)


### Bug Fixes

* correct package version to 2.1.4 ([f8ff479](https://github.com/markwylde/semantic-release-gitea/commit/f8ff479c503371220a167a7d0edc7d2264b1f636))


### Features

* update README and remove broken links ([f6634bb](https://github.com/markwylde/semantic-release-gitea/commit/f6634bb2db7db8566c7e92accc33f089309261d8))

# [1.1.0](https://github.com/markwylde/semantic-release-gitea/compare/v1.0.0...v1.1.0) (2025-12-15)


### Features

* update README and remove broken links ([f6634bb](https://github.com/markwylde/semantic-release-gitea/commit/f6634bb2db7db8566c7e92accc33f089309261d8))

# 1.0.0 (2025-12-15)


### Bug Fixes

* asset upload ([84cd6f8](https://github.com/markwylde/semantic-release-gitea/commit/84cd6f84d96056307b7d3d1afdd80d72c8de5c84))
* package.json & package-lock.json to reduce vulnerabilities ([b4332ad](https://github.com/markwylde/semantic-release-gitea/commit/b4332ad07a9dfb228364db91c50830b7ff2ec8fa))
* request body ([e95100a](https://github.com/markwylde/semantic-release-gitea/commit/e95100ae1211abcce8a9df471a22db562dea09ca))
* Set Content-Type for requests ([c81b435](https://github.com/markwylde/semantic-release-gitea/commit/c81b435f7cce7f0786ddc63b304ff8f14a076b3d))
* set npm publish access to public ([f123711](https://github.com/markwylde/semantic-release-gitea/commit/f123711467fa7a35c622e3a087e72a78e320d460))
* use @semantic-release/github instead of gitea plugin ([4832484](https://github.com/markwylde/semantic-release-gitea/commit/4832484c7483db50d60e6a0b7ee89f0881bc9aac))
* Use correct authorization header ([799e993](https://github.com/markwylde/semantic-release-gitea/commit/799e993646b37f1f6341f01089b8f066143a7990))


### chore

* convert to ES Modules and update dependencies ([#1](https://github.com/markwylde/semantic-release-gitea/issues/1)) ([bc526a1](https://github.com/markwylde/semantic-release-gitea/commit/bc526a10d97d89512d45842aaae08de19a61d57d))


### Features

* Adds GitHub plugin codebase and adjust environments for Gitea ([318364a](https://github.com/markwylde/semantic-release-gitea/commit/318364aefd8bcf18fe73bff3e6c0eb31583a24db))
* Adjust addchannel for Gitea API ([8a754b4](https://github.com/markwylde/semantic-release-gitea/commit/8a754b4b4798a3715e54bd534f4ca8c495cf4e6f))
* Adjusts release publishing to Gitea API ([4a4e110](https://github.com/markwylde/semantic-release-gitea/commit/4a4e110216c78f8ff102a3f41b1d5641a5f5503c))
* Adjusts verification to Gitea api. Drop proxy and rate limit ([fb8f6f8](https://github.com/markwylde/semantic-release-gitea/commit/fb8f6f8f740049267ba4838d00899e0f76b01ce1))
* Display error from Gitea API if available ([d8a2de2](https://github.com/markwylde/semantic-release-gitea/commit/d8a2de29b69134f90d1dfb41ceb959ccc8eab3d0))
* process asset path as a template ([e061d07](https://github.com/markwylde/semantic-release-gitea/commit/e061d079e6e8d6fbe83a158727a415050cdc288a))
* Removes labels, assignees and releasedLabels feature due to missing update tasks ([1ba2f80](https://github.com/markwylde/semantic-release-gitea/commit/1ba2f800ad9b1ca1ff5967acbf82aad257e2851a))
* Removes success and fail feature because of missing issue actions in Gitea ([fb9055c](https://github.com/markwylde/semantic-release-gitea/commit/fb9055c701aeb9fa15604202cb91a1e36006ca0f))
* Removes unused fixtures and dependencies ([ccf0ae9](https://github.com/markwylde/semantic-release-gitea/commit/ccf0ae92a7dbffb2e06bf00e40e65cb460106e79))
* set fixed Node versions ([f833dcd](https://github.com/markwylde/semantic-release-gitea/commit/f833dcdf9929b5248803c410751b4d01da1ba39f))
* **tests:** Adjust verify test after string changed ([6a53b54](https://github.com/markwylde/semantic-release-gitea/commit/6a53b547ab1d9cd83a8a2d2b5a8d57db4fca5143))
* **tests:** Fixes add-channel test ([57f3989](https://github.com/markwylde/semantic-release-gitea/commit/57f39893a57e6f9822df7c838f939f43b4f241fc))
* **tests:** Fixes integration test ([f49e128](https://github.com/markwylde/semantic-release-gitea/commit/f49e128cf22f46dd78f35994fb69be36f7adb8fa))
* **tests:** Fixes publish test ([e17c806](https://github.com/markwylde/semantic-release-gitea/commit/e17c806db7b7280e516fcf7d0549788888ea79a6))
* **tests:** Fixes verify test ([20d9fe7](https://github.com/markwylde/semantic-release-gitea/commit/20d9fe7b9eae2f720dfbbb2e1c2d4985cbf4365b))


### BREAKING CHANGES

* This package now uses ES Modules instead of CommonJS.
Node.js 18+ is required.

- Replace require() with import statements
- Replace module.exports with export default/named exports
- Use lodash-es instead of lodash
- Use node: protocol for built-in modules
- Update code style to match xo linting rules

* feat!: update dependencies and package configuration
* Minimum Node.js version is now 18.0.0

- Rename package to @markwylde/semantic-release-gitea
- Add "type": "module" for ES Modules support
- Update all dependencies to latest versions
- Replace lodash with lodash-es
- Update repository URLs to new location
- Remove commitizen configuration
- Update devDependencies for modern tooling

* test: update tests for ES Modules compatibility

- Convert test files to use ES Module imports
- Update mocking strategy for ESM compatibility
- Fix test assertions for updated library behavior
- Update nock usage for latest version

* build(release): update semantic-release configuration

- Use @markwylde/semantic-release-gitea for releases
- Configure npm publishing settings
- Update repository URL
- Remove shared config dependency

* chore: remove sonar-project.properties

SonarCloud configuration is no longer needed for this fork.

* ci: update test workflow

- Remove Sonar step from test workflow
- Simplify CI configuration

* docs(changelog): update changelog for recent releases

* build(release): use GitHub repository URL

* ci: update Node.js versions to 18, 20, 22, 24

Update test matrix to use modern Node.js versions that support
ES Modules and the node: protocol. Also update GitHub Actions
to v4.

* fix: build

* fix: build
* The package can only be installed with the following node versions: 10, 11, 12, >=14

# 1.0.0 (2025-12-15)


### Bug Fixes

* asset upload ([84cd6f8](https://github.com/markwylde/semantic-release-gitea/commit/84cd6f84d96056307b7d3d1afdd80d72c8de5c84))
* package.json & package-lock.json to reduce vulnerabilities ([b4332ad](https://github.com/markwylde/semantic-release-gitea/commit/b4332ad07a9dfb228364db91c50830b7ff2ec8fa))
* request body ([e95100a](https://github.com/markwylde/semantic-release-gitea/commit/e95100ae1211abcce8a9df471a22db562dea09ca))
* Set Content-Type for requests ([c81b435](https://github.com/markwylde/semantic-release-gitea/commit/c81b435f7cce7f0786ddc63b304ff8f14a076b3d))
* set npm publish access to public ([f123711](https://github.com/markwylde/semantic-release-gitea/commit/f123711467fa7a35c622e3a087e72a78e320d460))
* use @semantic-release/github instead of gitea plugin ([4832484](https://github.com/markwylde/semantic-release-gitea/commit/4832484c7483db50d60e6a0b7ee89f0881bc9aac))
* Use correct authorization header ([799e993](https://github.com/markwylde/semantic-release-gitea/commit/799e993646b37f1f6341f01089b8f066143a7990))


### chore

* convert to ES Modules and update dependencies ([#1](https://github.com/markwylde/semantic-release-gitea/issues/1)) ([bc526a1](https://github.com/markwylde/semantic-release-gitea/commit/bc526a10d97d89512d45842aaae08de19a61d57d))


### Features

* Adds GitHub plugin codebase and adjust environments for Gitea ([318364a](https://github.com/markwylde/semantic-release-gitea/commit/318364aefd8bcf18fe73bff3e6c0eb31583a24db))
* Adjust addchannel for Gitea API ([8a754b4](https://github.com/markwylde/semantic-release-gitea/commit/8a754b4b4798a3715e54bd534f4ca8c495cf4e6f))
* Adjusts release publishing to Gitea API ([4a4e110](https://github.com/markwylde/semantic-release-gitea/commit/4a4e110216c78f8ff102a3f41b1d5641a5f5503c))
* Adjusts verification to Gitea api. Drop proxy and rate limit ([fb8f6f8](https://github.com/markwylde/semantic-release-gitea/commit/fb8f6f8f740049267ba4838d00899e0f76b01ce1))
* Display error from Gitea API if available ([d8a2de2](https://github.com/markwylde/semantic-release-gitea/commit/d8a2de29b69134f90d1dfb41ceb959ccc8eab3d0))
* process asset path as a template ([e061d07](https://github.com/markwylde/semantic-release-gitea/commit/e061d079e6e8d6fbe83a158727a415050cdc288a))
* Removes labels, assignees and releasedLabels feature due to missing update tasks ([1ba2f80](https://github.com/markwylde/semantic-release-gitea/commit/1ba2f800ad9b1ca1ff5967acbf82aad257e2851a))
* Removes success and fail feature because of missing issue actions in Gitea ([fb9055c](https://github.com/markwylde/semantic-release-gitea/commit/fb9055c701aeb9fa15604202cb91a1e36006ca0f))
* Removes unused fixtures and dependencies ([ccf0ae9](https://github.com/markwylde/semantic-release-gitea/commit/ccf0ae92a7dbffb2e06bf00e40e65cb460106e79))
* set fixed Node versions ([f833dcd](https://github.com/markwylde/semantic-release-gitea/commit/f833dcdf9929b5248803c410751b4d01da1ba39f))
* **tests:** Adjust verify test after string changed ([6a53b54](https://github.com/markwylde/semantic-release-gitea/commit/6a53b547ab1d9cd83a8a2d2b5a8d57db4fca5143))
* **tests:** Fixes add-channel test ([57f3989](https://github.com/markwylde/semantic-release-gitea/commit/57f39893a57e6f9822df7c838f939f43b4f241fc))
* **tests:** Fixes integration test ([f49e128](https://github.com/markwylde/semantic-release-gitea/commit/f49e128cf22f46dd78f35994fb69be36f7adb8fa))
* **tests:** Fixes publish test ([e17c806](https://github.com/markwylde/semantic-release-gitea/commit/e17c806db7b7280e516fcf7d0549788888ea79a6))
* **tests:** Fixes verify test ([20d9fe7](https://github.com/markwylde/semantic-release-gitea/commit/20d9fe7b9eae2f720dfbbb2e1c2d4985cbf4365b))


### BREAKING CHANGES

* This package now uses ES Modules instead of CommonJS.
Node.js 18+ is required.

- Replace require() with import statements
- Replace module.exports with export default/named exports
- Use lodash-es instead of lodash
- Use node: protocol for built-in modules
- Update code style to match xo linting rules

* feat!: update dependencies and package configuration
* Minimum Node.js version is now 18.0.0

- Rename package to @markwylde/semantic-release-gitea
- Add "type": "module" for ES Modules support
- Update all dependencies to latest versions
- Replace lodash with lodash-es
- Update repository URLs to new location
- Remove commitizen configuration
- Update devDependencies for modern tooling

* test: update tests for ES Modules compatibility

- Convert test files to use ES Module imports
- Update mocking strategy for ESM compatibility
- Fix test assertions for updated library behavior
- Update nock usage for latest version

* build(release): update semantic-release configuration

- Use @markwylde/semantic-release-gitea for releases
- Configure npm publishing settings
- Update repository URL
- Remove shared config dependency

* chore: remove sonar-project.properties

SonarCloud configuration is no longer needed for this fork.

* ci: update test workflow

- Remove Sonar step from test workflow
- Simplify CI configuration

* docs(changelog): update changelog for recent releases

* build(release): use GitHub repository URL

* ci: update Node.js versions to 18, 20, 22, 24

Update test matrix to use modern Node.js versions that support
ES Modules and the node: protocol. Also update GitHub Actions
to v4.

* fix: build

* fix: build
* The package can only be installed with the following node versions: 10, 11, 12, >=14

## [2.1.4](https://git.i.wylde.net/markwylde/semantic-release-gitea/compare/v2.1.3...v2.1.4) (2025-12-15)


### Bug Fixes

* **ci:** use GITEA_TOKEN secret for package publishing ([52605e8](https://git.i.wylde.net/markwylde/semantic-release-gitea/commit/52605e8f491582217e370582fb52df59116ac08e))

## [2.1.3](https://git.i.wylde.net/markwylde/semantic-release-gitea/compare/v2.1.2...v2.1.3) (2025-12-15)


### Bug Fixes

* **ci:** configure npm to publish to Gitea registry ([35c3bbf](https://git.i.wylde.net/markwylde/semantic-release-gitea/commit/35c3bbf6f8900a0c07325854e4c427dbe662580c))

## [2.1.2](https://git.i.wylde.net/markwylde/semantic-release-gitea/compare/v2.1.1...v2.1.2) (2025-12-15)


### Bug Fixes

* **ci:** use automatic github.token instead of secrets ([94fcdae](https://git.i.wylde.net/markwylde/semantic-release-gitea/commit/94fcdae630b4be5518b0e9ee5ea0a24a1d9a811d))

## [2.1.1](https://git.i.wylde.net/markwylde/semantic-release-gitea/compare/v2.1.0...v2.1.1) (2025-12-15)


### Bug Fixes

* **ci:** add GITEA_URL environment variable ([a6fd709](https://git.i.wylde.net/markwylde/semantic-release-gitea/commit/a6fd7099071fe24af4e7a8112322f3c3499682a7))
* **ci:** configure Gitea registry only for publishing ([959bfc6](https://git.i.wylde.net/markwylde/semantic-release-gitea/commit/959bfc6319b464b67f4e42c02dd51d3929985338))

# [2.1.0](https://github.com/saitho/semantic-release-gitea/compare/v2.0.1...v2.1.0) (2021-04-08)


### Features

* process asset path as a template ([e061d07](https://github.com/saitho/semantic-release-gitea/commit/e061d079e6e8d6fbe83a158727a415050cdc288a))

## [2.0.1](https://github.com/saitho/semantic-release-gitea/compare/v2.0.0...v2.0.1) (2021-03-06)


### Bug Fixes

* package.json & package-lock.json to reduce vulnerabilities ([b4332ad](https://github.com/saitho/semantic-release-gitea/commit/b4332ad07a9dfb228364db91c50830b7ff2ec8fa))

# [2.0.0](https://github.com/saitho/semantic-release-gitea/compare/v1.0.0...v2.0.0) (2021-01-01)


### Features

* set fixed Node versions ([f833dcd](https://github.com/saitho/semantic-release-gitea/commit/f833dcdf9929b5248803c410751b4d01da1ba39f))


### BREAKING CHANGES

* The package can only be installed with the following node versions: 10, 11, 12, >=14
