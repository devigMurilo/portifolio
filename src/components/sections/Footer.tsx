import { ArrowUp } from 'lucide-react'
import { LiquidButton } from '../ui/liquid-glass-button'
import { profile } from '../../data/profile'

export function Footer() {
  return (
    <footer className="relative border-t border-white/6 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/35 sm:flex-row">
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} {profile.name} · feito com React, Tailwind e Motion
        </p>

        <LiquidButton asChild size="sm" className="rounded-full text-white/45">
          <a href="#inicio">
            <ArrowUp className="size-3.5" />
            voltar ao topo
          </a>
        </LiquidButton>
      </div>
    </footer>
  )
}
