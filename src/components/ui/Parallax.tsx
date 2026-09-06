import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Desloca o bloco na vertical conforme ele atravessa a viewport. Colunas
 * vizinhas com `speed` diferente (ou de sinal trocado) passam em ritmos
 * distintos, que é o que dá profundidade à seção.
 *
 * O deslocamento é puramente visual: o espaço reservado no layout continua o
 * mesmo, então nada empurra o conteúdo de baixo.
 */
export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode
  /** Deslocamento em px de cada ponta da travessia. Negativo inverte o sentido. */
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [speed, -speed]), {
    stiffness: 120,
    damping: 30,
    restDelta: 0.5,
  })

  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }} className={cn(className)}>
      {children}
    </motion.div>
  )
}
