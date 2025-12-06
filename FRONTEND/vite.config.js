import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve : {
    alias : {
      '@components': path.resolve(__dirname, './src/Components'),
      '@features': path.resolve(__dirname, './src/Features'),
      '@shop': path.resolve(__dirname, './src/Features/Shop'),
      '@inventary': path.resolve(__dirname, './src/Features/Inventary'),
      '@config': path.resolve(__dirname, './src/Config'),
      '@assets': path.resolve(__dirname, './src/Assets'),
      '@slices': path.resolve(__dirname, './src/App/Slices'),
      '@public': path.resolve(__dirname, './public/'),
      '@Pages': path.resolve(__dirname, './src/Pages'),
      // '@Routes': path.resolve(__dirname, './src/Routes'),
    }
  }
})
