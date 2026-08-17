import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Digita e apaga uma lista de frases em loop, com cursor piscando.
 * Referência: "Typewriter effect" do 21st.dev.
 */
export function TypeWriter({
  words,
  className,
  typeSpeed = 70,
  deleteSpeed = 35,
  pause = 1600,
}: {
  words: string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]

    if (!deleting && text === current) {
      const hold = window.setTimeout(() => setDeleting(true), pause)
      return () => window.clearTimeout(hold)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setIndex((value) => (value + 1) % words.length)
      return
    }

    const timer = window.setTimeout(
      () => {
        setText((value) =>
          deleting ? current.slice(0, value.length - 1) : current.slice(0, value.length + 1),
        )
      },
      deleting ? deleteSpeed : typeSpeed,
    )

    return () => window.clearTimeout(timer)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return (
    <span className={cn('font-mono', className)}>
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-accent-400 animate-caret" />
    </span>
  )
}
