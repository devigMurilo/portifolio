import { motion } from 'motion/react'
import { ArrowUpRight, Check, TrendingDown } from 'lucide-react'
import { WhatsappIcon } from '../ui/BrandIcons'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { StackedCards } from '../ui/StackedCards'
import { SpotlightCard } from '../ui/Spotlight'
import { TiltCard } from '../ui/TiltCard'
import { Magnetic } from '../ui/Magnetic'
import { LiquidButton } from '../ui/liquid-glass-button'
import { BlurText } from '../ui/BlurText'
import { RandomLetterSwap } from '../ui/random-letter-swap'
import { pitch, profile } from '../../data/profile'

export function Pitch() {
  const whatsappUrl = profile.whatsapp
    ? `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
        'Oi, Igor! Vi seu portfólio e queria falar sobre um site para minha empresa.',
      )}`
    : null

  return (
    <section id="empresas" className="relative px-4 py-28 sm:px-6">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklab,var(--color-accent-500)_14%,transparent),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={pitch.eyebrow} title={pitch.title} description={pitch.intro} />

        <StackedCards className="mx-auto max-w-3xl space-y-16 pb-28">
          {pitch.losses.map((item, index) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-ink-850 p-7 shadow-[0_-24px_70px_-40px_rgba(0,0,0,0.95)] sm:p-9"
            >
              <div className="flex items-start gap-5">
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-accent-500 tabular-nums sm:text-6xl"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2.5">
                    <TrendingDown className="mt-1 size-4 shrink-0 text-accent-400" />
                    <h3 className="font-display text-2xl leading-none tracking-[0.01em] text-white uppercase sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </StackedCards>

        <div className="mt-24">
          <h3 className="max-w-3xl text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
            <BlurText text={pitch.answerTitle} />
          </h3>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 lg:text-lg">
              {pitch.answerIntro}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {pitch.answers.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <TiltCard max={8} className="h-full">
                  <SpotlightCard className="flex h-full flex-col p-6">
                    <h4 className="flex items-start gap-2.5 text-base font-semibold text-white">
                      <Check className="mt-0.5 size-4.5 shrink-0 text-accent-400" />
                      {item.title}
                    </h4>
                    <p className="mt-3 grow text-sm leading-relaxed text-white/55">
                      {item.description}
                    </p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-white/50 transition-colors hover:border-accent-400/50 hover:text-white"
                    >
                      {item.proof}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </SpotlightCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-24 overflow-hidden rounded-3xl glass p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                  {pitch.ctaTitle}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/55">
                  {pitch.ctaText}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {whatsappUrl ? (
                    <Magnetic strength={0.2}>
                      <LiquidButton
                        asChild
                        size="xl"
                        className="rounded-full font-semibold text-white"
                      >
                        <a href={whatsappUrl} target="_blank" rel="noreferrer">
                          <WhatsappIcon className="size-4 text-[#25D366]" />
                          <RandomLetterSwap label="Chamar no WhatsApp" loop loopInterval={1600} />
                        </a>
                      </LiquidButton>
                    </Magnetic>
                  ) : null}

                  <Magnetic strength={0.18}>
                    <LiquidButton asChild size="xl" className="rounded-full font-semibold">
                      <a href={`mailto:${profile.email}?subject=Site para minha empresa`}>
                        <RandomLetterSwap label="Falar por e-mail" loop loopInterval={1450} />
                        <ArrowUpRight className="size-4" />
                      </a>
                    </LiquidButton>
                  </Magnetic>
                </div>
              </div>

              <ul className="space-y-4 lg:border-l lg:border-white/8 lg:pl-12">
                {pitch.whyMe.map((reason, index) => (
                  <motion.li
                    key={reason}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px 0px' }}
                    transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3 text-sm leading-relaxed text-white/60"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-400" />
                    {reason}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
