import { useEffect } from "react"

import Lenis from "lenis"

import { Hero } from "@/components/Hero"
import { Stats } from "@/components/Stats"
import { About } from "@/components/About"
import { Services } from "@/components/Services"
import { Projects } from "@/components/Projects"
import { Resume } from "@/components/Resume"
import { Contact } from "@/components/Contact"

import { ScrollProgress } from "@/components/ScrollProgress"
import { BackToTop } from "@/components/BackToTop"
import { AIChatbot } from "@/components/AIChatbot"

export const App = () => {
    useEffect(() => {
        document.documentElement.classList.add("dark")

        const lenis = new Lenis()

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return (
        <>
            <main className="container mx-auto flex max-w-4xl flex-col p-10 lg:max-w-6xl lg:pr-10 lg:pl-10">
                <Hero />
                <Stats />
                <About />
                <Services />
                <Projects />
                <Resume />
                <Contact />
            </main>

            <ScrollProgress />
            <BackToTop />
            <AIChatbot />
        </>
    )
}