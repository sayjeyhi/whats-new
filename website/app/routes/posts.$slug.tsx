import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTechnology } from "~/utils/technologies.server";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await getTechnology(params.slug as string);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ post });
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>();

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
