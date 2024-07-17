/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HOST_API: process.env.NEXT_PUBLIC_HOST_API,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_HOST_DOMAIN,'dcatrah.com','https://dcatrah.com',"https://www.pexels.com"],
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
