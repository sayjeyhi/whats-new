
import { type LoaderFunctionArgs, useLoaderData} from "react-router";
import { getTechnology } from "~/utils/technologies.server";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log('--------', params);

  const post = await getTechnology(params.slug as string);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return { post };
}

export default function Technology() {
  const { post } = useLoaderData<typeof loader>();

  console.log('--------');
  return (
    <article>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-8">
        Last updated: {post.formatedDate}
      </div>
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
