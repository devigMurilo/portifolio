import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Music, Pause, Play } from 'lucide-react'
import { RandomLetterSwap } from './random-letter-swap'
import { SpotlightCard } from './Spotlight'
import { TiltCard } from './TiltCard'
import { nowPlaying } from '../../data/profile'
import { cn } from '@/lib/utils'

/** Barras de equalizador. Só se mexem enquanto o preview está tocando. */
function Equalizer({ playing }: { playing: boolean }) {
  const bars = [0.9, 0.45, 1, 0.6, 0.75]

  return (
    <div className="flex h-4 items-end gap-[3px] lg:h-5 lg:gap-1" aria-hidden>
      {bars.map((peak, index) => (
        <motion.span
          key={index}
          className="w-[3px] rounded-full bg-accent-400 lg:w-1"
          animate={
            playing
              ? { height: [`${peak * 25}%`, '100%', `${peak * 45}%`] }
              : { height: `${peak * 35}%` }
          }
          transition={
            playing
              ? {
                  duration: 0.55 + index * 0.12,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}

export function NowPlayingCard({ className }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [artworkFailed, setArtworkFailed] = useState(false)
  const [showFull, setShowFull] = useState(false)

  // O <audio> pode parar sozinho (fim do preview de 30s, erro de rede),
  // então o estado do botão segue o elemento, não o clique.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const sync = () => setPlaying(!audio.paused && !audio.ended)
    const events = ['play', 'pause', 'ended', 'error'] as const
    events.forEach((event) => audio.addEventListener(event, sync))
    return () => events.forEach((event) => audio.removeEventListener(event, sync))
  }, [])

  /*
   * O embed só é criado depois do clique: sem isso a página abriria conexão com
   * o YouTube em todo carregamento, mesmo para quem nunca vai tocar a música.
   */
  const toggleFull = () => {
    audioRef.current?.pause()
    setShowFull((value) => !value)
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  return (
    <TiltCard max={8} className={cn('w-full max-w-sm lg:max-w-none', className)}>
      <SpotlightCard className="p-5 lg:p-6 xl:p-7" color="var(--color-cyan-400)">
        <p className="mb-4 flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-white/35 uppercase lg:mb-5 lg:text-xs">
          <Equalizer playing={playing} />
          {playing ? 'tocando agora' : 'ouvindo em loop'}
        </p>

        <div className="flex items-center gap-4 lg:gap-5">
          <div className="relative shrink-0">
            <div
              className={cn(
                'absolute -inset-1 rounded-xl bg-linear-to-br from-accent-500 to-cyan-400 blur-md transition-opacity duration-500',
                playing ? 'opacity-70' : 'opacity-30',
              )}
              aria-hidden
            />
            {artworkFailed ? (
              <div className="relative grid size-20 place-items-center rounded-xl bg-ink-800 text-white/30 lg:size-24 xl:size-28">
                <Music className="size-7 lg:size-9" />
              </div>
            ) : (
              <img
                src={nowPlaying.artwork}
                alt={`Capa do álbum ${nowPlaying.album}, de ${nowPlaying.artist}`}
                width={80}
                height={80}
                loading="eager"
                fetchPriority="high"
                onError={() => setArtworkFailed(true)}
                className="relative size-20 rounded-xl object-cover lg:size-24 xl:size-28"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <a
              href={nowPlaying.url}
              target="_blank"
              rel="noreferrer"
              className="block truncate font-semibold text-white transition-colors hover:text-accent-400 lg:text-lg xl:text-xl"
            >
              <RandomLetterSwap
                label={nowPlaying.track}
                staggerDuration={0.02}
                transition={{ duration: 0.5, type: 'spring' }}
              />
            </a>
            <p className="truncate text-sm text-white/50 lg:text-base">
              <RandomLetterSwap
                label={nowPlaying.artist}
                staggerDuration={0.02}
                transition={{ duration: 0.5, type: 'spring' }}
              />
            </p>
            <p className="mt-0.5 truncate font-mono text-[11px] text-white/30 lg:text-xs">
              {nowPlaying.album} · {nowPlaying.year}
            </p>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pausar prévia' : 'Tocar prévia de 30 segundos'}
            aria-pressed={playing}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-accent-400/60 hover:bg-accent-500/15 active:scale-95 lg:size-13"
          >
            {playing ? (
              <Pause className="size-4.5 lg:size-5" />
            ) : (
              <Play className="size-4.5 translate-x-0.5 lg:size-5" />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={toggleFull}
          aria-expanded={showFull}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/50 transition-colors hover:border-accent-400/50 hover:text-white"
        >
          <ChevronDown
            className={cn('size-3.5 transition-transform duration-300', showFull && 'rotate-180')}
          />
          {showFull ? 'fechar player' : 'ouvir a música completa'}
        </button>

        <AnimatePresence initial={false}>
          {showFull ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${nowPlaying.fullTrackId}?autoplay=1&rel=0&modestbranding=1`}
                  title={`${nowPlaying.track} — ${nowPlaying.artist}, áudio oficial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="size-full"
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <audio ref={audioRef} src={nowPlaying.preview} preload="none" />
      </SpotlightCard>
    </TiltCard>
  )
}
