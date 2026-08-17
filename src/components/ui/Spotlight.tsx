import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Card com "spotlight": um brilho radial segue o cursor dentro do card.
 * Referência: "Spotlight card" do 21st.dev.
 */
export function SpotlightCard({
  children,
  className,
  color = 'var(--color-accent-500)',
}: {
  children: ReactNode
  className?: string
  color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-500)
  const mouseY = useMotionValue(-500)
  const opacity = useMotionValue(0)

  const background = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, ${color} 22%, transparent), transparent 70%)`

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        mouseX.set(event.clientX - rect.left)
        mouseY.set(event.clientY - rect.top)
      }}
      onPointerEnter={() => opacity.set(1)}
      onPointerLeave={() => opacity.set(0)}
      className={cn('group relative overflow-hidden rounded-2xl glass', className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ background, opacity }}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  )
}
