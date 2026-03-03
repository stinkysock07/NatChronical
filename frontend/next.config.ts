import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ncn-backend.up.railway.app',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;