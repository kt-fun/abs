/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'zh'],
  // },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.gravatar.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'eu.cdn.beatsaver.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'na.cdn.beatsaver.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'cdn.beatsaver.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: '*.cdn.beatsaver.com',
          pathname: '/**',
        }
      ],
    }
}

module.exports = nextConfig
