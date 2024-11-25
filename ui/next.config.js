/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: "",
  assetPrefix: "",
  env: {
    PASSWORD_PROTECT: process.env.NODE_ENV !== "development",
    SITE_CONFIG: process.env.ENV ?? "staging"
  },
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
};

module.exports = nextConfig;