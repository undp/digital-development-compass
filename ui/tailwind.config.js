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
          business: "#A21942",
          foundations: "#FE6825",
          government: "#19486A",
          infrastructure: "#FD6925",
          people: "#FD9D24",
          regulation: "#00689D",
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
