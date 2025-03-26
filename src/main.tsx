import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.scss'
import App from './App/App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
