/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-da902343a39f42e2b8a99078b67aa4b4.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'ncn-backend.up.railway.app',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
};

module.exports = nextConfig;