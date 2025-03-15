export default function RandomTechnologyUpdates() {
  const items = [
    {
      title: "KumoX Images Now available On Docker Hub",
      link: "#0",
      source: "medium.com",
      description:
        "Today, KumoX announced that it has become a DVP, marking a significant milestone for our shared mission to enhance the security.",
    },
    {
      title: "Nobody Wants To Work with Josh",
      link: "#0",
      source: "medium.com",
      description:
        "There was a wizard engineer (we'll call him “Josh”) who worked for me a few years ago. His code was good. His PRs were quick.",
    },
    {
      title: "A Sharp And Solid Outline Of 3D Grid Magic",
      link: "#0",
      source: "indiehackers.com",
      description:
        "Since the world is 3D, it's no surprise that video games, mobile robotics challenges, and architectural design tools often require 3D variants.",
    },
  ];

  return (
    <section>
      <h2 className="font-inter-tight text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Random Technology Updates
      </h2>
      <div className="space-y-1">
        {items.map((item, index) => (
          <article
            key={index}
            className="relative p-5 rounded-xl odd:bg-linear-to-tr odd:from-gray-100 odd:to-gray-50 dark:odd:bg-linear-to-tr dark:odd:from-gray-800 dark:odd:to-gray-800/[0.65] group"
          >
            <div
              className="absolute top-5 right-7 text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 group-hover:rotate-45 transition"
              aria-hidden="true"
            >
              <svg
                className="fill-current opacity-80 dark:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
              >
                <path d="M1.018 10 0 8.983l7.572-7.575H1.723L1.736 0H10v8.266H8.577l.013-5.841L1.018 10Z" />
              </svg>
            </div>
            <div className="space-y-1.5 mb-2">
              <div className="text-[13px] font-medium text-gray-600 dark:text-gray-400">
                {item.source}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                <a className="before:absolute before:inset-0" href={item.link}>
                  {item.title}
                </a>
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
