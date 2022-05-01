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
                "primary": "#2C3142",
                "secondary": "#52545D",
                "light-primary": "#363C4E",
                "dark-primary": "#242836",
                "accent": "#6366f1",
                "accent-blue": "#009dff",
                "error": "#f87171"
            }
        },  
    },
    variants: {},
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};