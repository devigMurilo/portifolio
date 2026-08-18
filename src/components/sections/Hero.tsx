import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react'
import { AuroraBackground } from '../ui/AuroraBackground'
import { BlurText } from '../ui/BlurText'
import { TypeWriter } from '../ui/TypeWriter'
import { LiquidButton } from '../ui/liquid-glass-button'
import { Magnetic } from '../ui/Magnetic'
import { NowPlayingCard } from '../ui/NowPlayingCard'
import { RandomLetterSwap } from '../ui/random-letter-swap'
import { profile } from '../../data/profile'

export function Hero() {
  const { scrollY } = useScroll()
  // Parallax leve: o conteúdo sobe e desbota conforme a página desce.
  const y = useTransform(scrollY, [0, 600], [0, 110])
  const opacity = useTransform(scrollY, [0, 420], [1, 0])

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden px-4 pt-28 pb-20 sm:px-6"
    >
      <AuroraBackground />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_28rem] 2xl:max-w-[88rem] 2xl:grid-cols-[minmax(0,1fr)_32rem]"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 text-xs text-white/70 backdrop-blur lg:px-4 lg:py-2 lg:text-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <RandomLetterSwap label="Disponível para estágio e projetos" staggerDuration={0.015} />
          </motion.div>

          <h1 className="mt-7 text-5xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-7xl lg:text-8xl xl:text-9xl">
            <BlurText text="Igor" once={false} />{' '}
            <BlurText
              text="Murilo"
              wordClassName="text-gradient animate-shimmer"
              blur={false}
              delay={0.18}
              once={false}
            />
          </h1>

          <div className="mt-6 flex min-h-8 items-center text-lg text-white/70 sm:text-2xl lg:mt-8 lg:min-h-10 lg:text-3xl">
            <span className="mr-2 font-mono text-accent-400">&gt;</span>
            <TypeWriter
              words={[
                'Desenvolvedor Full Stack',
                'Python & Django',
                'React & TypeScript',
                'API REST',
                'estudante do IFRN-SPP',
              ]}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg lg:max-w-2xl lg:text-xl"
          >
            Transformo ideia em produto que roda: banco de dados modelado, API bem definida e uma
            interface que não trava. Do Django ao React.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4 lg:mt-12 lg:gap-5"
          >
            <Magnetic strength={0.22}>
              <LiquidButton
                asChild
                size="xl"
                className="rounded-full font-semibold text-white lg:h-14 lg:px-10 lg:text-base"
              >
                <a href="#projetos">
                  Ver projetos
                  <ArrowUpRight className="size-4 lg:size-5" />
                </a>
              </LiquidButton>
            </Magnetic>

            <Magnetic strength={0.18}>
              <LiquidButton
                asChild
                size="xl"
                className="rounded-full font-semibold lg:h-14 lg:px-10 lg:text-base"
              >
                <a href={`mailto:${profile.email}`}>
                  <Sparkles className="size-4 text-accent-400 lg:size-5" />
                  Fale comigo
                </a>
              </LiquidButton>
            </Magnetic>

            <span className="ml-1 inline-flex items-center gap-1.5 text-xs text-white/40 lg:text-sm">
              <MapPin className="size-3.5 lg:size-4" />
              {profile.location}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-20 flex items-center gap-2 text-xs tracking-[0.2em] text-white/30 uppercase lg:text-sm"
          >
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ArrowDown className="size-4 lg:size-5" />
            </motion.span>
            <RandomLetterSwap label="role para conhecer" staggerDuration={0.02} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md lg:max-w-none"
        >
          <NowPlayingCard />
        </motion.div>
      </motion.div>
    </section>
  )
}
