import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Star } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import { SectionHeading } from '../ui/SectionHeading'
import { SpotlightCard } from '../ui/Spotlight'
import { TiltCard } from '../ui/TiltCard'
import { LiquidButton } from '../ui/liquid-glass-button'
import { profile, projects, type Project } from '../../data/profile'
import { cn } from '@/lib/utils'

const filters = ['Todos', 'Django', 'React', 'TypeScript', 'JavaScript'] as const

const statusStyles: Record<Project['status'], string> = {
  'Concluído': 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  'Em desenvolvimento': 'text-amber-300 bg-amber-400/10 border-amber-400/20',
  Estudo: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard max={6} className="h-full">
      <SpotlightCard className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {project.featured ? <Star className="size-3.5 shrink-0 fill-accent-400 text-accent-400" /> : null}
              <h3 className="truncate text-lg font-semibold transition-colors group-hover:text-accent-400">
                {project.title}
              </h3>
            </div>
            <p className="mt-1 truncate font-mono text-xs text-white/35">{project.repo}</p>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${project.title} no GitHub`}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 text-white/50 transition-all hover:border-accent-400/50 hover:bg-accent-500/10 hover:text-white"
          >
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <p className="mt-4 grow text-sm leading-relaxed text-white/55">{project.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/8 bg-white/4 px-2.5 py-1 font-mono text-[11px] text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/6 pt-4">
          <span className={cn('rounded-full border px-2.5 py-1 text-[11px]', statusStyles[project.status])}>
            {project.status}
          </span>
          <span className="font-mono text-xs text-white/30">{project.year}</span>
        </div>
      </SpotlightCard>
    </TiltCard>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Todos')

  const visible = useMemo(
    () =>
      filter === 'Todos'
        ? projects
        : projects.filter((project) => project.tags.some((tag) => tag.includes(filter))),
    [filter],
  )

  return (
    <section id="projetos" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projetos"
          title="O que eu já construí"
          description="Projetos do meu GitHub — da faculdade e de estudo por conta própria. Todos com código aberto."
        />

        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((item) => (
            <LiquidButton
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              size="sm"
              aria-pressed={filter === item}
              className={cn(
                'rounded-full font-medium',
                filter === item
                  ? 'text-white ring-1 ring-accent-400/60'
                  : 'text-white/55 hover:text-white',
              )}
            >
              {item}
            </LiquidButton>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.div
                key={project.repo}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -12 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={cn(project.featured && filter === 'Todos' && 'lg:col-span-1')}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-white/40">Nenhum projeto com esse filtro.</p>
        ) : null}

        <div className="mt-14 flex justify-center">
          <LiquidButton asChild size="lg" className="rounded-full font-medium">
            <a href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer">
              <GithubIcon className="size-4" />
              Ver todos os repositórios
              <ArrowUpRight className="size-4" />
            </a>
          </LiquidButton>
        </div>
      </div>
    </section>
  )
}
