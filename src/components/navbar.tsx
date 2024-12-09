import clsx from "clsx"
import { useState, useEffect } from "react"
import {
  Menu as MenuIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
} from "lucide-react"
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  Link,
} from "react-aria-components"
import useTheme from "../hooks/use-theme"

export default function Navbar() {
  const [theme, setTheme] = useTheme()
  const [isOpaque, setIsOpaque] = useState(false)

  useEffect(() => {
    const offset = 50

    function handleScroll() {
      if (!isOpaque && window.scrollY > offset) {
        setIsOpaque(true)
      }

      if (isOpaque && window.scrollY <= offset) {
        setIsOpaque(false)
      }
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isOpaque])

  function handlePress() {
    if (theme === "light") {
      setTheme("dark")
    }

    if (theme === "dark") {
      setTheme("light")
    }
  }
  return (
    <nav
      className={clsx(
        isOpaque
          ? "bg-stone-100 dark:bg-stone-900"
          : "bg-stone-100/80 dark:bg-stone-900/80",
        "sticky inset-x-0 top-0 z-10 mb-24 px-4 transition-colors",
      )}
    >
      <div className="mx-auto flex h-12 max-w-screen-xl items-center justify-between">
        <Link className="react-aria-Button" href="#home">
          Xie
        </Link>
        <div className="flex items-center justify-center gap-4">
          <MenuTrigger>
            <Button aria-label="Content outline" className="react-aria-Button">
              <MenuIcon />
            </Button>
            <Popover>
              <Menu>
                <MenuItem>
                  <Link href="#initiative">Initiative</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="#continuation">Continuation</Link>
                </MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
          <Button onPress={handlePress}>
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
      </div>
    </nav>
  )
}
