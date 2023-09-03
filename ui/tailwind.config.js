const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "300px",
      md: "768px",
      lg: "1024px"
    },
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
<<<<<<< HEAD
          // overall: "#44444f",
          // ecomony: "#A21942",
          // dpinfrastructure: "#FE6825",
          // government: "#19486A",
          // connectivity: "#57C22B",
          // people: "#FD9D24",
          // regulation: "#00689D",
=======
          overall: "#44444f",
          ecomony: "#DE1568",
          dpinfrastructure: "#FE6825",
          government: "#FDB710",
          connectivity: "#57C22B",
          people: "#14b8a6",
          regulation: "#26BDE3",
>>>>>>> a7a9d53 (Merge branch 'staging' of https://github.com/undp/digital-development-compass into staging)
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
