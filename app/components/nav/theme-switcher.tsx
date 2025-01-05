import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect"

import { motion } from "motion/react"
import { Switch } from "react-aria-components"
import { useEffect, useRef, useState } from "react"
import { Sun, Moon } from "lucide-react"

function updateTheme() {
    document.documentElement.classList.add("theme-transitioning")

    const isThemePresent = localStorage.getItem("theme")
    // element below won't be present in the HTML (intentional), because, currently, Next.js viewport themeColor will produce two theme-color meta tag,
    // so it will, probably, confuse the user agent about which color they should use to style its widget
    const themeMetaElement = document.querySelector("meta[name='theme-color']")

    if (
        localStorage.theme === "dark" ||
        (!isThemePresent &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark")
        themeMetaElement?.setAttribute("content", "#0c0a09")
    } else {
        document.documentElement.classList.remove("dark")
        themeMetaElement?.setAttribute("content", "#fafaf9")
    }

    window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning")
    })
}

function useTheme() {
    const [theme, setTheme] = useState("")
    const initial = useRef(true)

    useIsomorphicLayoutEffect(() => {
        const storageTheme = localStorage.getItem("theme")

        if (storageTheme === "light" || storageTheme === "dark") {
            setTheme(storageTheme)
        } else {
            setTheme("system")
        }
    }, [])

    useIsomorphicLayoutEffect(() => {
        if (theme === "light" || theme === "dark") {
            localStorage.setItem("theme", theme)
        }

        if (initial.current) {
            initial.current = false
        } else {
            updateTheme()
        }
    }, [theme])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        // when color scheme preference's changed system-wide, running updateTheme
        mediaQuery.addEventListener("change", updateTheme)

        function onStorage() {
            updateTheme()

            const theme = localStorage.getItem("theme")

            if (theme === "light" || theme === "dark") {
                setTheme(theme)
            } else {
                setTheme("system")
            }
        }

        window.addEventListener("storage", onStorage)

        return () => {
            mediaQuery.removeEventListener("change", updateTheme)
            window.removeEventListener("storage", onStorage)
        }
    }, [])

    return [theme, setTheme] as const
}

export default function ThemeSwitcher() {
    const [theme, setTheme] = useTheme()
    const isDarkTheme = theme === "dark" ? true : false

    // hook will only work after hydration is done, before hydration is done, theme is indeterminate,
    // so ThemeSwitcher will probably have wrong style, if the user's preference is dark, but the component
    // is assuming the preference is light, in this situation, the style of ThemeSwitcher will flash from light to dark
    // so as to prevent that flash from happening, when theme is indeterminate, only return one placeholder with the similar (precisely speaking)
    // width and height to prevent layout shift
    return (
        <motion.div
            variants={{
                invisible: {
                    opacity: 0,
                },
                visible: {
                    opacity: 1,
                },
            }}
            initial="invisible"
            animate="visible"
        >
            {theme ? (
                <Switch
                    aria-label="theme switcher"
                    isSelected={isDarkTheme}
                    onChange={(isDarkTheme) => {
                        if (isDarkTheme) {
                            setTheme("dark")
                        } else {
                            setTheme("light")
                        }
                    }}
                >
                    <div className="indicator-wrapper">
                        <span className="indicator">
                            {theme === "dark" ? (
                                <Moon size={16} />
                            ) : (
                                <Sun size={16} />
                            )}
                        </span>
                    </div>
                </Switch>
            ) : (
                <div className="h-[25.3333px] w-[50px]"></div>
            )}
        </motion.div>
    )
}
