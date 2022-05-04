const customTheme = require('@lando/vuepress-theme-default-plus');

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
  theme: customTheme({
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
        link: '/index.html',
      },
      '/config.html',
      '/caveats.html',
      {
        text: 'Guides',
        collapsible: true,
        children: [
          {
            text: 'Using Browsersync',
            link: '/using-browsersync.html',
          },
          {
            text: 'Using Compass',
            link: '/using-compass.html',
          },
          {
            text: 'Using Frontend Tooling',
            link: '/frontend-tooling.html',
          },
        ],
      },
      '/support.html',
      {text: 'Examples', link: 'https://github.com/lando/node/tree/main/examples'},
      {text: 'Release Notes', link: 'https://github.com/lando/node/releases'},
      '/development.html',
    ],
  }),
};
