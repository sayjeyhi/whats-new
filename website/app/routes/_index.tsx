import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTechnologyList } from "~/utils/technologies.server";
// import Recommendations from "~/components/Recommendations";
// import RandomTechnologyUpdates from "~/components/RandomTechnologyUpdates";
import RecentlyUpdatedTechnologies from "~/components/RecentlyUpdatedTechnologies";

export async function loader() {
  const posts = await getTechnologyList();
  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="flex gap-20 flex-col">
      <RecentlyUpdatedTechnologies technologies={posts} />
      {/*<RandomTechnologyUpdates />*/}
      {/*<Recommendations />*/}
    </div>
  );
}
