import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Particle = {
  x: number
  y: number
  length: number
  thickness: number
  angle: number
  /** Deriva constante, em px por segundo. */
  vx: number
  vy: number
  /** Velocidade extra vinda do ponteiro. Decai sozinha até zero. */
  px: number
  py: number
  spin: number
  spinBoost: number
  color: string
  alpha: number
}

/** Paleta do site, com peso maior no roxo para o campo não virar arco-íris. */
const COLORS = ['#a78bfa', '#a78bfa', '#8b5cf6', '#22d3ee', '#e879f9', '#e6e6ee']

/** Raio de influência do ponteiro, em px. */
const POINTER_RADIUS = 170
/** Força máxima do empurrão, em px/s². */
const POINTER_FORCE = 1500

/**
 * Campo de traços que sobem devagar e se afastam do ponteiro. Desenhado em
 * canvas: em DOM seriam centenas de elementos e cada frame viraria recálculo
 * de layout.
 */
export function ParticleField({
  className,
  density = 9000,
  max = 260,
}: {
  className?: string
  /** Um traço a cada N pixels de área. Menor = mais denso. */
  density?: number
  max?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let frame = 0

    // Posição do canvas na tela, em cache: recalcular a cada pointermove
    // forçaria layout dezenas de vezes por segundo.
    let bounds = canvas.getBoundingClientRect()
    const pointer = { x: 0, y: 0, active: false }

    const random = (min: number, max: number) => min + Math.random() * (max - min)

    const create = (): Particle => ({
      x: random(0, width),
      y: random(0, height),
      length: random(6, 20),
      thickness: random(1.5, 3.5),
      angle: random(0, Math.PI * 2),
      vx: random(-6, 6),
      vy: random(-26, -8), // sobem: a queda para cima é o que dá o ar de antigravidade
      px: 0,
      py: 0,
      spin: random(-0.25, 0.25),
      spinBoost: 0,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: random(0.18, 0.62),
    })

    const resize = () => {
      bounds = canvas.getBoundingClientRect()
      // Limita o DPR: em telas 3x o custo triplica sem ganho visível num traço de 2px.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.min(max, Math.round((width * height) / density))
      particles = Array.from({ length: target }, create)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.lineCap = 'round'

      for (const particle of particles) {
        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(particle.angle)
        context.globalAlpha = particle.alpha
        context.strokeStyle = particle.color
        context.lineWidth = particle.thickness
        context.beginPath()
        context.moveTo(-particle.length / 2, 0)
        context.lineTo(particle.length / 2, 0)
        context.stroke()
        context.restore()
      }
    }

    let previous = performance.now()

    const tick = (now: number) => {
      // Passo por tempo, não por frame: a 144 Hz o campo não sobe mais rápido.
      const delta = Math.min((now - previous) / 1000, 0.05)
      previous = now

      // Decaimento exponencial: o empurrão do mouse some na mesma velocidade
      // independente da taxa de quadros.
      const damping = Math.exp(-2.6 * delta)
      const margin = 24

      for (const particle of particles) {
        if (pointer.active) {
          const dx = particle.x - pointer.x
          const dy = particle.y - pointer.y
          const distance = Math.hypot(dx, dy)

          if (distance < POINTER_RADIUS) {
            // Empurra para longe, mais forte quanto mais perto do cursor.
            const strength = (1 - distance / POINTER_RADIUS) * POINTER_FORCE * delta
            const safe = distance || 0.001
            particle.px += (dx / safe) * strength
            particle.py += (dy / safe) * strength
            particle.spinBoost += strength * 0.004
          }
        }

        particle.px *= damping
        particle.py *= damping
        particle.spinBoost *= damping

        particle.x += (particle.vx + particle.px) * delta
        particle.y += (particle.vy + particle.py) * delta
        particle.angle += (particle.spin + particle.spinBoost) * delta

        // Sai por um lado, volta pelo outro — o campo nunca esvazia.
        if (particle.y < -margin) {
          particle.y = height + margin
          particle.x = random(0, width)
        }
        if (particle.y > height + margin) particle.y = -margin
        if (particle.x < -margin) particle.x = width + margin
        if (particle.x > width + margin) particle.x = -margin
      }

      draw()
      frame = requestAnimationFrame(tick)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      // Só conta enquanto o cursor está sobre o campo.
      pointer.active = pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const onScroll = () => {
      bounds = canvas.getBoundingClientRect()
    }

    resize()

    if (reduceMotion) {
      draw()
    } else {
      frame = requestAnimationFrame(tick)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    const observer = new ResizeObserver(() => {
      resize()
      if (reduceMotion) draw()
    })
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [density, max])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
    />
  )
}
