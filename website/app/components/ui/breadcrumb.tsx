import { ArrowLeftIcon } from "~/components/ArrowLeft";

type Props = {
  items: {
    title: string;
    url: string;
  }[];
}

export const Breadcrumb = ({ items }: Props) => {
  return (
    <ul className="flex gap-1 items-center mb-4 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 [&>li>a]:flex [&>li>a]:text-sm [&>li>a]:py-1 [&>li>a]:px-2 [&>li]:rounded-lg [&>li]:hover:bg-gray-100 dark:[&>li]:hover:bg-gray-700">
      <li>
        <a className="items-center gap-2" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
            ></path>
          </svg>
          Home
        </a>
      </li>
      <ArrowLeftIcon />
      {items.map((item, index) => (
        <>
          <li>
            <a href={item.url}>{item.title}</a>
          </li>
          {index !== items.length - 1 && (
            <li>
              <ArrowLeftIcon />
            </li>
          )}
        </>
      ))}
    </ul>
  );
}
