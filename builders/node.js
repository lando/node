'use strict';

// Modules
const _ = require('lodash');
const utils = require('./../../lib/utils');

// Constants
const supportedVersions = [
  '19',
  '19.5',
  '19.4',
  '19.3',
  '19.2',
  '19.1',
  '18',
  '18.13',
  '18.12',
  '18.11',
  '18.10',
  '18.9',
  '18.8',
  '18.7',
  '18.6',
  '18.5',
  '18.4',
  '18.3',
  '18.2',
  '18.1',
  '17',
  '17.9',
  '17.8',
  '17.7',
  '17.6',
  '17.5',
  '17.4',
  '17.3',
  '17.2',
  '17.1',
  '16',
  '16.19',
  '16.18',
  '16.17',
  '16.16',
  '16.15',
  '16.14',
  '16.13',
  '16.12',
  '16.11',
  '16.10',
  '16.9',
  '16.8',
  '16.7',
  '16.6',
  '16.5',
  '16.4',
  '16.3',
  '16.2',
  '16.1',
  '15',
  '15.14',
  '15.13',
  '15.12',
  '15.11',
  '15.10',
  '15.9',
  '15.8',
  '15.7',
  '15.6',
  '15.5',
  '15.4',
  '15.3',
  '15.2',
  '15.1',
  '14',
  '14.21',
  '14.20',
  '14.19',
  '14.18',
  '14.17',
  '14.16',
  '14.15',
  '14.14',
  '14.13',
  '14.12',
  '14.11',
  '14.10',
  '14.9',
  '14.8',
  '14.7',
  '14.6',
  '14.5',
  '14.4',
  '14.3',
  '14.2',
  '14.1',
  '13',
  '13.14',
  '13.13',
  '13.12',
  '13.11',
  '13.10',
  '13.9',
  '13.8',
  '13.7',
  '13.6',
  '13.5',
  '13.4',
  '13.3',
  '13.2',
  '13.1',
  '12',
  '12.16',
  '12.15',
  '12.14',
  '12.13',
  '12.12',
  '12.11',
  '12.10',
  '12.9',
  '12.8',
  '12.7',
  '12.6',
  '12.5',
  '12.4',
  '11',
  '11.15',
  '11.14',
  '11.13',
  '11.12',
  '11.11',
  '11.10',
  '11.9',
  '11.8',
  '11.7',
  '11.6',
  '11.5',
  '11.4',
  '10',
  '10.19',
  '10.18',
  '10.17',
  '10.16',
  '10.15',
  '10.14',
  '10.13',
  '8',
  '8.14',
  '6',
  '6.15',
];

/*
 * Helper to build a package string
 */
const pkger = (pkg, version = 'latest') => `${pkg}@${version}`;

// Builder
module.exports = {
  name: 'node',
  config: {
    version: '14',
    supported: supportedVersions,
    patchesSupported: true,
    legacy: ['12', '10', '8', '6'],
    command: 'tail -f /dev/null',
    moreHttpPorts: [],
    path: [
      '/app/node_modules/.bin',
      '/var/www/.npm-global/bin',
      '/usr/local/sbin',
      '/usr/local/bin',
      '/usr/sbin',
      '/usr/bin',
      '/sbin',
      '/bin',
    ],
    port: '80',
    ssl: false,
    volumes: ['/usr/local/bin', '/usr/local/share'],
  },
  parent: '_appserver',
  builder: (parent, config) => class LandoNode extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Make sure our command is an array
      if (!_.isArray(options.command)) options.command = [options.command];
      options.command = options.command.join(' && ');
      // Build the nodez
      const node = {
        image: `node:${options.version}`,
        environment: {
          PATH: options.path.join(':'),
          NODE_EXTRA_CA_CERTS: `/lando/certs/${options._app._config.domain}.pem`,
          NPM_CONFIG_PREFIX: '/var/www/.npm-global',
          LANDO_WEBROOT_USER: 'node',
          LANDO_WEBROOT_GROUP: 'node',
          LANDO_WEBROOT_UID: '1000',
          LANDO_WEBROOT_GID: '1000',
        },
        ports: (options.command !== 'tail -f /dev/null' && options.port !== false) ? [options.port] : [],
        volumes: options.volumes,
        command: `/bin/sh -c "${options.command}"`,
      };
      // Change the me user
      options.meUser = 'node';
      // Add port to "moreHttpsPorts"
      options.moreHttpPorts.push(options.port);
      // Add our npm things to run step
      if (!_.isEmpty(options.globals)) {
        const commands = utils.getInstallCommands(options.globals, pkger, ['npm', 'install', '-g']);
        utils.addBuildStep(commands, options._app, options.name);
      }
      // Set the sport and moreHttpPorts if ssl is numeric
      if (options.ssl) {
        options.sport = _.isInteger(options.ssl) ? options.ssl : 443;
        options.moreHttpPorts.push(options.sport);
        options.ssl = true;
      }

      // Run as the node user if we can
      if (_.min([options.port, options.sport]) >= 1024) {
        node.environment.LANDO_RESET_DIR = '/certs';
        node.environment.LANDO_DROP_USER = 'node';
      }

      // Send it downstream
      super(id, options, {services: _.set({}, options.name, node)});
    };
  },
};
