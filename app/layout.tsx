import RoutingProvider from "@/providers/routing-provider"
import Header from "@/components/header"

import type { Metadata } from "next"
import { Source_Code_Pro } from "next/font/google"
import "./globals.css"

const sourceCodePro = Source_Code_Pro({
    variable: "--font-source-code-pro",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: { template: "%s • Xie Shixin", default: "Xie Shixin" },
    description:
        "Share life experience and technical knowledge about programming in general.",
    authors: [{ name: "Xie Shixin" }],
    openGraph: {
        title: "Xie Shixin",
        description:
            "Share life experience and technical knowledge about programming in general.",
        url: "https://xieshixin.vercel.app",
        type: "website",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            // for suppression hydration warning from dangerouslySetInnerHTML below
            suppressHydrationWarning={true}
            lang="en"
            className="scroll-pt-20 scroll-smooth"
        >
            <body
                className={`mb-24 bg-stone-50 text-stone-950 dark:bg-stone-950 dark:text-stone-50 ${sourceCodePro.variable} font-sans antialiased`}
            >
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        try {
                            const isThemePresent = localStorage.getItem("theme")
                            const isDarkTheme = isThemePresent === "dark" ? true : false
                            const themeMetaElement = document.querySelector("meta[name='theme-color']")

                            if (isDarkTheme || !isThemePresent && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                                document.documentElement.classList.add("dark")
                                themeMetaElement?.setAttribute("content", "#0c0a09")
                            } else {
                                document.documentElement.classList.remove("dark")
                                themeMetaElement?.setAttribute("content", "#fafaf9")
                            }
                        } catch (err) { }
                    `,
                    }}
                ></script>
                <RoutingProvider>
                    <Header />
                    {children}
                </RoutingProvider>
            </body>
        </html>
    )
}
