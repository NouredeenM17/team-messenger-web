import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer 
      position="top-right"
      autoClose={2000}
      closeOnClick
    />
    <App />
  </React.StrictMode>,
)
