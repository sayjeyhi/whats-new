import { readdir, readFile } from "fs/promises";
import path from "path";
import frontMatter from "front-matter";
import { Marked } from "marked";
import markedShiki from "marked-shiki";
import { createHighlighter } from "shiki";
import type {Technology} from "~/utils/types";


const technologiesPath = path.join(process.cwd(), "./data");

let Parser: Marked;
const getParser = async () => {
  if (Parser) {
    return Parser;
  }

  const highlighter = await createHighlighter({
    langs: [
      "js",
      "ts",
      "tsx",
      "css",
      "go",
      "php",
      "java",
      "python",
      "ruby",
      "rust"
    ],
    themes: ["dracula-soft"],
  });

  Parser = new Marked().use(
    markedShiki({
      highlight(code, lang, props) {
        return highlighter.codeToHtml(code, {
          lang,
          theme: "dracula-soft",
          meta: { __raw: props.join(" ") },
        });
      },
    }),
  );

  return Parser;
};

export async function getTechnologyList(): Promise<Technology[]> {
  console.log("==getTechnologyList");

  const files = await readdir(technologiesPath);

  const technologies = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .filter((file) => file !== "README.md")
      .map(async (file) => {
        const content = await readFile(
          path.join(technologiesPath, file),
          "utf-8",
        );
        const { attributes, body } = frontMatter<Technology>(content);
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
          },
        );
        return {
          slug: file.replace(".md", ""),
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
      }),
  );

  return technologies.sort(
    (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime(),
  );
}

export async function latestThreeUpdatedTechnologies(): Promise<Technology[]> {
  const technologies = await getTechnologyList();
  return technologies.sort((post) => parseInt(post.updated, 10)).slice(0, 5);
}

export async function getTechnology(slug: string): Promise<Technology | null> {
  console.log("==getTechnology");

  try {
    const content = await readFile(
      path.join(technologiesPath, `${slug}.md`),
      "utf-8",
    );
    const { attributes, body } = frontMatter<Technology>(content);

    // remove h1 from content
    const htmlBody = body.replace(/<h1>(.*?)<\/h1>/g, "");
    const Parser = await getParser();
    const html = await Parser.parse(htmlBody);

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
    };
  } catch {
    return null;
  }
}

export async function getTechnologyVersion(slug: string): Promise<Technology | null> {
  console.log("==getTechnologyVersion");

  try {
    const content = await readFile(
      path.join(technologiesPath, `${slug}.md`),
      "utf-8",
    );
    const { attributes, body } = frontMatter<Technology>(content);

    // remove h1 from content
    const htmlBody = body.replace(/<h1>(.*?)<\/h1>/g, "");
    const Parser = await getParser();
    const html = await Parser.parse(htmlBody);

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
    };
  } catch {
    return null;
  }
}
