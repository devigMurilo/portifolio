import { motion } from 'motion/react'
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

  return (
    <span className={cn('inline-block', className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={cn(
            'inline-block whitespace-pre',
            blur ? 'will-change-[filter,transform]' : 'will-change-transform',
            wordClassName,
          )}
          initial={{ opacity: 0, y: 14, ...(blur ? { filter: 'blur(10px)' } : {}) }}
          whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) }}
          viewport={{ once, margin: '-80px' }}
          transition={{
            duration: 0.6,
            delay: delay + index * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  )
}
