module.exports = {
  siteUrl: 'https://qvrix.com',

  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  exclude: ['/api/*', '/admin/*'],

  alternateRefs: [
    {
      href: 'https://qvrix.com/ua',
      hreflang: 'uk',
    },
    {
      href: 'https://qvrix.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://qvrix.com/de',
      hreflang: 'de',
    },
  ],
};
