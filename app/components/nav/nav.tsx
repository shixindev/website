import ThemeSwitcher from "./theme-switcher"
import { AlignJustify } from "lucide-react"

import Link from "../link"
import Menu from "../menu"

const WRITING_LIST = [
    {
        id: "life",
        name: "Life",
        url: "/life",
        direction: "inward",
    },
]
const APPEARANCE_LIST = [
    {
        id: "twitter",
        name: "Twitter",
        url: "https://x.com/xieshixinnerd",
        direction: "outward",
    },
    {
        id: "github",
        name: "Github",
        url: "https://github.com/shixindev",
        direction: "outward",
    },
]
const SECTION = [
    {
        name: "Writing",
        id: "writing",
        itemList: WRITING_LIST,
    },
    {
        name: "Appearance",
        id: "appearance",
        itemList: APPEARANCE_LIST,
    },
]

export default function Nav() {
    return (
        <div className="sticky inset-x-0 top-0 mb-12 bg-stone-100 dark:bg-stone-900">
            <nav className="mx-auto flex items-center justify-between px-4 py-2 lg:container">
                <Link direction="inward" variant="quiet" href="/">
                    Xie
                </Link>
                <div className="flex flex-row-reverse items-center sm:flex-row">
                    <div className="sm:hidden">
                        <Menu label={<AlignJustify />} section={SECTION} />
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                        <Menu label="Writing" list={WRITING_LIST} />
                        <Menu label="Appearance" list={APPEARANCE_LIST} />
                    </div>
                    <ThemeSwitcher />
                </div>
            </nav>
        </div>
    )
}
