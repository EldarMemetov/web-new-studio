module.exports = {
  siteUrl: 'https://web-studio-pied.vercel.app',

  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  exclude: ['/api/*', '/admin/*'],

  alternateRefs: [
    {
      href: 'https://web-studio-pied.vercel.app/ua',
      hreflang: 'uk',
    },
    {
      href: 'https://web-studio-pied.vercel.app/en',
      hreflang: 'en',
    },
    {
      href: 'https://web-studio-pied.vercel.app/de',
      hreflang: 'de',
    },
  ],
};
