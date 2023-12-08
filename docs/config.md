---
title: Configuration
description: Learn how to configure the Lando Node service.
---

# Configuration

Here are the configuration options, set to the default values, for this service. If you are unsure about where this goes or what this means, we *highly recommend* scanning the [services documentation](https://docs.lando.dev/config/services.html) to get a good handle on how the magicks work.

Also note that options, in addition to the [build steps](https://docs.lando.dev/config/services.html#build-steps) and [overrides](https://docs.lando.dev/config/services.html#overrides) that are available to every service, are shown below:

```yaml
services:
  myservice:
    type: node:16
    ssl: false
    command: tail -f /dev/null
    globals: []
    port: 80
```

## Specifying a command

Note that if you *do not* define a `command` for this service, it will effectively be a "cli" container (e.g. it will not serve or run an application by default but will be available to run `node` commands against).

If you want to actually launch a `node` application, consider setting the `command` to something as shown below:

```yaml
services:
  myservice:
    type: node
    command: npm start
```

## Setting a port

While we assume your `node` service is running on port `80`, we recognize that many `node` app's also run on port `3000` or otherwise. You can easily change our default to match whatever your app needs. If your `node` service doesn't require an exposed port, you can also set `port` to `false` to disable the default port `80` mapping.

Note that if you set either `port` or `ssl` to a value less than `1024` then Lando will run the `command` as `root` otherwise it will run as the `node` user which for all intents and purposes is `you`.

```yaml
services:
  myservice:
    type: node
    port: 3000
```

## Using SSL

Also note that `ssl: true` will only generate certs in the [default locations](https://docs.lando.dev/config/security.html) and expose port `443`. It is up to the user to use the certs and secure port correctly in their application like the `node` snippet below:

```js
// Get our key and cert
const key = fs.readFileSync('/certs/cert.key')
const cert = fs.readFileSync('/certs/cert.crt'),

// Create our servers
https.createServer({key, cert}, app).listen(443);
http.createServer(app).listen(80);

// Basic HTTP response
app.get('/', (req, res) => {
  res.header('Content-type', 'text/html');
  return res.end('<h1>I said "Oh my!" What a marvelous tune!!!</h1>');
});
```

You can also set `ssl` to a specific port. This will do the same thing as `ssl: true` except it will expose the port you specify instead of `443`.

```yaml
services:
  myservice:
    type: node
    port: 3000
    ssl: 4444
```

## Installing global dependencies

You can also use the `globals` key if you need to install any [global node dependencies](https://docs.npmjs.com/cli/install). This follows the same syntax as your normal [`package.json`](https://docs.npmjs.com/files/package.json) except written as YAML instead of JSON.

::: tip Use package.json if you can!
While there are some legitimate use cases to globally install a node dependency, it is almost always preferred to install using your applications normal `package.json` and then running either `lando npm` or `lando yarn` or alternatively setting up a [build step](https://docs.lando.dev/config/services.html#build-steps) that will automatically run before your app starts up.

Note that both `lando yarn` and `lando npm` are not provided out of the box by the `node` service and need to be manually added by configuring your app's [tooling](https://docs.lando.dev/config/tooling.html).
:::

An example of globally installing the `latest` `gulp-cli` is shown below:

```yaml
services:
  myservice:
    type: node
    globals:
      gulp-cli: latest
    command: npm start
```

An example of using a [build step](https://docs.lando.dev/config/services.html#build-steps) to automatically `npm install` your dependencies before your app invokes `yarn start-app` is shown below:

```yaml
services:
  myservice:
    type: node
    build:
      - npm install
    command: yarn start-app
```


## Adding tooling commands

By default a service will not do any tooling routing for you but you can add helpful `lando` commands.

```yaml
tooling:
  node:
    service: myservice
  yarn:
    service: myservice
```

You can then invoke them on the command line.

```bash
lando node
lando yarn
```

Lando tooling is actually pretty powerful so definitely check out [the rest](https://docs.lando.dev/config/tooling.html) of its cool features.

## Adding routing

By default a service will not do any proxy routing for you but you can add your own.

```yaml
proxy:
  myservice:
    - myapp.lndo.site
    - something.else.local
```

Lando proxying is actually pretty powerful so definitely check out [the rest](https://docs.lando.dev/config/proxy.html) of its cool features.
