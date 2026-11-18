import { motion, useReducedMotion } from 'motion/react'
import { WaterCanvas } from '../water/WaterCanvas'
import { ButtonRoute } from '../ui/Button'
import { WaveEdge } from '../ui/WaveEdge'
import { useSite } from '../../content/site'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { hero } = useSite()
  const reduced = useReducedMotion()
  // The one entrance on the page: a short fade and rise, lightly staggered.
  const enter = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease },
        }

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-mist"
    >
      <div className="absolute inset-0 -z-10">
        <WaterCanvas />
        {/* Calm, darker water behind the text column */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(7_17_28/0.72)_0%,rgb(7_17_28/0.4)_45%,transparent_75%)]" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-center pb-32 pt-28">
        <div className="max-w-[60rem]">
          <motion.h1
            id="hero-title"
            {...enter(0)}
            className="font-display text-[clamp(2.25rem,5.6vw,5.25rem)] leading-[1.04] tracking-[-0.01em] text-mist"
          >
            {hero.headline}
          </motion.h1>
          <motion.p {...enter(1)} className="mt-8 max-w-[36rem] text-lg leading-relaxed text-mist-2">
            {hero.description}
          </motion.p>
          <motion.div {...enter(2)} className="mt-10 flex flex-wrap gap-3">
            <ButtonRoute to={hero.primaryCta.to} tone="light">
              {hero.primaryCta.label}
            </ButtonRoute>
            <ButtonRoute to={hero.secondaryCta.to} tone="outline-light" icon={false}>
              {hero.secondaryCta.label}
            </ButtonRoute>
          </motion.div>
        </div>
      </div>

      <WaveEdge fill="var(--color-paper)" />
    </section>
  )
}
