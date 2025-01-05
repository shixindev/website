import { toSentenceCase } from "@/utils/text"

import { notFound } from "next/navigation"
import { ExternalLink } from "lucide-react"
import dayjs from "dayjs"
import rehypeSlug from "rehype-slug"
import remarkToc from "remark-toc"
import remarkFrontmatter from "remark-frontmatter"
import * as runtime from "react/jsx-runtime"
import { evaluate } from "@mdx-js/mdx"

import Link from "@/components/link"
import { WritingPreview } from "@/components/writing"

import { DIR_NAME_LIST, getFile, getMatterListByCategory } from "@/utils/fs"

const DESCRIPTION: { [key: string]: string } = {
    life: "Share life experience.",
}

import type { Metadata } from "next"
import type { Matter } from "@/types/matter"

interface Props {
    params: Promise<{ catchAll: string | string[] }>
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { catchAll } = await params
    const [category, slug, redirection] = catchAll

    if (redirection) {
        return {
            title: "Not found",
        }
    }

    if (!slug) {
        if (category && DIR_NAME_LIST.includes(category)) {
            return {
                title: toSentenceCase(category),
                description: DESCRIPTION[category],
                openGraph: {
                    title: category,
                    description: DESCRIPTION[category],
                    type: "website",
                    url: `https://xieshixin.vercel.app/${category}`,
                },
            }
        } else {
            return {
                title: "Not found",
            }
        }
    }

    if (slug) {
        if (DIR_NAME_LIST.includes(category)) {
            const file = await getFile(category, slug)

            if (!file) {
                return {
                    title: "Not found",
                }
            }

            const title = toSentenceCase(slug).replaceAll("-", " ")
            const { description } = file.data.matter as Matter

            // for removing dash in slug and capitalizing the first character
            return {
                title,
                description,
                openGraph: {
                    title,
                    description,
                    type: "website",
                    url: `https://xieshixin.vercel.app/${category}/${slug}`,
                },
            }
        }
    }

    // return statement below probably won't never be executed, but for satisfying TypeScript
    return {}
}

export default async function Page({ params }: Props) {
    const { catchAll } = await params
    // current implementation isn't including third or more segment, if redirection is present, then rendering NotFound component to redirect the user back to the home page
    const [category, slug, redirection] = catchAll

    if (redirection) {
        return notFound()
    }

    if (!slug) {
        if (category && DIR_NAME_LIST.includes(category)) {
            const matterList = await getMatterListByCategory(category)

            return (
                <div className="space-y-4">
                    {matterList.map((matter) => (
                        <WritingPreview key={matter.slug} matter={matter} />
                    ))}
                </div>
            )
        } else {
            return notFound()
        }
    }

    if (slug) {
        if (DIR_NAME_LIST.includes(category)) {
            const file = await getFile(category, slug)

            // potentially, the file won't be found, then rendering NotFound component
            if (!file) {
                return notFound()
            }

            const { title, publicationDate, modificationDate } = file.data
                .matter as Matter
            const { default: MDXContent } = await evaluate(file, {
                ...runtime,
                remarkPlugins: [
                    remarkFrontmatter,
                    [remarkToc, { heading: "Table of Content" }],
                ],
                rehypePlugins: [rehypeSlug],
            })

            return (
                <MDXContent
                    components={{
                        wrapper(props) {
                            const { children } = props

                            return (
                                <article className="prose prose-stone mx-auto px-4 py-2 dark:prose-invert">
                                    <h1>{title}</h1>
                                    <p>
                                        Publication on{" "}
                                        {dayjs(publicationDate).format(
                                            "MMM D YYYY",
                                        )}
                                        .
                                        {modificationDate &&
                                            ` Modification on ${dayjs(
                                                modificationDate,
                                            ).format("MMM D YYYY")}`}
                                    </p>
                                    {children}
                                </article>
                            )
                        },
                        a(props) {
                            const { children, href } = props
                            const isOutward = href.startsWith("https://")

                            return (
                                <Link
                                    direction={isOutward ? "outward" : "inward"}
                                    href={href}
                                >
                                    {children}
                                    {isOutward && (
                                        <span>
                                            <ExternalLink size={12} />
                                        </span>
                                    )}
                                </Link>
                            )
                        },
                    }}
                />
            )
        } else {
            return notFound()
        }
    }
}
