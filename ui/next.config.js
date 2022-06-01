module.exports = {
  env: {
    PASSWORD_PROTECT: process.env.NODE_ENV !== "development",
  },
};
