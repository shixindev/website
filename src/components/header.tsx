import { Link } from "react-aria-components"
import { RoughNotation } from "react-rough-notation"
import { Hash } from "lucide-react"

export default function Header() {
  return (
    <header className="mb-24">
      <div className="mx-auto grid max-w-screen-lg grid-cols-1 justify-items-center gap-4 px-4 md:grid-cols-2">
        <article className="prose prose-stone dark:prose-invert">
          <h1 id="home" className="group/heading flex items-center gap-2">
            Hi, I'm Xie, a web developer.
            <Link className="group/link" href="#home">
              <Hash className="cursor-pointer opacity-0 group-hover/heading:opacity-100 group-focus/link:opacity-100" />
            </Link>
          </h1>
          <p>
            I&apos;m self-taught,{" "}
            <RoughNotation type="underline" show={true}>
              interested{" "}
            </RoughNotation>
            in how to make code more efficient by weighing time complexity and
            space complexity, and how everything is working together underneath
            the hood by{" "}
            <RoughNotation type="underline" show={true}>
              discovering{" "}
            </RoughNotation>
            <Link
              href="https://en.wikipedia.org/wiki/OSI_model"
              target="_blank"
            >
              OSI
            </Link>{" "}
            and the relationship among cluster, process, and thread. By the way,
            I like anime and workout too.
          </p>
          <p>
            The picture is showing my gear to help me to stay productive and
            focusable.
          </p>
          <p>
            You can find me on these platforms down below or read on to know
            slightly more of my background.
          </p>
          <div className="flex items-center gap-4">
            <Link
              className="link-button"
              href="https://github.com/shixindev"
              target="_blank"
            >
              Github
            </Link>
            <Link
              className="link-button"
              href="https://x.com/xieshixinnerd"
              target="_blank"
            >
              Twitter
            </Link>
            <Link
              className="link-button"
              href="https://www.linkedin.com/in/xie-shixin-a159842a6/"
              target="_blank"
            >
              LinkedIn
            </Link>
          </div>
        </article>
        <img
          className="rounded shadow-xl dark:shadow-none"
          src="./desktop-setup.jpg"
          alt="Desktop setup"
        />
      </div>
    </header>
  )
}
