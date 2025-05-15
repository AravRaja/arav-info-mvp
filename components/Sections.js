import Projects from './sections/Projects'
import Experience from './sections/Experience'
import About from './sections/About'
import Contact from './sections/Contact'

export default function Sections() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <section id="projects" className="snap-start min-h-screen flex items-center justify-center bg-background text-white">
        <Projects />
      </section>
      <section id="experience" className="snap-start min-h-screen flex items-center justify-center bg-background text-white">
        <Experience />
      </section>
      <section id="about" className="snap-start min-h-screen flex items-center justify-center bg-background text-white">
        <About />
      </section>
      <section id="contact" className="snap-start min-h-screen flex items-center justify-center bg-background text-white">
        <Contact />
      </section>
    </main>
  )
}
