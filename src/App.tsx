import { useEffect } from "react"
import Lenis from 'lenis'
// import { Button } from "./components/ui/button"
import { Hero } from "@/components/Hero"
import { Stats } from "@/components/Stats"
import { Projects } from "@/components/Projects"
import { About } from "@/components/About"
import { Services } from "@/components/Services"
import { Resume } from "@/components/Resume"
import { Contact } from "@/components/Contact"
import { ScrollProgress } from "@/components/ScrollProgress"
import { BackToTop } from "@/components/BackToTop"

// }
export const App = () => {
  useEffect (() => {
    document.documentElement.classList.add("dark")
    const lenis = new Lenis()
    
    function raf(time: any) {
      lenis.raf(time)

      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  },[])


  return (
    <main className="flex flex-col container mx-auto p-10 max-w-4xl lg:pr-10 lg:pl-10 lg:max-w-6xl">
      <ScrollProgress />
      <BackToTop />
      <Hero />
      <Stats />
      <Projects />
      <About />
      <Services />
      <Resume />
      <Contact />
    </main>
  ) 
}