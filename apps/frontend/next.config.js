/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '../../dist/apps/frontend',
  experimental: {
    typedRoutes: true,
    externalDir: true,
  },
};

module.exports = nextConfig;
