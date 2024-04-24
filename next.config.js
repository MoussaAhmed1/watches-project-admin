/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HOST_API: process.env.NEXT_PUBLIC_HOST_API,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_HOST_DOMAIN, "https://dcatrah.com"],
    unoptimized: true,
    remotePatterns: [
      {
          protocol: 'http',
          hostname: process.env.NEXT_PUBLIC_HOST_DOMAIN,
          port: '',
          pathname: '/storage/**',
      },
  ],
  },
};

module.exports = nextConfig;
