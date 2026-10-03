// 🔐 frontend/src/main.tsx (外部エラーと100%すれ違わずに、コンテナ内部から直接丸文字を呼び出す最終確定版全文です！)
import '@fontsource/kosugi-maru'; // 🎯 【これをお直し完全大合流！】コンテナの中に仕込んだ小杉丸ゴシックのパーツ実体を、画面全体の1番大元へ1秒でガチッと定着させます！
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
