import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Members } from './components/sections/Members'
import { Products } from './components/sections/Products'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-foam focus:px-5 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Members />
        <Products />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
