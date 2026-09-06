import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Trilho horizontal preso na viewport: enquanto a seção passa pela tela, o
 * scroll vertical é convertido em deslocamento lateral. A altura do bloco vem
 * do quanto o trilho transborda, então 1px de rolagem ≈ 1px de translação.
 * Sem isso o pin acaba antes dos cards ou sobra tela parada no fim.
 *
 * Abaixo de `md` e com `prefers-reduced-motion` o pin é desligado: o trilho
 * vira scroll horizontal nativo com snap, que é o que funciona no toque.
 */
export function StickyScroller({
  children,
  footer,
  className,
  railClassName,
}: {
  children: ReactNode
  /** Vai dentro da tela presa, abaixo do trilho, para não sobrar vazio no fim do pin. */
  footer?: ReactNode
  /** Aplicado ao bloco externo, que reserva a altura do pin. */
  className?: string
  /** Aplicado ao trilho que de fato translada. */
  railClassName?: string
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)
  const [overflow, setOverflow] = useState(0)
  const reduced = useReducedMotion()

  // Mede o quanto o trilho passa da largura da viewport. Precisa de
  // ResizeObserver porque o filtro dos projetos muda a quantidade de cards em
  // runtime, e o pin tem que encurtar junto.
  useLayoutEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const measure = () => {
      const canPin = window.matchMedia('(min-width: 768px)').matches && !reduced
      setPinned(canPin)
      setOverflow(canPin ? Math.max(0, rail.scrollWidth - window.innerWidth) : 0)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(rail)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [reduced])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -overflow]), {
    stiffness: 140,
    damping: 30,
    restDelta: 0.5,
  })

  // Sem transbordo não há o que deslizar: prender a tela ali só criaria um
  // buraco de 100vh. Acontece com filtro vazio ou poucos cards em tela larga.
  const active = pinned && overflow > 0

  return (
    <div
      ref={sectionRef}
      className={cn('relative', className)}
      style={active ? { height: `calc(100svh + ${overflow}px)` } : undefined}
    >
      <div
        className={cn(active && 'sticky top-0 flex h-svh flex-col justify-center overflow-hidden')}
      >
        {/* Mesmo nó nos dois modos: trocar só as classes evita remontar o
            trilho e perder o ResizeObserver ao cruzar o breakpoint. */}
        <div
          className={cn(
            active
              ? 'overflow-hidden'
              : 'flex snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          )}
        >
          <motion.div
            ref={railRef}
            style={active ? { x } : undefined}
            className={cn(
              // Alinha o primeiro card com a coluna de texto (max-w-6xl centrada).
              'flex gap-6 pr-[8vw] pl-[max(1rem,calc((100vw-72rem)/2))] sm:pl-[max(1.5rem,calc((100vw-72rem)/2))]',
              railClassName,
            )}
          >
            {children}
          </motion.div>
        </div>

        {active ? (
          <div className="mx-auto mt-10 h-px w-40 max-w-[40vw] shrink-0 bg-white/10">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full origin-left bg-linear-to-r from-accent-500 to-steel-400"
            />
          </div>
        ) : null}

        {footer ? <div className={cn('shrink-0', active ? 'mt-10' : 'mt-14')}>{footer}</div> : null}
      </div>
    </div>
  )
}
