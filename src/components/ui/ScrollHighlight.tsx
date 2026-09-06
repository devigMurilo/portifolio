import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { tokenize, stripAccents } from '@/lib/text'
import { cn } from '@/lib/utils'

/**
 * Texto que acende palavra por palavra conforme a seção sobe pela viewport: o
 * progresso do scroll é fatiado em uma faixa por palavra, então a frase é lida
 * no ritmo da rolagem em vez de aparecer inteira de uma vez.
 *
 * Palavras entre *asteriscos* saem na serifada em itálico.
 */
export function ScrollHighlight({
  text,
  className,
  accentClassName = 'font-serif text-accent-400 italic',
}: {
  text: string
  className?: string
  accentClassName?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()

  // Termina antes do meio da tela: a frase fica acesa por inteiro por um tempo,
  // em vez de já começar a apagar assim que a última palavra acende.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.55'],
  })

  const words = tokenize(text)

  return (
    <p ref={ref} className={className} aria-label={stripAccents(text)}>
      {words.map((item, index) => (
        <Word
          key={`${item.word}-${index}`}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1) / words.length]}
          className={item.accent ? accentClassName : undefined}
          static={!!reduced}
        >
          {index < words.length - 1 ? `${item.word} ` : item.word}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
  className,
  static: isStatic,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  className?: string
  static: boolean
}) {
  const opacity = useTransform(progress, range, [0.16, 1])

  return (
    <motion.span
      aria-hidden
      style={isStatic ? undefined : { opacity }}
      className={cn('inline-block whitespace-pre', className)}
    >
      {children}
    </motion.span>
  )
}
