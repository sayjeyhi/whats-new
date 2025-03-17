import { useLoaderData } from "react-router";
import { getTechnologyList } from "~/utils/technologies.server";
// import Recommendations from "~/components/Recommendations";
// import RandomTechnologyUpdates from "~/components/RandomTechnologyUpdates";
import RecentlyUpdatedTechnologies from "~/components/RecentlyUpdatedTechnologies";

export async function loader() {
  const posts = await getTechnologyList();
  return { posts };
}

export const meta = () => {
  return {
    title: "Home",
    description: "Home page of the site",
  }
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
