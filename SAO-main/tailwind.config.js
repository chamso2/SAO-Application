/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF385C',
      },
      backgroundImage: {
        'sao-image': 'url("C:\Users\Home\sao-app\src\assets\sao-background.jpeg")',
      },
    },
  },
  plugins: [],
}
