import Link from "@/components/link"

export default function NotFound() {
    return (
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="text-2xl font-semibold">Not Found</h1>
            <p>This page isn&apos;t present.</p>
            <Link direction="inward" href="/">
                Go To Home
            </Link>
        </div>
    )
}
