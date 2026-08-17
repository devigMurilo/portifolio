import { BlurText } from './BlurText'
import { Reveal } from './Reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-14 max-w-2xl">
      <Reveal direction="right">
        <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.22em] text-accent-400 uppercase">
          <span className="h-px w-8 bg-linear-to-r from-accent-400 to-transparent" />
          {eyebrow}
        </span>
      </Reveal>

      <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
        <BlurText text={title} />
      </h2>

      {description ? (
        <Reveal delay={0.15}>
          <p className="mt-5 text-base leading-relaxed text-white/55">{description}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
