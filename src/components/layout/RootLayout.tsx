import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useSite } from '../../content/site'

/**
 * Shared shell for every page: Navbar and Footer are rendered once here.
 * - ScrollRestoration: new pages open at the top; back/forward restores position.
 * - Page transition: a short fade (opacity only), off under reduced motion.
 */
export function RootLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const { ui } = useSite()
  return (
    <>
      {/* Focus-based skip link: no hash, so it never clashes with the router */}
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[10px] focus:bg-surface focus:px-5 focus:py-3 focus:text-ink"
      >
        {ui.skipToContent}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className={`outline-none ${isHome ? '' : 'pt-16'}`}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
