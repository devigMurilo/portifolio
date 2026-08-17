import { motion, useScroll, useSpring } from 'motion/react'

/** Barra de progresso fina no topo, ligada ao scroll da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-100 h-[2px] origin-left bg-linear-to-r from-accent-500 via-fuchsia-400 to-cyan-400"
      aria-hidden
    />
  )
}
