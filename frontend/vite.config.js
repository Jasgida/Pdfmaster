import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";


export default defineConfig({

  plugins: [react()],

  build: {

    outDir: "dist",

  },

  base: "/",   // í ½í±ˆ ADD THIS

  define: {

    "process.env.NODE_ENV": JSON.stringify("production"),

  },

});

