import { readdir, readFile } from "fs/promises";
import path from "path";
import frontMatter from "front-matter";
import type { TechnologyDetails, TechnologyListItem } from "~/utils/types";

const dataPath = path.join(process.cwd(), "./data");

export const getMarkdowns = async () => {
  const files = await readdir(dataPath);
  return await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .filter((file) => file !== "README.md")
      .map(async (file) => {
        const content = await readFile(
          path.join(dataPath, file),
          "utf-8",
        );
        const slug = file.replace(".md", "");
        const data = frontMatter<TechnologyListItem>(content);

        return { slug, data };
      }),
  );
}

export const getMarkdown = async (slug: string) => {
  const content = await readFile(
    path.join(dataPath, `${slug}.md`),
    "utf-8",
  );
  return frontMatter<TechnologyDetails>(content);
}
