// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//    base: "/",   

//   // IMPORTANT: Enable SPA fallback (fixes 404 on refresh)
//   server: {
//     historyApiFallback: true
//   },

//   // Optional but recommended for Vercel
//   build: {
//     outDir: "dist"
//   }
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Required for correct routing on Vercel
  base: "/",

  build: {
    outDir: "dist"
  }
})
