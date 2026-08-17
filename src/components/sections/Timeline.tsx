import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { timeline } from '../../data/profile'

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  // A linha vertical cresce conforme a seção passa pela viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 55%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 })

  return (
    <section id="trajetoria" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Trajetória"
          title="Como cheguei até aqui"
          description="Da primeira página em HTML às APIs REST em Django, passando pelas disciplinas do IFRN."
        />

        <div ref={ref} className="relative pl-8 sm:pl-12">
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-white/8 sm:left-[15px]" aria-hidden />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-linear-to-b from-accent-400 via-fuchsia-400 to-cyan-400 sm:left-[15px]"
            aria-hidden
          />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} direction="left">
                <div className="group relative">
                  <motion.span
                    className="absolute top-1.5 -left-8 grid size-4 place-items-center rounded-full border border-accent-400/40 bg-ink-950 sm:-left-12"
                    whileInView={{ scale: [0.5, 1.25, 1] }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    aria-hidden
                  >
                    <span className="size-1.5 rounded-full bg-accent-400 transition-all group-hover:scale-150 group-hover:shadow-[0_0_12px_var(--color-accent-400)]" />
                  </motion.span>

                  <p className="font-mono text-xs tracking-wider text-accent-400">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold transition-colors group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/40">{item.place}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
