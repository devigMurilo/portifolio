import { Children, useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Baralho: cada card gruda no topo um pouco mais abaixo que o anterior, então
 * o de cima cobre o anterior deixando só uma faixa à mostra. Quem já está
 * embaixo encolhe conforme a pilha cresce, o que dá a sensação de profundidade.
 *
 * Dois cuidados que o efeito exige:
 * - nenhum ancestral pode ter `overflow` diferente de `visible`, senão o
 *   `sticky` deixa de grudar;
 * - os cards precisam ser opacos, senão a pilha inteira aparece através deles.
 */
export function StackedCards({
  children,
  className,
  /** Onde o primeiro card para, em rem a partir do topo da viewport. */
  top = 7,
  /** Quanto cada card para abaixo do anterior, em rem. */
  step = 1.75,
  /** Quanto cada nível da pilha encolhe. Baixe em pilhas longas. */
  scaleStep = 0.05,
}: {
  children: ReactNode
  className?: string
  top?: number
  step?: number
  scaleStep?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const items = Children.toArray(children)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={ref} className={cn('relative', className)}>
      {items.map((child, index) => (
        <Card
          key={index}
          index={index}
          total={items.length}
          progress={scrollYProgress}
          top={top + index * step}
          scaleStep={scaleStep}
          reduced={!!reduced}
        >
          {child}
        </Card>
      ))}
    </div>
  )
}

function Card({
  children,
  index,
  total,
  progress,
  top,
  scaleStep,
  reduced,
}: {
  children: ReactNode
  index: number
  total: number
  progress: MotionValue<number>
  top: number
  scaleStep: number
  reduced: boolean
}) {
  // O último card não encolhe: ele é o que fica por cima no fim.
  const target = 1 - (total - 1 - index) * scaleStep

  // Começa a encolher só quando o próximo card entra em cena.
  const scale = useTransform(progress, [index / total, 1], [1, target])

  return (
    <div className="sticky" style={{ top: `${top}rem` }}>
      <motion.div style={reduced ? undefined : { scale }} className="origin-top">
        {children}
      </motion.div>
    </div>
  )
}
