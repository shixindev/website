interface GenericHeaderProps {
    headerContent: {
        title: string
        description: string
    }
}

export default function GenericHeader(props: GenericHeaderProps) {
    const { headerContent } = props
    const { title, description } = headerContent

    return (
        <>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p>{description}</p>
        </>
    )
}
