import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zhdqcobqpzbpheusckym.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      // Example for future CDN:
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.example.com',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;
