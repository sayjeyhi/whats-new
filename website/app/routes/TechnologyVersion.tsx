import {
  type LoaderFunctionArgs,
  type MetaFunction,
  useLoaderData,
} from "react-router";
import { getTechnologyVersion } from "~/utils/technologies.server";
import { ArrowLeftIcon } from "~/components/ArrowLeft";
import { Breadcrumb } from "~/components/ui/breadcrumb";

export async function loader({ params }: LoaderFunctionArgs) {
  const technologyVersion = await getTechnologyVersion(
    params.slug as string,
    params.version as string
  );
  if (!technologyVersion) {
    throw new Response("Not Found", { status: 404 });
  }
  return { version: technologyVersion };
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  const technology = data!.version;
  return [
    { title: `What is new in ${technology.title} version ${params.version}?` },
    { name: "description", content: technology.description },
  ];
};

export default function TechnologySlugVersion({ params }: LoaderFunctionArgs) {
  const { version } = useLoaderData<typeof loader>();
  return (
    <article>
      <Breadcrumb
        items={[
          { title: version.title, url: `/technology/${version.slug}` },
          {
            title: params.version as string,
            url: `/technology/${version.slug}/${params.version}`,
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-4">
        What's new in {version.title} {params.version}?
      </h1>
      <div
        className="prose dark:prose-invert max-w-[75ch]"
        dangerouslySetInnerHTML={{ __html: version.content }}
      />
    </article>
  );
}
