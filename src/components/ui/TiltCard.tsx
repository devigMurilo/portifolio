import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Card com inclinação 3D acompanhando o cursor.
 * Referência: "3D tilt card" do 21st.dev.
 */
export function TiltCard({
  children,
  className,
  max = 9,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const springConfig = { stiffness: 180, damping: 20 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springConfig)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springConfig)

  return (
    <div className={cn('[perspective:1100px]', className)}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onPointerMove={(event) => {
          const rect = ref.current?.getBoundingClientRect()
          if (!rect) return
          px.set((event.clientX - rect.left) / rect.width)
          py.set((event.clientY - rect.top) / rect.height)
        }}
        onPointerLeave={() => {
          px.set(0.5)
          py.set(0.5)
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
