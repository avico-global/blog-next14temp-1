/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sitebuilderz.com",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
