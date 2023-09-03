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
          business: "#DE1568",
          foundations: "#FE6825",
          government: "#FDB710",
          infrastructure: "#57C22B",
          people: "#14b8a6",
          regulation: "#26BDE3",
          strategy: "#818CF8",
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
