// tailwind.config.js

/** @type {import('tailwindcss').Config} */

module.exports = {

  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {

    extend: {

      colors: {

        wine: "#7B1E3A",

        "wine-dark": "#5A152B", // Darker shade

      },

    },

  },

  plugins: [],

};
