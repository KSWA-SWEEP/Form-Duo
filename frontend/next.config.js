/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://a3d8fbea-c67e-4cac-8e14-f0af2ee1671f.api.kr-central-1.kakaoi.io/ai/conversation/a170a37cbdfd45b5883c82cf4552e324/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
