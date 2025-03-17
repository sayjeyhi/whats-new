import Theme from "./theme-provider";
import Header from "~/components/ui/header";
import Footer from "~/components/ui/footer";
import { latestFiveUpdatedTechnologies } from "~/utils/technologies.server";
import { Outlet, useLoaderData } from "react-router";

export async function loader() {
  const posts = await latestFiveUpdatedTechnologies();
  return { posts };
}

export default function MainLayout() {
  const { posts } = useLoaderData();

  return (
    <Theme>
      <div className="overflow-hidden supports-[overflow:clip]:overflow-clip">
        <div className="max-w-[728px] mx-auto">
          <div className="w-full bg-white dark:bg-gray-900 border-x border-gray-100 dark:border-gray-800 box-content">
            <div className="px-3 md:px-5">
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="grow py-12 space-y-12">
                  <Outlet />
                </main>
                <Footer latestUpdatedTechnologies={posts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Theme>
  );
}
