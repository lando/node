---
title: Using Compass on a Lando Node Service
description: Learn how to use legacy compass sass builds for your Lando frontend node build
guide: true
authors:
  - name: Team Lando
    link: mailto:lando@lando.dev
    pic: https://www.gravatar.com/avatar/db2470075fb67c330c155cab9698826f
updated:
  timestamp: 1613073690000
mailchimp:
  action: https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f
  title: Want more Node guide content?
  byline: Signup and we will send you a weekly blog digest of similar content to keep you satiated.
  button: Sign me up!
---

Some older `node` based frontend build steps rely on `ruby` and `compass`. If you have such a flow we _highly recommend_ you escape dependency hell and migrate your `sass` build steps to use `node-sass` which is _way_ faster.

However, if you cannot do this you may run into some issues running `compass` inside of your `node` container since this pattern is fundamentally at odds with Lando's one-thing-per-container model.

You can, however, get around it by installing `ruby` and `compose` directly in the `node` service that requires them.

Below is an example that installs `ruby` and `compass` using [build-steps](https://docs.lando.dev/core/v3/lando-service.html#build-steps).

```yaml
services:
  myservice:
    type: node:12
    build_as_root:
      - apt-get update -y
      - apt-get install ruby-full -y
      - gem install compass
tooling:
  ruby:
    service: myservice
  compass:
    service: myservice
```

You can verify with:

```bash
lando ruby -v
lando compass -v
```

You should now be able to run any build steps that require `ruby` and `compass` as in this example:

```yaml
services:
  myservice:
    type: node:12
    globals:
      grunt-cli: latest
    build_as_root:
      - apt-get update -y
      - apt-get install ruby-full -y
      - gem install compass
    build:
      - grunt build:sass
tooling:
  ruby:
    service: myservice
  compass:
    service: myservice
```
