
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://agronexus-env.eba-zhws2hp8.ap-south-1.elasticbeanstalk.com//api/:path*',
      },
    ];
  },
};

export default nextConfig;
