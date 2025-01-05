import { read } from "to-vfile"
import { matter } from "vfile-matter"
import fs from "node:fs/promises"
import path from "node:path"

import type { Matter } from "@/types/matter"

// the start index of one slug with YYYY-MM-DD format
const SLUG_START_IDX = 11
export const DIR_NAME_LIST = ["life"]

export async function getFile(category: string, slug: string) {
    const dirPath = path.join(path.resolve(), "writing", category)
    const fileNameList = await fs.readdir(dirPath)
    const fileName = fileNameList.find((fileName) => fileName.includes(slug))

    if (!fileName) {
        return false
    }

    const filePath = path.join(dirPath, fileName)
    const vfile = await read(filePath)

    matter(vfile)

    return vfile
}

export async function getMatterListByCategory(category: string) {
    const dirPath = path.join(path.resolve(), "writing", category)
    const filePathList = await fs
        .readdir(dirPath)
        .then((fileNameList) =>
            fileNameList.map((fileName) => path.join(dirPath, fileName)),
        )
    const matterList = await Promise.all(
        filePathList.map(async (filePath) => {
            const slug = path.basename(filePath, ".mdx").slice(SLUG_START_IDX)
            const vfile = await read(filePath)

            matter(vfile)

            return {
                ...(vfile.data.matter as Matter),
                slug,
            }
        }),
    )

    return matterList
}

export async function getMatterList() {
    const dirPathList = DIR_NAME_LIST.map((dirName) =>
        path.join(path.resolve(), "writing", dirName),
    )
    const filePathList = await Promise.all(
        dirPathList.map(async (dirPath) => {
            const dirFileNameList = await fs.readdir(dirPath)
            const dirFilePathList = dirFileNameList.map((dirFileName) =>
                path.join(dirPath, dirFileName),
            )

            return dirFilePathList
        }),
        // flatMap won't work (probably has something to do with promise, which is the return value of the map method), so using flat instead, after the whole operation is done
    ).then((bumpyList) => bumpyList.flat())
    const matterList = await Promise.all(
        filePathList.map(async (filePath) => {
            const slug = path.basename(filePath, ".mdx").slice(SLUG_START_IDX)
            const vfile = await read(filePath)

            matter(vfile)

            return {
                ...(vfile.data.matter as Matter),
                slug,
            }
        }),
    )

    return matterList
}
