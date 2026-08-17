import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Stack } from './components/sections/Stack'
import { Projects } from './components/sections/Projects'
import { Timeline } from './components/sections/Timeline'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/Footer'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { GlowCursor } from './components/ui/GlowCursor'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <GlowCursor />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
