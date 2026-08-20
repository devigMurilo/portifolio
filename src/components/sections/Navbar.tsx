import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../ui/BrandIcons'
import { LiquidButton } from '../ui/liquid-glass-button'
import { RandomLetterSwap } from '../ui/random-letter-swap'
import { profile } from '../../data/profile'
import { cn } from '@/lib/utils'

const links = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'stack', label: 'Stack' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'empresas', label: 'Para empresas' },
  { id: 'contato', label: 'Contato' },
]

/**
 * Hambúrguer que vira X. As três barras ficam em posição fixa e só recebem
 * `transform` — nada de animar `top`/`bottom`, que forçaria layout a cada frame.
 * A do meio some encolhendo na horizontal enquanto as outras duas se cruzam.
 */
function BurgerIcon({ open }: { open: boolean }) {
  const bar = 'absolute left-0 h-0.5 w-full rounded-full bg-current'
  const spring = { type: 'spring', stiffness: 380, damping: 28 } as const

  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <motion.span
        className={cn(bar, 'top-0 origin-center')}
        animate={{ y: open ? 6 : 0, rotate: open ? 45 : 0 }}
        transition={spring}
      />
      <motion.span
        className={cn(bar, 'top-[6px]')}
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className={cn(bar, 'top-[12px] origin-center')}
        animate={{ y: open ? -6 : 0, rotate: open ? -45 : 0 }}
        transition={spring}
      />
    </span>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('inicio')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Marca o link ativo pela seção mais visível na viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    links.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-90 px-4 pt-3 sm:px-6"
    >
      <nav
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300',
          scrolled
            ? 'glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]'
            : 'border-transparent bg-transparent',
        )}
      >
        <a href="#inicio" className="group flex items-center gap-2 font-mono text-sm font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-accent-500 to-cyan-400 text-ink-950">
            IM
          </span>
          <span className="hidden text-white/80 transition-colors group-hover:text-white sm:block">
            {profile.handle}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ id, label }) => (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                className={cn(
                  'relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  active === id ? 'text-white' : 'text-white/55 hover:text-white/90',
                )}
              >
                <RandomLetterSwap
                  label={label}
                  staggerDuration={0.025}
                  transition={{ duration: 0.6, type: 'spring' }}
                />
              </a>
              {active === id ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                  transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                />
              ) : null}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <LiquidButton asChild size="icon" className="rounded-full text-white/60">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon className="size-4.5" />
            </a>
          </LiquidButton>
          <LiquidButton asChild size="icon" className="rounded-full text-white/60">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon className="size-4.5" />
            </a>
          </LiquidButton>
          <LiquidButton asChild size="icon" className="rounded-full text-white/60">
            <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon className="size-4.5" />
            </a>
          </LiquidButton>
          <LiquidButton
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menu"
            aria-expanded={open}
            size="icon"
            className="rounded-full text-white/70 md:hidden"
          >
            <BurgerIcon open={open} />
          </LiquidButton>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.ul
            initial={{ opacity: 0, height: 0, scaleY: 0.92 }}
            animate={{ opacity: 1, height: 'auto', scaleY: 1 }}
            exit={{ opacity: 0, height: 0, scaleY: 0.92 }}
            style={{ transformOrigin: 'top' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl glass p-2 md:hidden"
          >
            {links.map(({ id, label }, index) => (
              <motion.li
                key={id}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                // Na saída a ordem inverte: o último item some primeiro.
                exit={{
                  opacity: 0,
                  x: -14,
                  transition: { delay: (links.length - 1 - index) * 0.03 },
                }}
                transition={{ delay: 0.06 + index * 0.045, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-xl px-4 py-2.5 text-sm transition-colors',
                    active === id ? 'bg-white/8 text-white' : 'text-white/60 hover:bg-white/5',
                  )}
                >
                  <RandomLetterSwap
                    label={label}
                    staggerDuration={0.025}
                    transition={{ duration: 0.6, type: 'spring' }}
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
