const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://res.cloudinary.com",
      "media-src 'self' blob: https://res.cloudinary.com",
      "font-src 'self' data:",
      "connect-src 'self' https://res.cloudinary.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig = {
  trailingSlash: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  sassOptions: {
    additionalData: `
      @use "src/shared/styles/_breakpoints.scss" as *;
      @use "src/shared/styles/_mixins.scss" as *;
      @use "src/shared/styles/_variables.scss" as *;
    `,
  },
  async redirects() {
    return [
      { source: '/de/videography', destination: '/de', permanent: true },
      { source: '/en/videography', destination: '/en', permanent: true },
      { source: '/de/web-development', destination: '/de', permanent: true },
      { source: '/en/web-development', destination: '/en', permanent: true },
      {
        source: '/de/web-development/:slug',
        destination: '/de',
        permanent: true,
      },
      {
        source: '/en/web-development/:slug',
        destination: '/en',
        permanent: true,
      },
      { source: '/de/about-us', destination: '/de', permanent: true },
      { source: '/en/about-us', destination: '/en', permanent: true },

      { source: '/de/blog', destination: '/de', permanent: true },
      { source: '/en/blog', destination: '/en', permanent: true },
      {
        source: '/de/blog/:slug',
        destination: '/de',
        permanent: true,
      },
      {
        source: '/en/blog/:slug',
        destination: '/en',
        permanent: true,
      },

      { source: '/ua/:path*', destination: '/de', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
