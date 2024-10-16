# Node 10 Example

This example exists primarily to test the following documentation:

* [Node 10-11 Service](https://docs.devwithlando.io/tutorials/node.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should use 10.x as the default version
lando exec defaults -- "env | grep NODE_VERSION=10."

# Should use a user specified version if given
lando exec custom -- "env | grep NODE_VERSION=11."

# Should use a user specified patch version if given
lando exec patch -- "env | grep NODE_VERSION=10.19.0"

# Should serve over port 80 by default
lando exec defaults -- "curl http://localhost | grep tune"

# Should set NODE_EXTRA_CA_CERTS with LANDOCA
lando exec defaults -- "env" | grep NODE_EXTRA_CA_CERTS | grep "$LANDO_CA_CERT"

# Should only serve over http by default
lando exec defaults -- "curl https://localhost" || echo $? | grep 7

# Should serve over specified ports if given
lando exec custom -- "curl http://localhost:3000 | grep tune"

# Should serve over https is ssl is set by user
lando exec custom -- "curl https://localhost | grep tune"

# Should serve over a custom https port if ssl is set to a specific port
lando exec custom2 -- "curl https://localhost:4444 | grep DANCING"

# Should run as root if it needs to
lando exec defaults -- "ps -a -u root" | grep "node" | wc -l | grep 2
lando exec custom -- "ps -a -u root" | grep "node" | wc -l | grep 2

# Should run as node if it can
lando exec custom2 -- "ps -a -u node" | grep "node" | wc -l | grep 2

# Should install global dependencies if specified by user and have them available in PATH
lando exec custom -- "gulp -v"
lando exec custom -- "which gulp | grep /var/www/.npm-global"

# Should PATH prefer node dependency binaries installed in /app/node_modules over global ones
lando exec custom -- "npm install gulp-cli --no-save"
lando exec custom -- "gulp -v"
lando exec custom -- "which gulp | grep /app/node_modules/.bin"
lando exec custom -- "npm uninstall gulp-cli"
lando exec custom -- "which gulp | grep /var/www/.npm-global"

# Should not serve port for cli
lando exec cli -- "curl http://localhost" || echo $? | grep 7
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
