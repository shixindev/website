import { WritingPreview } from "@/components/writing"

import { getMatterList } from "@/utils/fs"

export default async function Home() {
    const matterList = await getMatterList()

    return (
        <div>
            {matterList.map((matter) => (
                <WritingPreview key={matter.slug} matter={matter} />
            ))}
        </div>
    )
}
