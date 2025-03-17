import { Marked } from "marked";
import { createHighlighter } from "shiki";
import markedShiki from "marked-shiki";

const theme = 'dracula-soft';
const highlighterPromise = createHighlighter({
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
  themes: [theme],
});

let Parser: Marked;
export const getParser = async () => {
  if (Parser) {
    return Parser;
  }
  const highlighter = await highlighterPromise;

  Parser = new Marked().use(
    markedShiki({
      highlight(code, lang, props) {
        return highlighter.codeToHtml(code, {
          lang,
          theme,
          meta: { __raw: props.join(" ") },
        });
      },
    }),
  );

  return Parser;
};
