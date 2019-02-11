# JS Tools

* `nvm` - node version manager.
  * Manages multiple node versions, similar to Ruby's `rvm`.

* `npm` - node package manager.
  * Requires `node`. Install `node` first with `nvm`.

## nvm

The "Node Version Manager". Allows you to install / switch between multiple
node versions.

```shell

#
# Use nvm (node version manager) to manage multiple versions of Node.
#
# Install nvm
#
$ brew install nvm

#
# nvm is a simple bash script. Add the following lines to `~/.config/fish/config.fish
#
# nvm (node version manager)
# export NVM_DIR="$HOME/.nvm"
# bash "/usr/local/opt/nvm/nvm.sh"
#

# list all known node versions
$ nvm ls-remote

# list all installed versions
$ nvm ls

# Install a node version.
# --latest-npm   # After installing, attempt to upgrade to the latest working npm on the given node version.
$ nvm install <version> --latest-npm

# Always default to the latest version of node in new shells
$ nvm alias default node

# Determine current node version
$ nvm current
$ node --version

```

## npm

* `npm` has two install locations - local and global.
* If you want to use a package as a module from within an application, install
  it locally.
* If you want to use a package as a command line tool, install it globally.

```shell

# Global modules are installed to the .nvm version you are currently using.
$ cd ~/.nvm/versions/node/v10.13.0/lib/node_modules

# Login to your npmjs.org account
$ npm login

# Find outdated packages
$ npm outdated -g

# Update npm itself
$ npm install -g npm@latest

# List installed packages (-g == global)
$ npm ls -g

# Install a package globally.
$ npm install -g npm-check-updates

# Install a package locally. Save it to package.json
$ npm install react --save-prod
$ npm install react --save-dev

# Uninstall a package and remove it from package.json
$ npm uninstall react --save
$ npm uninstall react --save-dev

# Update all global packages (disregarding semver)
$ ncu -g --updateAll


```

## ncu (npm-check-updates)

Allows you to update your node packages regardless of semver.

```shell

# ncu is a node package. Install it.
$ npm install npm-check-updates -g

# Show any dependencces for the project in the current directory.
$ ncu

# Upgrade a project
$ ncu -u

# Upgrade all packages, including dependencies whose latest versions match semver dependencies
$ ncu --upgradeAll

```

A## npm packages

* `rimraf` - recursively delete a directory (`rm -rf`)
* `ncu` - npm-check-updates - allows you to upgrade packages regardless of
  semver. (`npm install npm-check-updates -g`). Invoke with `ncu`.
* `create-react-app` - tools for creating a skeleton react UI app.
* `eslint` - JS linter.
* `redux` - JS state container which implements the Flux architecture.
* `prop-types` - Runtime type checking for React props. Used to document the intended types of properties passed to components.
* `react-router` - For rendering components based on URL matching.

## create-react-app (CRA)

* create-react-app provides pre-configured set of tools and scripts to simply JS app development.
  * Webpack - module bundler.
  * Babel - transpiler to produce ES5 compatible JS.
  * Jest - unit testing framework.

---

## Node.js

* `tape` - a unit testing framework with great results analysis tools.
* `hapi` - A simple HTTP server. Simple to create middleware / handle routes.
  * `boom` - HTTP friendly error handling.
  * `joi` - JS schema validator.
  * `hapi-swagger` - Integrates hapi w/ swagger. Routes are annotated and
    documentation is made available thru a `/documentation` route.
* `lru-cache` - An `lru` cache ;)

## Typescript

* Typescript provides better code readability and reasoning, better tooling
  support.
* Typescript is opt-in. If you don't want to use it in places, don't.
* Types force you to think about interface boundaries.
