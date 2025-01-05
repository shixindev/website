"use client"

import Link from "../link"

import { motion } from "motion/react"

import type { Matter } from "@/types/matter"

interface WritingPreviewProps {
    matter: Matter
}
export default function WritingPreview(props: WritingPreviewProps) {
    const { matter } = props
    const { title, description, category, slug } = matter
    const href = `/${category}/${slug}`

    return (
        <motion.article
            variants={{
                invisible: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
            }}
            initial="invisible"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-screen-sm space-y-2 px-4 py-2"
        >
            <h2 className="text-xl font-semibold">
                <Link variant="secondary" href={href} direction="inward">
                    {title}
                </Link>
            </h2>
            <p>{description}</p>
            <Link variant="secondary" href={href} direction="inward">
                Read More
            </Link>
        </motion.article>
    )
}
