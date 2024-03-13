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
          // overall: "#44444f",
          // ecomony: "#A21942",
          // dpinfrastructure: "#FE6825",
          // government: "#19486A",
          // connectivity: "#57C22B",
          // people: "#FD9D24",
          // regulation: "#00689D",
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
