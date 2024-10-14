module.exports = {
  env: {
    PASSWORD_PROTECT: process.env.NODE_ENV !== "development",
    SITE_CONFIG: process.env.ENV ?? "dev"
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
