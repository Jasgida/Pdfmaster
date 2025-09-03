/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [

    "./public/**/*.html",

    "./public/**/*.js"

  ],

  theme: {

    extend: {

      colors: {

        coral: {

          500: '#FF6F61',

          600: '#E65B50'

        },

        teal: {

          600: '#26A69A'

        },

        yellow: {

          500: '#FFCA28'

        }

      }

    }

  },

  plugins: []

}
