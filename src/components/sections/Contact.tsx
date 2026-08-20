import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, Copy, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { BlurText } from '../ui/BlurText'
import { RandomLetterSwap } from '../ui/random-letter-swap'
import { Reveal } from '../ui/Reveal'
import { Magnetic } from '../ui/Magnetic'
import { LiquidButton } from '../ui/liquid-glass-button'
import { profile } from '../../data/profile'

const socials = [
  { icon: GithubIcon, label: 'GitHub', value: `@${profile.handle}`, href: profile.github },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'Igor Murilo', href: profile.linkedin },
  { icon: Mail, label: 'E-mail', value: profile.email, href: `mailto:${profile.email}` },
]

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contato" className="relative overflow-hidden px-4 py-32 sm:px-6">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[36rem] bg-[radial-gradient(60%_50%_at_50%_100%,color-mix(in_oklab,var(--color-accent-500)_22%,transparent),transparent_75%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal direction="scale">
          <span className="font-mono text-xs tracking-[0.22em] text-accent-400 uppercase">
            Contato
          </span>
        </Reveal>

        <h2 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          <BlurText text="Vamos construir algo juntos" />
        </h2>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55">
            Aberto a estágio, freela e projeto colaborativo. Manda uma mensagem — respondo rápido.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.2}>
              <LiquidButton asChild size="xl" className="rounded-full font-semibold text-white">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="size-4" />
                  <RandomLetterSwap label="Enviar e-mail" loop loopInterval={1500} />
                </a>
              </LiquidButton>
            </Magnetic>

            <LiquidButton
              type="button"
              onClick={copyEmail}
              size="xl"
              className="rounded-full font-semibold"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-400" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copiar e-mail
                </>
              )}
            </LiquidButton>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {socials.map(({ icon: Icon, label, value, href }, index) => (
            <Reveal key={label} delay={0.4 + index * 0.1}>
              <motion.a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex h-full flex-col items-center gap-2 rounded-2xl border border-white/8 bg-ink-850/60 px-5 py-6 transition-colors hover:border-accent-400/40"
              >
                <Icon className="size-5 text-accent-400" />
                <span className="text-xs tracking-wide text-white/40 uppercase">{label}</span>
                <span className="max-w-full truncate text-sm text-white/75">{value}</span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
