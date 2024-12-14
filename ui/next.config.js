/** @type {import('next').NextConfig} */

const SITE_CONFIG = process.env.ENV ?? "dev"; // Change this to "staging / local" as needed

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: SITE_CONFIG === "dev" ? "/undp-digital-development-compass" : "",
  assetPrefix: SITE_CONFIG === "dev" ? "/undp-digital-development-compass" : "",
  env: {
    PASSWORD_PROTECT: process.env.NODE_ENV !== "development",
    SITE_CONFIG, 
    NEXT_PUBLIC_BASE_PATH :  SITE_CONFIG === "dev" ? "/undp-digital-development-compass" : "",
  },
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
};

module.exports = nextConfig;