/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': 'your-primary-color-value', // Replace with your actual primary color value
        'secondary-color': 'your-secondary-color-value', // Replace with your actual secondary color value
        'orange-600': '#c8610c',
        'orange-500': '#db8d4c',
        'blue-500': '#007bff'
      },
      boxShadow: {
        'outline': '0 0 5px rgba(0, 123, 255, 0.5)'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
