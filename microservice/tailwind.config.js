/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0)',
      },
      backgroundSize: {
        'custom-size': '30px 30px',
      },
      backgroundPosition: {
        'custom-position': '-5px -5px',
      },
    },
  },
  plugins: [],
}

