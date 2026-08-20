import { motion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Marquee } from '../ui/Marquee'
import { SpotlightCard } from '../ui/Spotlight'
import { TiltCard } from '../ui/TiltCard'
import { TechIcon } from '../ui/TechIcons'
import { skills, marqueeStack, categoryNotes, type Skill } from '../../data/profile'

const categories: Skill['category'][] = [
  'Back-end',
  'Front-end',
  'Dados',
  'Infra',
  'IA no fluxo de trabalho',
  'Ferramentas',
]

function SkillChip({ skill, delay }: { skill: Skill; delay: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/3 px-3.5 py-2.5 text-sm text-white/70 transition-colors hover:border-accent-400/40 hover:text-white"
    >
      <TechIcon name={skill.name} className="size-4.5" />
      {skill.name}
    </motion.li>
  )
}

export function Stack() {
  return (
    <section id="stack" className="relative overflow-hidden px-4 py-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Stack"
          title="Ferramentas que uso no dia a dia"
          description="O que eu realmente uso para construir e publicar — agrupado por onde entra no projeto."
        />

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {categories.map((category, categoryIndex) => {
            const items = skills.filter((skill) => skill.category === category)
            if (items.length === 0) return null

            return (
              <Reveal key={category} delay={categoryIndex * 0.06} className="h-full">
                <TiltCard max={6} className="h-full">
                  <SpotlightCard className="h-full p-6">
                    <h3 className="font-mono text-xs tracking-[0.2em] text-accent-400 uppercase">
                      {category}
                    </h3>
                    {categoryNotes[category] ? (
                      <p className="mt-3 text-sm leading-relaxed text-white/45">
                        {categoryNotes[category]}
                      </p>
                    ) : null}
                    <ul className="mt-5 flex flex-wrap gap-2.5">
                      {items.map((skill, index) => (
                        <SkillChip key={skill.name} skill={skill} delay={index * 0.05} />
                      ))}
                    </ul>
                  </SpotlightCard>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>

      <div className="relative mt-20 space-y-4">
        <Marquee duration="42s">
          {marqueeStack.map((item) => (
            <span
              key={`a-${item}`}
              className="flex items-center gap-2.5 rounded-full border border-white/8 bg-ink-850/70 px-5 py-3 font-mono text-sm whitespace-nowrap text-white/60 transition-colors hover:border-accent-400/40 hover:text-white"
            >
              <TechIcon name={item} className="size-4.5" />
              {item}
            </span>
          ))}
        </Marquee>

        <Marquee duration="52s" reverse>
          {[...marqueeStack].reverse().map((item) => (
            <span
              key={`b-${item}`}
              className="flex items-center gap-2.5 rounded-full border border-white/8 bg-ink-850/40 px-5 py-3 font-mono text-sm whitespace-nowrap text-white/35"
            >
              <TechIcon name={item} className="size-4.5 opacity-45" />
              {item}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
