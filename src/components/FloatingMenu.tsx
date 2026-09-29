import { useEffect,useState } from "react"

import { cn } from "@/lib/utils"

import { navLinks } from "@/constants"

export const FloatingMenu = () => {
    const [active, setActive] = useState('#hero')

    useEffect(() => {
                const sections = document.querySelectorAll("section[id]")

                const observer = new IntersectionObserver(
                    (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                        setActive(`#${entry.target.id}`)
                        }
                    })
                    },
                    {
                    threshold: 0.4,
                    }
                )

            sections.forEach((section) => observer.observe(section))

            return () => observer.disconnect()
            }, [])

    return ( <nav aria-label="Floating Navigation" className="fixed right-10 top-1/2 -translate-y-1/2 bg-black border border-neutral-500 rounded-2xl z-10 hidden lg:flex flex-col items-center py-4">
        {navLinks.map((link) => {
            const Icon = link.icon

            return (
                <a
                    aria-label={link.label}
                    key={link.label}
                    href={link.link}
                    onClick={() => setActive(link.link)}
                    className={cn(
                        "group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                        active === link.link
                        ? "bg-gray-500 text-black shadow-lg shadow-gray-900/15"
                        : "text-neutral-400 hover:bg-primary/10 hover:text-primary"
                    )}
                    >
                    <Icon className="size-5" />

                    <span
                        className="absolute right-14 rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-1 text-sm whitespace-nowrap opacity-0 translate-x-2 transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0">
                        {link.label}
                    </span>
                    </a>
            )
        })}
    </nav>
    )
}