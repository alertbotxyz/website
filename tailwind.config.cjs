const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
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
      },
      spacing: {
        84: "22rem",
        108: "28rem",
        120: "32rem",
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
      },
    },
    screens: {
      xl: { max: "1450px" },
      lg: { max: "1280px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "380px" },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
