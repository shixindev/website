import { useRef, useState, useEffect } from "react"

function themeUpdater() {
  const isThemeInLocalStorage = "theme" in window.localStorage
  document.documentElement.classList.add("theme-transitioning")

  if (
    window.localStorage.getItem("theme") === "dark" ||
    (!isThemeInLocalStorage &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark")
    document
      .querySelector("meta[name='theme-color'")
      ?.setAttribute("content", "black")
  }

  // if theme is in localStorage and it's not equal to dark, then removing dark, if theme isn't in localStorage, then null won't be equal to dark, so also removing dark to respect the default faux user light theme preference
  if (window.localStorage.getItem("theme") !== "dark") {
    document.documentElement.classList.remove("dark")
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", "white")
  }

  // theme-transitioning will be removed in the event loop after the event loop in which the operation above finished
  window.setTimeout(() => {
    document.documentElement.classList.remove("theme-transitioning")
  })
}

export default function useTheme() {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") ?? "light",
  )
  const isInitialStartUp = useRef(true)

  // Initially storing the theme from localStorage into reactive theme state
  useEffect(() => {
    const theme = window.localStorage.getItem("theme")

    if (theme === "light") {
      setTheme("light")
    }

    if (theme === "dark") {
      setTheme("dark")
    }
  }, [])

  // Dynamically synchronizing the theme in reactive theme state and localStorage
  useEffect(() => {
    if (theme === "light" || theme === "dark") {
      window.localStorage.setItem("theme", theme)
    }

    if (!isInitialStartUp.current) {
      themeUpdater()
    }

    if (isInitialStartUp) {
      isInitialStartUp.current = false
    }
  }, [theme])

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)")

    mediaQueryList.addEventListener("change", themeUpdater)

    // Dynamically synchronizing the theme in reactive theme state and localStorage
    function handleLocalStorageThemeChange(evt: StorageEvent) {
      themeUpdater()

      const { key, newValue } = evt

      if (key === "theme") {
        if (newValue !== null) {
          setTheme(newValue)
        }

        // if newValue is null, it's removed from either localStorage or sessionStorage programmatilcally by clear() or manually, then resetting the theme to the default faux user light preference
        if (newValue === null) {
          setTheme("light")
        }
      }
    }

    window.addEventListener("storage", handleLocalStorageThemeChange)

    return () => {
      mediaQueryList.removeEventListener("change", themeUpdater)
      window.removeEventListener("storage", handleLocalStorageThemeChange)
    }
  }, [])

  return [theme, setTheme] as const
}
