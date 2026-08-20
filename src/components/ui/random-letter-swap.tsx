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
  /** Anima sozinho, em ciclo, sem depender de hover. Para CTAs que precisam puxar o olho. */
  loop?: boolean
  /** Milissegundos entre uma troca e a seguinte, quando `loop` está ligado. */
  loopInterval?: number
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
 * está na ordem: o atraso de cada letra vem de uma permutação sorteada, então
 * nunca sai igual.
 */
export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.03,
  transition = { duration: 0.4, type: 'spring', bounce: 0.25 },
  reverse = false,
  loop = false,
  loopInterval = 2600,
  onPointerEnter,
  onFocus,
  ...props
}: RandomLetterSwapProps) {
  /*
   * As letras são agrupadas por palavra e os espaços viram itens separados. Como
   * o container é um flex container, a quebra de linha só pode acontecer entre
   * itens — ou seja, nos espaços, nunca no meio de uma palavra.
   */
  const words = React.useMemo(() => {
    const result: { char: string; index: number }[][] = []
    let cursor = 0

    for (const word of label.split(' ')) {
      result.push([...word].map((char) => ({ char, index: cursor++ })))
      cursor += 1 // pula o espaço: o índice acompanha o rótulo inteiro
    }

    return result
  }, [label])

  const reduceMotion = useReducedMotion()

  const [swapped, setSwapped] = React.useState(false)
  const [order, setOrder] = React.useState(() => shuffledIndices(label.length))

  // A permutação é sorteada na entrada, não a cada frame — assim a saída
  // desmonta na mesma ordem em que montou.
  const start = React.useCallback(() => {
    setOrder(shuffledIndices(label.length))
    setSwapped(true)
  }, [label.length])

  /*
   * Em loop cada disparo alterna o estado em vez de ir e voltar: como as duas
   * cópias são o mesmo caractere, subir e descer produzem a mesma troca na tela.
   * Assim é um `setInterval` só, sem timer aninhado para desfazer.
   */
  React.useEffect(() => {
    if (!loop || reduceMotion) return

    const id = window.setInterval(() => {
      setOrder(shuffledIndices(label.length))
      setSwapped((value) => !value)
    }, loopInterval)

    return () => window.clearInterval(id)
  }, [loop, loopInterval, reduceMotion, label.length])

  const distance = reverse ? '100%' : '-100%'

  const column = ({ char, index }: { char: string; index: number }) => {
    const delay = reduceMotion ? 0 : (order[index] ?? index) * staggerDuration
    const animate = { y: swapped && !reduceMotion ? distance : '0%' }

    return (
      /*
       * O recorte vive aqui, em cada letra: a segunda cópia fica em `top: 100%`
       * e só aparece quando sobe. Um `overflow-hidden` no wrapper externo
       * cortaria o rótulo inteiro quando não coubesse na linha.
       */
      <span key={index} className="relative inline-block overflow-hidden">
        <motion.span
          className="inline-block"
          animate={animate}
          transition={{ ...transition, delay }}
        >
          {char}
        </motion.span>
        <motion.span
          className="absolute left-0 inline-block"
          style={{ top: reverse ? '-100%' : '100%' }}
          animate={animate}
          transition={{ ...transition, delay }}
        >
          {char}
        </motion.span>
      </span>
    )
  }

  return (
    <span
      {...props}
      className={cn('inline-flex flex-wrap items-end align-bottom', className)}
      onPointerEnter={(event) => {
        if (!loop) start()
        onPointerEnter?.(event)
      }}
      onPointerLeave={() => !loop && setSwapped(false)}
      onFocus={(event) => {
        if (!loop) start()
        onFocus?.(event)
      }}
      onBlur={() => !loop && setSwapped(false)}
    >
      {/* O texto acessível fica aqui; as colunas animadas são decoração. */}
      <span className="sr-only">{label}</span>

      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          {wordIndex > 0 ? (
            <span aria-hidden className="whitespace-pre">
              {' '}
            </span>
          ) : null}
          <span aria-hidden className="inline-flex">
            {word.map(column)}
          </span>
        </React.Fragment>
      ))}
    </span>
  )
}

export default RandomLetterSwap
