import {Technology} from "~/utils/technologies.server";

export default function RecentlyUpdatedTechnologies({ technologies }: { technologies: Technology[] }) {

  return (
    <section>
      <h2 className="font-inter-tight text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Recently Updated Technologies
      </h2>
      <div className="space-y-1">
        {technologies.map((item, index) => (
          <a
            key={item.slug}
            className="block hover:no-underline decoration-2 p-5 rounded-xl odd:bg-linear-to-tr odd:from-gray-100 odd:to-gray-50 dark:odd:bg-linear-to-tr dark:odd:from-gray-800 dark:odd:to-gray-800/[0.65] border-2 border-transparent hover:border-green-200"
            href={`/posts/${item.slug}`}
          >
            <article>

            <div className="sm:flex gap-5">
              <img
                className="w-10 h-10 rounded-xs"
                src={item.image}
                alt={item.title}
              />
              <div className="w-full">
                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                        {item.title}
                    </h3>
                    <span className="text-[13px] italic text-gray-500/70">
                      {item.formatedDate}
                    </span>
                  </div>


                  <div className="text-[13px] font-medium text-gray-600dark:text-gray-400">
                    {item.latestVersion}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>

          </article>

          </a>
        ))}
      </div>
    </section>
  );
}
