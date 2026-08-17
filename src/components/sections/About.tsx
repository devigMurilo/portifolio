import { motion } from 'motion/react'
import { GraduationCap, Mail } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { SpotlightCard } from '../ui/Spotlight'
import { TiltCard } from '../ui/TiltCard'
import { profile } from '../../data/profile'

export function About() {
  return (
    <section id="sobre" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sobre"
          title="Quem está por trás do código"
          description="Estudante de Informática para Internet, focado em back-end com Python e em interfaces que dão gosto de usar."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr]">
          <Reveal direction="right">
            <TiltCard max={7}>
              <SpotlightCard className="h-full p-7">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-linear-to-br from-accent-500 to-cyan-400 opacity-60 blur-md" />
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      loading="lazy"
                      className="relative size-20 rounded-2xl object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{profile.name}</p>
                    <p className="font-mono text-sm text-accent-400">@{profile.handle}</p>
                  </div>
                </div>

                <p className="mt-6 flex items-start gap-2.5 text-sm text-white/55">
                  <GraduationCap className="mt-0.5 size-4.5 shrink-0 text-accent-400" />
                  {profile.headline}
                </p>

                <div className="mt-7 space-y-2.5">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2.5 rounded-xl border border-white/8 px-4 py-3 text-sm text-white/70 transition-all hover:border-accent-400/40 hover:bg-white/4 hover:text-white"
                  >
                    <Mail className="size-4 text-accent-400" />
                    <span className="truncate">{profile.email}</span>
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 rounded-xl border border-white/8 px-4 py-3 text-sm text-white/70 transition-all hover:border-accent-400/40 hover:bg-white/4 hover:text-white"
                  >
                    <GithubIcon className="size-4 text-accent-400" />
                    github.com/{profile.handle}
                  </a>
                </div>
              </SpotlightCard>
            </TiltCard>
          </Reveal>

          <div className="flex flex-col justify-center gap-7">
            {profile.bio.map((paragraph, index) => (
              <Reveal key={index} delay={0.1 + index * 0.12}>
                <p className="text-lg leading-relaxed text-white/60">{paragraph}</p>
              </Reveal>
            ))}

            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {profile.stats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.25 + index * 0.1} direction="scale">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="rounded-2xl border border-white/8 bg-ink-850/60 p-5"
                  >
                    <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                    <p className="mt-1 text-xs tracking-wide text-white/40 uppercase">{stat.label}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
