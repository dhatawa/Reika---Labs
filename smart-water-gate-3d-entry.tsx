import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './smart_water_gate_3d_simulator'
import './src/styles/index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Missing root element for the Smart Gate 3D simulator')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
