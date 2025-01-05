"use client"

import { usePathname } from "next/navigation"

import GenericHeader from "./generic-header"
import Nav from "../nav"

const headerContent = {
    home: {
        title: "Hi, I'm Xie, working with front end technology mostly.",
        description:
            "React.js, Next.js, TailwindCSS, Motion, and React Aria Components are my go-to choice for front end thing.",
    },
    life: {
        title: "Life",
        description:
            "I write down some of my life experience for later reflection.",
    },
}

export default function Header() {
    const pathname = usePathname()
    const isHeaderNecessary = pathname === "/" || pathname === "/life"

    return (
        <>
            <Nav />
            {isHeaderNecessary && (
                <header className="mx-auto mb-24 max-w-screen-sm space-y-2 px-4 py-2">
                    {pathname === "/" && (
                        <GenericHeader headerContent={headerContent.home} />
                    )}
                    {pathname === "/life" && (
                        <GenericHeader headerContent={headerContent.life} />
                    )}
                </header>
            )}
        </>
    )
}
