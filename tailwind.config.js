/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    screens: {
      'mobile': {'min':'200px','max':'900px'},
      'laptop': {'min':'900px'}
    },
    fontFamily: {
      josefin: ['Josefin Sans','sans-serif']
    },
    extend: {
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out ',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        }
      }  
    },
  },
  plugins: [
    plugin(function({addVariant}){
      addVariant('children','&>*')
    })
  ],
}
