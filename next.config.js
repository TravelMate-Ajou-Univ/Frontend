/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ["api-travelmate.siteattachments"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-travelmate.site",
        port: "",
        pathname: "/attachments/**"
      }
    ]
  }
};

module.exports = nextConfig;
