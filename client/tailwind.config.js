// /** @type {import('tailwindcss').Config} */
// const  = require("@material-tailwind/react/utils/withMT");
// export default withMT()  {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     fontFamily: {
//       'sans': ['Helvetica', 'Arial', 'sans-serif'],
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [require('tailwindcss-font-inter')],
});
