# Node Lando Plugin

This is the _official_ [Lando](https://lando.dev) plugin for [NodeJS](https://nodejs.org/en/). When installed it...

* Allows users to run various `node` versions
* Runs in `cli` mode
* Comes with easy `npm` and `yarn` support

Of course, once a user is running their node project with Lando they can take advantage of [all the other awesome development features](https://docs.lando.dev) Lando provides.

## Basic Usage

Add a `node` service to your Landofile

```yaml
services:
  myservice:
    type: node:16
    command: npm start
```

For more info you should check out the [docs](https://docs.lando.dev/node):

* [Getting Started](https://docs.lando.dev/node/)
* [Configuration](https://docs.lando.dev/node/config.html)
* [Caveats](https://docs.lando.dev/node/caveats.html)
* [Guides](https://docs.lando.dev/guides.html)
* [Examples](https://github.com/lando/node/tree/main/examples)
* [Development](https://docs.lando.dev/node/development.html)

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando).

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/node/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/node/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/node/releases).


## Maintainers

* [@pirog](https://github.com/pirog)
* [@reynoldsalec](https://github.com/reynoldsalec)

## Contributors

<a href="https://github.com/lando/node/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/node" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Selected Resources

* [LICENSE](https://github.com/lando/node/blob/main/LICENSE.md)
* [The best professional advice ever](https://www.youtube.com/watch?v=tkBVDh7my9Q)
