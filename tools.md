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

```

## npm

* `npm` has two install locations - local and global.
* If you want to use a package as a module, install it locally.
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

## ncu

Allows you to update your node packages regardless of semver.

```shell

# ncu is a node package. Install it.
$ npm install npm-check-updates -g

# Upgrade all packages, including dependencies whose latest versions match semver dependencies
$ ncu --upgradeAll

```

## npm packages

* `rimraf` - recursively delete a directory (`rm -rf`)
* `ncu` - npm-check-updates - allows you to upgrade packages regardless of
  semver. (`npm install npm-check-updates -g`). Invoke with `ncu`.

