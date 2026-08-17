import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Faixa infinita: o conteúdo é duplicado e o trilho desliza -50%,
 * o que faz a emenda ficar invisível. Pausa no hover.
 * Referência: "Marquee / Infinite scroll" do 21st.dev.
 */
export function Marquee({
  children,
  duration = '38s',
  reverse = false,
  className,
}: {
  children: ReactNode
  duration?: string
  reverse?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
    >
      <div
        className="flex w-max shrink-0 animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]"
        style={
          {
            '--marquee-duration': duration,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as CSSProperties
        }
      >
        {children}
        {children}
      </div>
    </div>
  )
}
