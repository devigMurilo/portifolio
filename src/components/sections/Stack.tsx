import { motion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Marquee } from '../ui/Marquee'
import { TechIcon } from '../ui/TechIcons'
import { skills, marqueeStack, type Skill } from '../../data/profile'

const categories: Skill['category'][] = ['Back-end', 'Front-end', 'Dados', 'Ferramentas']

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 text-sm text-white/75">
          <TechIcon name={skill.name} className="size-4" />
          <span className="truncate">{skill.name}</span>
        </span>
        <span className="font-mono text-xs text-white/35">{skill.level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-accent-500 to-cyan-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
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
          description="As tecnologias listadas no meu perfil do GitHub, com o nível honesto de cada uma."
        />

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {categories.map((category, categoryIndex) => {
            const items = skills.filter((skill) => skill.category === category)
            return (
              <Reveal key={category} delay={categoryIndex * 0.08}>
                <div className="rounded-2xl border border-white/8 bg-ink-900/50 p-6">
                  <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-accent-400 uppercase">
                    {category}
                  </h3>
                  <div className="space-y-5">
                    {items.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} delay={index * 0.08} />
                    ))}
                  </div>
                </div>
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
