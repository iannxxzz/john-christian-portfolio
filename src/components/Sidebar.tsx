import { useState } from "react"

import { cn } from "@/lib/utils"

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

import { MenuIcon } from "lucide-react"

import { navLinks, socialLinks } from "@/constants"

export const Sidebar = () => {
    const [active, setActive] = useState("#hero")

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        aria-label="Open Menu"
                        variant="ghost"
                        size="icon"
                        className="fixed top-4 right-4 z-50 m-4 cursor-pointer rounded-2xl border-2 bg-neutral-800 px-5 py-5 hover:border-primary hover:text-primary"
                    >
                        <MenuIcon size={30} />
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="right"
                    className="w-84 bg-neutral-900 py-6 pl-10 text-white"
                >
                    <SheetTitle className="text-lg font-semibold">
                        Menu
                    </SheetTitle>

                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => {
                            const Icon = link.icon

                            return (
                                <a
                                    href={link.link}
                                    key={link.label}
                                    onClick={() => setActive(link.link)}
                                    className={cn(
                                        "flex items-center gap-2 text-base text-neutral-300 transition-colors duration-200 hover:text-primary",
                                        active === link.link && "text-white",
                                    )}
                                >
                                    <Icon className="size-4" />
                                    {link.label}
                                </a>
                            )
                        })}
                    </nav>

                    <div className="mt-30">
                        <p className="pb-2">Socials</p>

                        <div className="flex gap-3 text-neutral-500">
                            {socialLinks.map((social) => {
                                const Icon = social.icon

                                return (
                                    <a
                                        key={social.label}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="rounded-2xl border-2 border-neutral-500 p-2 transition duration-200 hover:border-primary hover:text-primary"
                                    >
                                        <Icon className="size-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}