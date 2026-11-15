import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { WaterCanvas } from '../water/WaterCanvas'
import { ButtonLink } from '../ui/Button'
import { LogoMark } from '../brand/Logo'
import { WaveEdge } from '../ui/WaveEdge'
import { hero } from '../../content/site'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Subtle parallax: content drifts slower than the page, water sinks away.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const waterY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 200])
  const markY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -160])

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-midnight"
    >
      <motion.div style={{ y: waterY }} className="absolute inset-0 -z-10">
        <WaterCanvas variant="hero" />
        {/* Keep the reading area calm */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(6_13_28/0.55)_0%,transparent_28%,transparent_45%,rgb(6_13_28/0.82)_100%)]" />
      </motion.div>

      {/* Floating mark — the logo as a slow-turning ripple */}
      <motion.div
        aria-hidden="true"
        style={{ y: markY }}
        className="pointer-events-none absolute right-[-18vw] top-[12vh] -z-10 hidden w-[62vw] max-w-[860px] text-cyan/[0.09] md:block lg:right-[-8vw] lg:w-[48vw]"
      >
        <motion.div
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
        >
          <LogoMark className="h-full w-full" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative flex flex-1 flex-col justify-end pb-24 pt-32 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="label mb-7 text-cyan/80 md:mb-9"
        >
          {hero.eyebrow}
        </motion.p>

        <h1
          id="hero-title"
          className="font-display text-[clamp(2.6rem,8.2vw,8.25rem)] leading-[0.98] tracking-[-0.015em] text-foam"
        >
          {hero.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduced ? { opacity: 0 } : { y: '105%' }}
                animate={reduced ? { opacity: 1 } : { y: '0%' }}
                transition={{ duration: 1.3, delay: 0.25 + i * 0.12, ease }}
              >
                {i === hero.headline.length - 1 ? <span className="text-cyan">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.85, ease }}
          className="mt-10 grid gap-8 border-t border-foam/15 pt-8 md:mt-14 lg:grid-cols-12 lg:gap-6"
        >
          <p className="max-w-md text-lg leading-snug text-foam/85 lg:col-span-5 lg:text-xl">{hero.subheadline}</p>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-xl text-[0.975rem] leading-relaxed text-foam/60">{hero.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={hero.primaryCta.href} tone="light">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} tone="ghost-light" icon={false}>
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <p className="label pointer-events-none absolute bottom-[clamp(48px,6vw,88px)] right-5 hidden text-foam/35 sm:right-8 md:block lg:right-14 motion-reduce:hidden">
        Touch the water
      </p>

      <WaveEdge fill="var(--color-paper)" />
    </section>
  )
}
