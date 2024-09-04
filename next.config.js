/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io', 'api.vishnuprasadkuntar.me', 'https://example.com', 'example.com', 'google.com']
  },
  typescript: {
    ignoreBuildErrors: true, // to ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // to ignore ESLint errors during build
  }
};

module.exports = nextConfig;
