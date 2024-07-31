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

/**\


@type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-font-inter'),addVariablesForColors],
});


function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

