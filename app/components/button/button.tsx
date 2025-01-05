import { cva } from "class-variance-authority"
import { Button as ReactAriaButton } from "react-aria-components"

import type { VariantProps } from "class-variance-authority"

const ButtonVariants = cva(
    "inline-flex items-center gap-2 transition-colors ease-in-out",
    {
        variants: {
            variant: {
                quiet: "dark:hover:bg-stone-700 px-2 py-1 rounded hover:bg-stone-200",
            },
        },
        defaultVariants: {
            variant: "quiet",
        },
    },
)

interface ButtonProps extends VariantProps<typeof ButtonVariants> {
    children: React.ReactNode
}

export default function Button(props: ButtonProps) {
    const { children, variant } = props

    return (
        <ReactAriaButton className={ButtonVariants({ variant })}>
            {children}
        </ReactAriaButton>
    )
}
