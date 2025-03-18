import type {
  TechnologyList,
  TechnologyDetails,
  TechnologyShortData,
} from "~/utils/types";
import { getMarkdown, getMarkdowns } from "~/utils/markdown";
import { getParser } from "~/utils/highlighter";

export async function getTechnologyList(): Promise<TechnologyList> {
  const files = await getMarkdowns();

  const items = await Promise.all(
    files.map(async ({ slug, data }) => {
      const { attributes, body } = data;
      const Parser = await getParser();
      const html = await Parser.parse(body);
      const excerpt = body.split("\n")[0];

      const latestVersion = body.match(/<h2>(.*?)<\/h2>/)![1];
      const formatedDate = new Date(attributes.updated).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      return {
        slug,
        title: attributes.title,
        updated: attributes.updated,
        formatedDate: formatedDate,
        latestVersion: latestVersion,
        tags: attributes.tags,
        description: attributes.description,
        image: attributes.image,
        content: html,
        excerpt,
      };
    })
  );

  return items.sort(
    (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
  );
}

export async function latestFiveUpdatedTechnologies(): Promise<
  TechnologyShortData[]
> {
  const files = await getMarkdowns();

  const items = await Promise.all(
    files.map(async ({ slug, data }) => {
      const { attributes, body } = data;
      return {
        slug,
        title: attributes.title,
        image: attributes.image,
        updated: attributes.updated,
      };
    })
  );

  return items.sort((post) => parseInt(post.updated, 10)).slice(0, 5);
}

export async function getTechnology(
  slug: string
): Promise<TechnologyDetails | null> {
  try {
    const { attributes, body } = await getMarkdown(slug);
    // remove h1 from content
    const htmlBody = body
      .replace(/<h1>(.*?)<\/h1>/g, "");
    const Parser = await getParser();
    const html = await Parser.parse(htmlBody);


    /**
     * Get all the versions tags between <h2> tags
     */
    const versionsList = body.match(/<h2>(.*?)<\/h2>/g) || [];

    return {
      slug,
      title: attributes.title,
      content: html,
      excerpt: body.split("\n")[0],
      updated: attributes.updated,
      tags: attributes.tags,
      description: attributes.description,
      image: attributes.image,
      latestVersion: "",
      versionsList: versionsList.map((version) =>
        version.replace(/<h2>(.*?)<\/h2>/g, "$1")
      ),
      formatedDate: new Date(attributes.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        minute: "numeric",
        hour: "numeric",
      }),
    };
  } catch {
    return null;
  }
}

export async function getTechnologyVersion(
  slug: string,
  version: string
): Promise<TechnologyDetails | null> {
  try {
    const { attributes, body } = await getMarkdown(slug);

    const versionRegex = new RegExp(
      `<details open><summary><h2>[^<]*?17[^<]*?</h2></summary>([\\s\\S]*?)</details>`,
      "g"
    );
    const matches = [...body.matchAll(versionRegex)];

    const versionContent = matches[0]?.[1];
    if (!versionContent) {
      return null;
    }

    const Parser = await getParser();
    const html = await Parser.parse(versionContent);

    return {
      slug,
      title: attributes.title,
      content: html,
      excerpt: body.split("\n")[0],
      updated: attributes.updated,
      tags: attributes.tags,
      description: attributes.description,
      image: attributes.image,
      latestVersion: "",
      formatedDate: new Date(attributes.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        minute: "numeric",
        hour: "numeric",
      }),
      versionsList: [],
    };
  } catch {
    return null;
  }
}
