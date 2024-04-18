/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'img.clerk.com'
      },
      {
        hostname: 'hallowed-labrador-341.convex.cloud'
      }
    ]
  }
};

export default nextConfig;
