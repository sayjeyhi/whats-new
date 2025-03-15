import ThemeToggle from "./theme-toggle";
import {useLocation} from "react-router";

export default function Header() {
  const isHome = useLocation().pathname === "/";

  return (
    <header className="text-center pt-6 relative">
      {/* Dark mode toggle */}
      <ThemeToggle />
      {/* Intro */}
      {isHome ? (
      <a href="/" className="mb-10">
        <img
          className="inline-flex rounded-4xl shadow-2xl mb-4 w-32 h-32"
          src="/images/logo.jpg"
          alt="What's new"
          width={128}
          height={128}
        />
        <div className="mb-5 flex items-center justify-center flex-col gap-4">
          <h1 className="font-inter-tight font-extrabold text-gray-800 dark:text-gray-100 text-4xl mb-1">
            What's new?!
          </h1>
          <p className="text-base text-gray-600 w-4/5 dark:text-gray-400">
            Stay ahead with the latest features and updates for each language and technology – all in one place, no Googling required!
          </p>
        </div>
      </a>
        ): <a href="/" className="absolute group top-5 left-0 flex items-center gap-4">
        <img
          className="inline-flex rounded-xl w-12 h-12 grayscale group-hover:grayscale-0"
          src="/images/logo.jpg"
          alt="What's new"
          width={48}
          height={48}
        />
        <h1 className="font-inter-tight font-extrabold text-gray-800 dark:text-gray-100 text-base">
          What's new?!
        </h1>
      </a>}
    </header>
  );
}
