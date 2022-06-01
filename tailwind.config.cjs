const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  darkMode: "class",
  content: ["./src/**/*.svelte"],
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#2C3142",
        secondary: "#52545D",
        "light-primary": "#363C4E",
        "dark-primary": "#242836",
        "very-dark-primary": "#151821",
        accent: "#6366f1",
        "accent-blue": "#009dff",
        error: "#f87171",
        blurple: "#454FBF",
      },
      spacing: {
        84: "22rem",
        108: "28rem",
        120: "32rem",
        "1xx": "100px",
        "2xx": "200px",
        "3xx": "300px",
        "4xx": "400px",
        "5xx": "500px",
        "6xx": "600px",
        "7xx": "700px",
        "8xx": "800px",
        "9xx": "900px",
        "10xx": "1000px",
        "11xx": "1100px",
        "12xx": "1200px",
      },
      fontSize: {
        "mini": "0.5rem",
        "tiny": "0.6rem",
        "10xl": "10rem",
        "11xl": "12rem",
      },
      minWidth: {
        "sm": "30px",
        "1xx": "100px",
        "2xx": "200px",
      },
      maxWidth: {
        "1xx": "100px",
        "2xx": "200px",
      },
    },
    screens: {
      xl: { max: "1450px" },
      lg: { max: "1280px" },
      "2md": { max: "900px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      "2xs": { max: "500px" },
      xs: { max: "380px" },
      tiny: { max: "300px" },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
