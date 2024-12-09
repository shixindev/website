import Navbar from "./components/navbar"
import { Hash } from "lucide-react"
import { Link } from "react-aria-components"
import Header from "./components/header"

export default function App() {
  return (
    <>
      <Navbar />
      <Header />
      <main>
        <section className="mb-24 flex flex-col gap-12 px-4">
          <article className="prose prose-stone mx-auto dark:prose-invert">
            <h2
              id="initiative"
              className="group/heading flex items-center gap-2"
            >
              Initiative
              <Link className="group/link" href="#initiative">
                <Hash className="opacity-0 group-hover/heading:opacity-100 group-focus/link:opacity-100" />
              </Link>
            </h2>
            <p>
              Initially, when I got into university, I had free time to choose
              what to do, so that I chose to dabble with porgramming for fun.
            </p>
            <p>
              I picked up several books to learn the basics of HTML, CSS, and
              JavaScript, some of them were{" "}
              <Link
                href="https://www.amazon.sg/dp/0596159900?ref_=mr_referred_us_sg_sg"
                target="_blank"
              >
                Head First HTML and CSS
              </Link>
              , and{" "}
              <Link
                href="https://www.amazon.sg/dp/144934013X?ref_=mr_referred_us_sg_sg"
                target="_blank"
              >
                Head First JavaScript Programming
              </Link>
              .
            </p>
            <p>
              After reading through these books above mentioned and unmetioned,
              I went to online course instead, some of them were{" "}
              <Link
                href="https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3"
                target="_blank"
              >
                Build Responsive Real-World Websites With HTML and CSS
              </Link>
              , and{" "}
              <Link
                href="https://www.udemy.com/course/the-complete-javascript-course"
                target="_blank"
              >
                The Complete JavaScript Course 2024: From Zero to Expert!
              </Link>
            </p>
            <p>
              I also dabbled with Python, Django, FastAPI, and some other
              technology, after playing with them, I found myself wanting to
              learn the most was networking and the front-end stuff. Probably,
              in the near future, I am going to build my own proxy server and
              use it, instead of buying other&apos;s service.
            </p>
          </article>
          <article className="prose prose-stone mx-auto dark:prose-invert">
            <h2
              id="continuation"
              className="group/heading flex items-center gap-2"
            >
              Continuation
              <Link className="group/link" href="#continuation">
                <Hash className="opacity-0 group-hover/heading:opacity-100 group-focus/link:opacity-100" />
              </Link>
            </h2>
            <p>
              Initially, I started this journey of programming mainly for fun
              and for familiarizing myself with English. Nowadays, I want to
              spend more time on leveling up my skill about programming,
              it&apos;s still an enjoyment, but I also want to make it
              beautiful, I super enjoy the tranquility it&apos;s bringing to me,
              no daily hustle and bustle talking with others who won&apos;t
              never try to understand the common point on which the conversion
              started and just want to preach over their ideology. Talking with
              others with the common understanding and to myself is making life
              so much easier.
            </p>
            <p>
              As I mentioned above, the direction of my journey will mainly
              focus on making the code beautiful, in order to do that, I am
              reading the source code of some open-source projects, some of them
              are{" "}
              <Link href="https://supabase.com/" target="_blank">
                Supabase
              </Link>
              , and{" "}
              <Link
                href="https://github.com/tailwindlabs/tailwindcss.com"
                target="_blank"
              >
                tailwindcss
              </Link>
              . I also plan on reading the source code of{" "}
              <Link href="https://github.com/facebook/react" target="_blank">
                React
              </Link>
              , and{" "}
              <Link href="https://github.com/nodejs/node" target="_blank">
                Node
              </Link>
              , but they require C++ and some other languages, so they will be
              taken care of later on.
            </p>
            <p>
              I find myself slightly more distracted by the environment, after
              graduated from the university, although there is no more annoying
              roomate getting up around at 7pm and going to bed around at 6am,
              but the environment in which I am still learning programming is
              starting to complain why don&apos;t I hurry up and find a job as
              quick as possible, I won&apos;t say they are wrong, but
              there&apos;s just something drastically different from me and
              them. Anyways, I will still enjoy programming.
            </p>
          </article>
        </section>
      </main>
    </>
  )
}
