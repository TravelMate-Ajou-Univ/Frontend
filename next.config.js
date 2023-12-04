/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ["api-travelmate.site"],
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
