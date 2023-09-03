const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["proxima-nova", ...defaultTheme.fontFamily.sans],
      mono: defaultTheme.fontFamily.mono,
    },
    extend: {
      colors: {
        brand: {
          blue: "#5b92e5",
          "blue-dark": "#0063AC",
        },
        pillar: {
          overall: "#44444f",
          ecomony: "#DE1568",
          dpinfrastructure: "#FE6825",
          government: "#FDB710",
          connectivity: "#57C22B",
          people: "#14b8a6",
          regulation: "#26BDE3",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
