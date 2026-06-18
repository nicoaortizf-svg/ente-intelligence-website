import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Services from './components/Services'
import Industries from './components/Industries'
import Process from './components/Process'
import Outcomes from './components/Outcomes'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Outcomes />
      <Services />
      <Industries />
      <Process />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
