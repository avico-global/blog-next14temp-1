/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apisitem.ecommcube.com",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
