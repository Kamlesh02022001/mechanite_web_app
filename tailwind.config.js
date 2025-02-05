// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './renderer/pages/**/*.{js,ts,jsx,tsx}',
//     './renderer/components/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-blue-500',
    'bg-gray-500',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


