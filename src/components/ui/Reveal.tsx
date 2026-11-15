import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number }

/** Fades content up as it surfaces into view — like something rising through water. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduced ? 0.2 : 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
