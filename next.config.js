/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ["https://api-travelmate.site/attachment"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-travelmate.site",
        port: "",
        pathname: "/attachment/**"
      }
    ]
  }
};

module.exports = nextConfig;
