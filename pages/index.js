import Head from 'next/head'
import Hero from '../components/Hero'
import Sections from '../components/Sections'
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>arav.info – Portfolio</title>
        <meta name="description" content="Arav's Developer Portfolio" />
      </Head>
      {/* SVG overlay as fixed full-page background (zIndex 9999 for testing) */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <img
          src="/background.svg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1, pointerEvents: 'none', opacity: 0.15 }}
        />
      </div>
      <div className="bg-white min-h-screen transition-colors duration-1000" id="main-bg" style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <Hero />
        <Sections />
      </div>
    </>
  )
}
