import Hero from "./components/hero/hero"
import About from "./components/about/About"
import Portfolio from "./components/portfolio/portfolio"
import Contact from "./components/contact/Contact"

const App = () => {
  return (
    <div className='container'>
      <Hero/>
      <About/>
      <Portfolio/>
      <Contact/>
    </div>
  )
}

export default App