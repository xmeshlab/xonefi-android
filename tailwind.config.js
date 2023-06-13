/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
    "./src/Components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // colors: {
    //   inputBox: '#273343',
    //   backgroundBox: '#161F28'
    // },
    extend: {
      colors: {
        inputBox: "#273343",
        backgroundBox: "#161F28",
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
