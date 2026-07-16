import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

// https://vite.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() 
  ],
  server: {
    watch: {
      //usePolling: true // Docker環境で画面の自動更新をサクサク動かすためのお守り
     // 本番環境（Render）のときはオフ、手元のパソコンのときだけオンにする魔法の切り替えです
      usePolling: !process.env.RENDER
    }
  }
})
