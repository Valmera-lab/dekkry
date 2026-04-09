/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.base44.com',
      },
    ],
    minimumCacheTTL: 86400, // cache images for 24 hours
    formats: ['image/webp'],
  },
  // Compress responses
  compress: true,
};

module.exports = nextConfig;
