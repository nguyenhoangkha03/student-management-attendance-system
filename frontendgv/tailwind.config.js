/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Đảm bảo Tailwind quét đúng file
  theme: {
    extend: {
      colors: {
        darkbg: '#00000050',
       
      },
    },
  },
  plugins: [],
};
