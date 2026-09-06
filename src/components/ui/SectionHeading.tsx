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

      <h2 className="mt-4 font-display text-5xl leading-[0.9] font-normal tracking-[0.01em] text-balance uppercase sm:text-6xl md:text-7xl">
        <BlurText
          text={title}
          accentClassName="font-serif text-accent-400 normal-case italic tracking-normal"
        />
      </h2>

      {description ? (
        <Reveal delay={0.15}>
          <p className="mt-5 text-base leading-relaxed text-white/55">{description}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
