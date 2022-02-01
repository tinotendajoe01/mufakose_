module.exports = {
  mode: "jit",
  purge: ["pages/**/*.{js,ts,jsx,tsx}", "components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        kenlink_blue: {
          dark: "#232F3E",
          DEFAULT: "#131921",
        },
        kenlink_green: {
          DEFAULT: "##7D53BE",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
};
