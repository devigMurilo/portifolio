import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ShimmerButtonProps = {
  children: ReactNode
  className?: string
  as?: 'a' | 'button'
} & ComponentPropsWithoutRef<'a'> &
  ComponentPropsWithoutRef<'button'>

/**
 * Botão com borda cônica animada + brilho interno.
 * Referência: "Shimmer button" do 21st.dev.
 */
export function ShimmerButton({ children, className, as = 'button', ...props }: ShimmerButtonProps) {
  const Tag = as as 'a'

  return (
    <Tag
      {...props}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full',
        'px-6 py-3 text-sm font-semibold text-white',
        'bg-ink-800 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_40px_-12px_var(--color-accent-500)]',
        'transition-transform duration-200 active:scale-[0.97] hover:-translate-y-0.5',
        className,
      )}
    >
      <span
        className="absolute inset-[-200%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-accent-400)_25%,var(--color-cyan-400)_45%,transparent_60%)] opacity-70"
        aria-hidden
      />
      <span className="absolute inset-[1px] rounded-full bg-ink-900" aria-hidden />
      <span
        className="absolute inset-[1px] rounded-full bg-linear-to-r from-transparent via-white/15 to-transparent bg-[length:200%_100%] animate-shimmer"
        aria-hidden
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Tag>
  )
}

export function GhostButton({ children, className, as = 'button', ...props }: ShimmerButtonProps) {
  const Tag = as as 'a'
  return (
    <Tag
      {...props}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full border border-white/10',
        'px-6 py-3 text-sm font-semibold text-white/80',
        'transition-all duration-200 hover:border-accent-400/50 hover:bg-white/5 hover:text-white hover:-translate-y-0.5',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
