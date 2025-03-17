import { type LoaderFunctionArgs, useLoaderData} from "react-router";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log('-----sssss---', params);
  return { params };
}

export default function TechnologySlugVersion() {
  const { params } = useLoaderData<typeof loader>();
  return (
    <article>
      Version!
    </article>
  );
}
