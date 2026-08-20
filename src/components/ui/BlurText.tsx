import { motion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Revela o texto palavra por palavra saindo de blur + deslocamento vertical.
 * Referência: "Blur in text / Text reveal" do 21st.dev.
 */
export function BlurText({
  text,
  className,
  wordClassName,
  blur = true,
  delay = 0,
  stagger = 0.06,
  once = true,
}: {
  text: string
  className?: string
  /**
   * Classe aplicada a cada palavra. Gradiente de texto precisa vir por aqui:
   * o `filter: blur()` da palavra cria um contexto de renderização próprio, e o
   * `background-clip: text` de um ancestral não pinta através dele.
   */
  wordClassName?: string
  /**
   * Desliga o blur. Obrigatório junto de gradiente: o Chrome não pinta um
   * `background-clip: text` enquanto o elemento tem `filter`, mesmo `blur(0px)`.
   */
  blur?: boolean
  delay?: number
  stagger?: number
  once?: boolean
}) {
  const words = text.split(' ')

  /*
   * Quem observa a viewport é o wrapper, não cada palavra. Com um observer por
   * palavra, qualquer uma que caísse fora da área de detecção ficava presa em
   * `opacity: 0` — e o `rootMargin` negativo encolhe essa área na horizontal
   * também, então palavras nas bordas de telas estreitas nunca disparavam.
   */
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const word: Variants = {
    hidden: { opacity: 0, y: 14, ...(blur ? { filter: 'blur(10px)' } : {}) },
    visible: {
      opacity: 1,
      y: 0,
      ...(blur ? { filter: 'blur(0px)' } : {}),
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.span
      className={cn('inline', className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      // Só na vertical: o atalho de um valor só encolheria as laterais junto.
      viewport={{ once, margin: '-80px 0px' }}
    >
      {words.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          className={cn(
            'inline-block whitespace-pre',
            blur ? 'will-change-[filter,transform]' : 'will-change-transform',
            wordClassName,
          )}
          variants={word}
        >
          {item}
          {index < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}
