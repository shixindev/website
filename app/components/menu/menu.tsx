import Button from "../button"

import {
    MenuTrigger,
    Menu as ReactAriaMenu,
    MenuSection,
    MenuItem,
    Popover,
    Header,
    Collection,
} from "react-aria-components"

interface ListItem {
    id: string | number
    name: string
    url: string
    direction: string
}
interface SectionItem {
    name: string
    id: string | number
    itemList: ListItem[]
}
interface MenuProps {
    children?: React.ReactNode
    label: string | React.ReactNode
    list?: ListItem[]
    section?: SectionItem[]
}

const menuStyle =
    "dark:bg-stone-900 flex flex-col gap-2 rounded border dark:border-stone-50/10 border-stone-950/10 shadow-md bg-stone-100 px-4 py-2"
const menuSectionStyle = "flex flex-col"
const menuItemStyle =
    "rounded px-2 py-1 dark:hover:bg-stone-700 transition-colors ease-in-out hover:bg-stone-200"

export default function Menu(props: MenuProps) {
    const { label, list, section } = props

    // because of TypeScript's sake, using ReactAriaMenu depending on the appearance of list or section
    return (
        <MenuTrigger>
            <Button>{label}</Button>
            <Popover>
                {list && (
                    <ReactAriaMenu items={list} className={menuStyle}>
                        {(item) => {
                            const { name, url, direction } = item

                            return (
                                <MenuItem
                                    className={menuItemStyle}
                                    target={
                                        direction === "inward"
                                            ? "_self"
                                            : "_blank"
                                    }
                                    href={url}
                                >
                                    {name}
                                </MenuItem>
                            )
                        }}
                    </ReactAriaMenu>
                )}
                {section && (
                    <ReactAriaMenu items={section} className={menuStyle}>
                        {(section) => {
                            const { name, itemList } = section

                            return (
                                <MenuSection className={menuSectionStyle}>
                                    <Header className="select-none font-semibold">
                                        {name}
                                    </Header>
                                    <Collection items={itemList}>
                                        {(item) => {
                                            const { name, url, direction } =
                                                item

                                            return (
                                                <MenuItem
                                                    className={menuItemStyle}
                                                    href={url}
                                                    target={
                                                        direction === "inward"
                                                            ? "_self"
                                                            : "_blank"
                                                    }
                                                >
                                                    {name}
                                                </MenuItem>
                                            )
                                        }}
                                    </Collection>
                                </MenuSection>
                            )
                        }}
                    </ReactAriaMenu>
                )}
            </Popover>
        </MenuTrigger>
    )
}
