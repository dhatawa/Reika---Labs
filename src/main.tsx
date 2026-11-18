import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { router } from './router'
import { LanguageProvider } from './i18n/LanguageProvider'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* "user" = follow the visitor's prefers-reduced-motion setting everywhere */}
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </MotionConfig>
  </StrictMode>,
)
