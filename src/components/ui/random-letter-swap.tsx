'use client'

import * as React from 'react'
import { motion, useReducedMotion, type Transition } from 'motion/react'

import { cn } from '@/lib/utils'

type RandomLetterSwapProps = Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> & {
  /** Texto a ser animado. Cada caractere vira uma coluna independente. */
  label: string
  /** Intervalo entre uma letra e a seguinte, em segundos. */
  staggerDuration?: number
  transition?: Transition
  /** Inverte o sentido: as letras descem em vez de subir. */
  reverse?: boolean
}

/** Fisher-Yates: devolve os índices de 0..length-1 em ordem embaralhada. */
function shuffledIndices(length: number) {
  const order = Array.from({ length }, (_, index) => index)
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

/**
 * Troca cada letra por uma cópia dela mesma deslizando na vertical. O "random"
 * está na ordem: em vez de cascatear da esquerda para a direita, o atraso de cada
 * letra vem de uma permutação sorteada a cada hover, então nunca sai igual.
 */
export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.03,
  transition = { duration: 0.4, type: 'spring', bounce: 0.25 },
  reverse = false,
  onPointerEnter,
  onFocus,
  ...props
}: RandomLetterSwapProps) {
  const characters = React.useMemo(() => [...label], [label])
  const reduceMotion = useReducedMotion()

  const [hovered, setHovered] = React.useState(false)
  const [order, setOrder] = React.useState(() => characters.map((_, index) => index))

  // A permutação é sorteada na entrada, não a cada frame — assim a saída
  // desmonta na mesma ordem em que montou.
  const start = React.useCallback(() => {
    setOrder(shuffledIndices(characters.length))
    setHovered(true)
  }, [characters.length])

  const distance = reverse ? '100%' : '-100%'

  return (
    <span
      {...props}
      className={cn('relative inline-block overflow-hidden align-bottom', className)}
      onPointerEnter={(event) => {
        start()
        onPointerEnter?.(event)
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => {
        start()
        onFocus?.(event)
      }}
      onBlur={() => setHovered(false)}
    >
      {/* O texto acessível fica aqui; as colunas animadas são decoração. */}
      <span className="sr-only">{label}</span>

      <span aria-hidden className="inline-flex">
        {characters.map((character, index) => {
          const delay = reduceMotion ? 0 : order[index] * staggerDuration
          const animate = { y: hovered && !reduceMotion ? distance : '0%' }
          const content = character === ' ' ? ' ' : character

          return (
            <span
              key={`${character}-${index}`}
              className="relative inline-block overflow-hidden whitespace-pre"
            >
              <motion.span
                className="inline-block"
                animate={animate}
                transition={{ ...transition, delay }}
              >
                {content}
              </motion.span>
              <motion.span
                className="absolute left-0 inline-block"
                style={{ top: reverse ? '-100%' : '100%' }}
                animate={animate}
                transition={{ ...transition, delay }}
              >
                {content}
              </motion.span>
            </span>
          )
        })}
      </span>
    </span>
  )
}

export default RandomLetterSwap
