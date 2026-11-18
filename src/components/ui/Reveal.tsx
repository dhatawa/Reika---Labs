import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'

/**
 * Subtle reveal for section headers only: a short fade and an 8 px rise,
 * once. Body content is never animated, and reduced motion shows it as is.
 */
export function Reveal({ children, ...rest }: HTMLMotionProps<'div'>) {
  const reduced = useReducedMotion()
  if (reduced) return <motion.div {...rest}>{children}</motion.div>
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
