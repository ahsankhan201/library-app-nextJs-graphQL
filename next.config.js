/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  reactStrictMode: true,

  swcMinify: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'], // add all the locales you want to support
  },
}

module.exports = nextConfig
