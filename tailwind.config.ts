import typography from "@tailwindcss/typography"

import type { Config } from "tailwindcss"

export default {
    darkMode: "selector",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-source-code-pro)"],
            },
        },
    },
    plugins: [typography()],
} satisfies Config
