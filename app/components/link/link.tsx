import { cva } from "class-variance-authority"
import FrameworkLink from "next/link"

import type { VariantProps } from "class-variance-authority"

const LinkVariants = cva(
    "inline-flex flex-wrap items-center gap-1 transition-colors ease-in-out",
    {
        variants: {
            variant: {
                primary:
                    "decoration-current decoration-2 underline hover:decoration-transparent focus-visible:decoration-transparent",
                secondary:
                    "decoration-transparent decoration-2 underline hover:decoration-current focus-visible:decoration-current",
                quiet: "dark:hover:bg-stone-700 px-2 py-1 rounded hover:bg-stone-200",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    },
)

interface LinkProps extends VariantProps<typeof LinkVariants> {
    children: React.ReactNode
    href: string
    direction: "inward" | "outward"
}

export default function Link(props: LinkProps) {
    const { href, children, direction = "outward", variant } = props

    return (
        <FrameworkLink
            className={LinkVariants({ variant })}
            href={href}
            target={direction === "inward" ? "_self" : "_blank"}
        >
            {children}
        </FrameworkLink>
    )
}
