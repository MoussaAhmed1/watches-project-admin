/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();


const nextConfig = withNextIntl({
  basePath: '/admin',
  assetPrefix: '/admin/_next',
  env: {
    NEXT_PUBLIC_HOST_API: process.env.NEXT_PUBLIC_HOST_API,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_HOST_DOMAIN,"https://nadnee.click/v1/","nadnee.click"],
    unoptimized: true,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});

module.exports = nextConfig;

