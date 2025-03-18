import {
  Link,
  type LoaderFunctionArgs,
  type MetaFunction,
  useLoaderData
} from "react-router";
import { getTechnology } from "~/utils/technologies.server";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import { getTechnologyVersionCanonical } from "~/utils/canonical";
import Giscus from "@giscus/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const technology = await getTechnology(params.slug as string);
  if (!technology) {
    throw new Response("Not Found", { status: 404 });
  }
  return { technology };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const technology = data!.technology;
  return [
    { title: `What is new in ${technology.title}?` },
    { name: "description", content: technology.description },
  ];
};

const Versions = (props: { slug: string; image: string; versionsList: string[] }) => {
  const { slug, versionsList, image } = props;
  return (
    <div className="flex items-center justify-start gap-8 my-8 whitespace-nowrap">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        All versions:
      </h3>
      <div className="flex gap-4 items-center justify-start flex-wrap ">
        {versionsList.map((version) => (
          <Link
            key={version}
            to={getTechnologyVersionCanonical(slug, version)}
            className="btn-sm rounded-3xl font-semibold text-sm px-5 py-2 text-gray-200 dark:text-gray-800 bg-linear-to-r from-gray-800 to-gray-700 dark:from-gray-300 dark:to-gray-100 dark:hover:bg-gray-100 shadow-xs relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:opacity-20 dark:before:opacity-100 dark:before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_
            0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-1500"
          >
            <img
              className="w-5 h-5 rounded-full absolute left-[-0.3rem] top-[-0.3rem]"
              src={image}
              alt={version}
            />
            {version}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Technology() {
  const { technology } = useLoaderData<typeof loader>();

  return (
    <article>
      <h1 className="text-4xl font-bold mb-4">{technology.title}</h1>
      <div className="text-gray-600 mb-7">
        Last updated: {technology.formatedDate}
      </div>

      <Breadcrumb
        items={[
          { title: technology.title, url: `/technology/${technology.slug}` },
        ]}
      />

      <Versions slug={technology.slug} versionsList={technology.versionsList} image={technology.image} />

      <div className="block bg-gray-300 dark:bg-gray-700 h-1 w-full my-4 mb-8" />
      <div
        className="prose dark:prose-invert max-w-[75ch]"
        dangerouslySetInnerHTML={{ __html: technology.content }}
      />


      <Versions slug={technology.slug} versionsList={technology.versionsList} image={technology.image} />

      <Giscus
        id="comments"
        repo="sayjeyhi/whats-new"
        repoId="R_kgDOOIg_ew"
        category="General"
        categoryId="DIC_kwDOOIg_e84CoMX4"
        mapping="pathname"
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="bottom"
        theme="dark_dimmed"
        lang="en"
        loading="lazy"
        term="Welcome to @giscus/react component!"
      />

    </article>
  );
}
