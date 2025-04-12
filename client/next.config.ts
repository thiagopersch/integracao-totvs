import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    customKey: 'Integração com TOTVS',
    API_URL: process.env.API_URL,
    SERVER_API_URL: process.env.SERVER_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    CLIENT_FETCH_ERROR: process.env.CLIENT_FETCH_ERROR,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_URL_INTERNAL,
    JWT_SIGNING_PRIVATE_KEY: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
};

export default nextConfig;
