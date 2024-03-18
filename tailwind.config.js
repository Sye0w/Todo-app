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
    extend: {},
  },
  plugins: [
    plugin(function({addVariant}){
      addVariant('children','&>*')
    })
  ],
}
