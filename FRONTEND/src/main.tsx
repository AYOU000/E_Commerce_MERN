import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css' 
import LightningBackground from './LightningBackground.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LightningBackground />
    <App />
  </StrictMode>,
)
