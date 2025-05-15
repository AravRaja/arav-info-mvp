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
      <div className="bg-white min-h-screen transition-colors duration-1000" id="main-bg">
        <Header />
        <Hero />
        <Sections />
      </div>
    </>
  )
}
