---
title: Node Lando Plugin
description: Add a highly configurable NodeJS service to Lando for local development with all the power of Docker and Docker Compose; comes with composer, xdebug and multiple versions for lols.
---

# Node

[Node.js](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Beyond running web applications, it is also commonly used for frontend tooling.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/services/lando-3.html) top-level config in your [Landofile](https://docs.lando.dev/landofile/).

```yaml
services:
  myservice:
    type: node:24
    command: npm start
```

## Supported versions

*   [24](https://hub.docker.com/_/node)
*   [23](https://hub.docker.com/_/node)
*   [22](https://hub.docker.com/_/node)
*   [21](https://hub.docker.com/_/node)
*   [20](https://hub.docker.com/_/node)
*   [19](https://hub.docker.com/_/node)
*   [18](https://hub.docker.com/_/node)
*   [17](https://hub.docker.com/_/node)
*   [16](https://hub.docker.com/_/node)
*   [15](https://hub.docker.com/_/node)
*   [14](https://hub.docker.com/_/node)
*   [custom](https://docs.lando.dev/services/lando-3.html#overrides)

## Legacy versions

You can still run these versions with Lando but for all intents and purposes they should be considered deprecated (e.g. YMMV and do not expect a ton of support if you have an issue).

*   [13](https://hub.docker.com/_/node)
*   [12](https://hub.docker.com/_/node)
*   [11](https://hub.docker.com/_/node)
*   [10](https://hub.docker.com/_/node)
*   [8](https://hub.docker.com/_/node)
*   [6](https://hub.docker.com/_/node)

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

But make sure you use one of the available [patch tags](https://hub.docker.com/_/node/tags) for the underlying image we are using.

