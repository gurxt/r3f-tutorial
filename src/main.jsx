import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Leva } from 'leva'
import { Stats } from '@react-three/drei'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Leva collapsed />
    <Stats />
    <App />
  </React.StrictMode>,
)
