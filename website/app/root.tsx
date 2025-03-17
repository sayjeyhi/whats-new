import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./css/style.css?url";
import Theme from "./theme-provider";
import Header from "~/components/ui/header";
import Footer from "~/components/ui/footer";
import { latestThreeUpdatedTechnologies } from "~/utils/technologies.server";
import { json } from "@remix-run/node";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export async function loader() {
  const posts = await latestThreeUpdatedTechnologies();
  return json({ posts });
}

export default function App() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-inter antialiased bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100 tracking-tight">
        <Theme>
          <div className="overflow-hidden supports-[overflow:clip]:overflow-clip">
            <div className="max-w-[728px] mx-auto">
              <div className="w-full bg-white dark:bg-gray-900 border-x border-gray-100 dark:border-gray-800 box-content">
                <div className="px-3 md:px-16">
                  <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="grow py-12 space-y-12">
                      <Outlet />
                    </main>
                    <ScrollRestoration />
                    <Scripts />
                    <Footer latestUpdatedTechnologies={posts} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Theme>
      </body>
    </html>
  );
}
