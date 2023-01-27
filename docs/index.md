---
title: Node Lando Plugin
description: Add a highly configurable NodeJS service to Lando for local development with all the power of Docker and Docker Compose; comes with composer, xdebug and multiple versions for lols.
next: ./config.html
---

# Node

[Node.js](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Beyond running web applications, it is also commonly used for frontend tooling.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/config/services.html) top-level config in your [Landofile](https://docs.lando.dev/config).

```yaml
services:
  myservice:
    type: node:16
    command: npm start
```

## Supported versions

*   [18](https://hub.docker.com/r/_/node/)
*   [17](https://hub.docker.com/r/_/node/)
*   [16](https://hub.docker.com/r/_/node/)
*   [15](https://hub.docker.com/r/_/node/)
*   **[14](https://hub.docker.com/r/_/node/)** **(default)**
*   [custom](https://docs.lando.dev/config/services.html#advanced)

## Legacy versions

You can still run these versions with Lando but for all intents and purposes they should be considered deprecated (e.g. YMMV and do not expect a ton of support if you have an issue).

*   [13](https://hub.docker.com/r/_/node/)
*   [12](https://hub.docker.com/r/_/node/)
*   [11](https://hub.docker.com/r/_/node/)
*   [10](https://hub.docker.com/r/_/node/)
*   [8](https://hub.docker.com/r/_/node/)
*   [6](https://hub.docker.com/r/_/node/)

## Patch versions

::: warning Not officially supported!
While we allow users to specify patch versions for this service, they are not *officially* supported, so if you use one, YMMV.
:::

To use a patch version, you can do something as shown below:

```yaml
services:
  myservice:
    type: node:16.13.1
```

But make sure you use one of the available [patch tags](https://hub.docker.com/r/library/node/tags/) for the underlying image we are using.

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "yarn add @lando/node" line to install a particular version eg
# yarn add @lando/node@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "yarn init -y \
  && yarn add @lando/node --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && yarn install --production --cwd /tmp/node_modules/@lando/node \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/node /plugins/@lando/node"

# Rebuild the plugin cache
lando --clear
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/node
```
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/node`. This command will also show you _where_ the plugin is being loaded from.
