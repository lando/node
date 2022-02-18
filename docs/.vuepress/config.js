const {path} = require('@vuepress/utils');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'Lando Node Plugin Documentation',
  base: '/node/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/node/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/node/favicon.svg', type: 'image/svg+xml'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: '@lando/vuepress-theme-default-plus',
  themeConfig: {
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/node',
    sidebarHeader: {
      enabled: true,
      title: 'Node Plugin',
      icon: '/images/nodejsicon.svg',
    },
    sidebar: [
      {
        text: 'Getting Started',
        link: '/index.md',
      },
      '/config.md',
      '/caveats.md',
      {
        text: 'Guides',
        collapsible: true,
        children: [
          {
            text: 'Using Browsersync',
            link: '/using-browsersync.md',
          },
          {
            text: 'Using Compass',
            link: '/using-compass.md',
          },
          {
            text: 'Using Frontend Tooling',
            link: '/frontend-tooling.md',
          },
        ],
      },
      '/support.md',
      {text: 'Examples', link: 'https://github.com/lando/node/tree/main/examples'},
      {text: 'Release Notes', link: 'https://github.com/lando/node/releases'},
      '/development.md',
    ],
  },
};
