import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 48 },
  right: { x: -48 },
  scale: { scale: 0.94 },
}

/** Wrapper de scroll reveal: entra quando o bloco encosta na viewport. */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
}: {
  children: ReactNode
  delay?: number
  direction?: Direction
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-70px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
