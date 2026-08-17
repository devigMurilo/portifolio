import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/**
 * Halo que segue o cursor com atraso elástico. Desativado em telas de toque.
 * Referência: "Cursor follow / glow cursor" do 21st.dev.
 */
export function GlowCursor() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (event: PointerEvent) => {
      x.set(event.clientX - 160)
      y.set(event.clientY - 160)
    }

    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden h-80 w-80 rounded-full bg-accent-500/8 blur-[90px] md:block"
      aria-hidden
    />
  )
}
