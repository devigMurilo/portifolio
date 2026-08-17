import { cn } from '@/lib/utils'

/**
 * Fundo aurora: três manchas de cor em blur pesado que giram e escalam em loop,
 * sobrepostas por uma grade fina e uma vinheta radial.
 * Referência visual: "Aurora / Gradient backgrounds" do 21st.dev.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className="absolute inset-0 grid-lines opacity-60" />

      <div className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-accent-600/30 blur-[120px] animate-aurora" />
      <div
        className="absolute top-10 right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-cyan-400/20 blur-[130px] animate-aurora"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="absolute bottom-[-14rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/20 blur-[140px] animate-aurora"
        style={{ animationDelay: '-14s' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-ink-950)_88%)]" />
    </div>
  )
}
