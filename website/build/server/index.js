import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, useLoaderData, Meta, Links, Outlet, ScrollRestoration, Scripts } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { ThemeProvider, useTheme } from "next-themes";
import { useLocation } from "react-router";
import { readdir, readFile } from "fs/promises";
import path from "path";
import frontMatter from "front-matter";
import { Marked } from "marked";
import markedShiki from "marked-shiki";
import { createHighlighter } from "shiki";
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationWordHighlight, transformerNotationFocus, transformerNotationErrorLevel, transformerMetaHighlight, transformerMetaWordHighlight } from "@shikijs/transformers";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const styles = "/assets/style-GJvahsma.css";
function Theme({ children }) {
  return /* @__PURE__ */ jsx(ThemeProvider, { attribute: "class", children });
}
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-2", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center justify-center ml-auto", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        name: "light-switch",
        id: "light-switch",
        className: "light-switch sr-only",
        checked: theme === "light",
        onChange: () => {
          if (theme === "dark") {
            return setTheme("light");
          }
          return setTheme("dark");
        }
      }
    ),
    /* @__PURE__ */ jsxs("label", { className: "relative cursor-pointer p-2", htmlFor: "light-switch", children: [
      /* @__PURE__ */ jsxs(
        "svg",
        {
          className: "dark:hidden",
          width: 16,
          height: 16,
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "fill-gray-300",
                d: "M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "fill-gray-400",
                d: "M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "svg",
        {
          className: "hidden dark:block",
          width: "16",
          height: "16",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "fill-gray-500",
                d: "M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "fill-gray-400",
                d: "M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Switch to light / dark version" })
    ] })
  ] }) });
}
function Header() {
  const isHome = useLocation().pathname === "/";
  return /* @__PURE__ */ jsxs("header", { className: "text-center pt-6 relative", children: [
    /* @__PURE__ */ jsx(ThemeToggle, {}),
    isHome ? /* @__PURE__ */ jsxs("a", { href: "/", className: "mb-10", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "inline-flex rounded-4xl shadow-2xl mb-4 w-32 h-32",
          src: "/images/logo.jpg",
          alt: "What's new",
          width: 128,
          height: 128
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center justify-center flex-col gap-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-inter-tight font-extrabold text-gray-800 dark:text-gray-100 text-4xl mb-1", children: "What's new?!" }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-gray-600 w-4/5 dark:text-gray-400", children: "Stay ahead with the latest features and updates for each language and technology – all in one place, no Googling required!" })
      ] })
    ] }) : /* @__PURE__ */ jsxs("a", { href: "/", className: "absolute group top-5 left-0 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "inline-flex rounded-xl w-12 h-12 grayscale group-hover:grayscale-0",
          src: "/images/logo.jpg",
          alt: "What's new",
          width: 48,
          height: 48
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "font-inter-tight font-extrabold text-gray-800 dark:text-gray-100 text-base", children: "What's new?!" })
    ] })
  ] });
}
function Newsletter() {
  return /* @__PURE__ */ jsxs("section", { className: "text-left mt-2 border-t-2 border-gray-100 dark:border-gray-800 pt-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-inter-tight text-base font-semibold text-gray-700 dark:text-gray-100", children: "Subscribe to changes!" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 dark:text-gray-400 mb-2", children: "We won't spam you with updates, we promise!" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-5 rounded-xl bg-linear-to-tr from-gray-100 to-gray-50 dark:bg-linear-to-tr dark:from-gray-800 dark:to-gray-800/[0.65]", children: /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs("div", { className: "flex bg-white dark:bg-gray-900 p-2 rounded-lg focus-within:ring-2 ring-gray-300 dark:ring-gray-600", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "flex-1 text-sm bg-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 border-none focus:ring-0 focus:outline-hidden",
          type: "email",
          name: "email",
          "aria-label": "Enter your email to subscribe my newsletter",
          placeholder: "Enter your email...",
          autoComplete: "off"
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "btn-sm rounded-3xl font-semibold text-sm px-3 text-gray-200 dark:text-gray-800 bg-linear-to-r from-gray-800 to-gray-700 dark:from-gray-300 dark:to-gray-100 dark:hover:bg-gray-100 shadow-xs relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:opacity-20 dark:before:opacity-100 dark:before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-1500", children: "Join Newsletter" })
    ] }) }) })
  ] });
}
function Footer({ latestUpdatedTechnologies }) {
  return /* @__PURE__ */ jsxs("footer", { className: "space-y-12 text-center pb-16", children: [
    /* @__PURE__ */ jsx("div", { className: "group flex justify-center gap-4", children: latestUpdatedTechnologies.map((tech) => /* @__PURE__ */ jsx(
      "img",
      {
        className: "rounded-xl even:rotate-2 odd:-rotate-2 even:group-hover:rotate-0 odd:group-hover:rotate-0 transition duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] shadow-lg",
        src: tech.image,
        width: 100,
        height: 100,
        alt: tech.title
      }
    )) }),
    /* @__PURE__ */ jsx(Newsletter, {}),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "svg",
      {
        className: "inline-flex fill-gray-800 dark:fill-gray-100",
        xmlns: "http://www.w3.org/2000/svg",
        width: "299",
        height: "59",
        viewBox: "0 0 299 59",
        children: /* @__PURE__ */ jsx("path", { d: "M2.26351 26.76L9.49551 26.888C11.3728 26.888 13.2075 26.824 14.9995 26.696C15.2982 26.568 15.5968 26.504 15.8955 26.504C17.0902 26.504 18.0288 27.1653 18.7115 28.488C19.0528 28.9147 19.2235 29.3413 19.2235 29.768C19.2235 30.792 18.7755 31.4107 17.8795 31.624C8.87684 31.4533 3.58617 31.3467 2.00751 31.304C1.66617 31.432 1.34617 31.496 1.04751 31.496C0.791506 31.496 0.62084 31.4533 0.535507 31.368C0.450174 31.24 0.407507 30.9627 0.407507 30.536L1.04751 26.888C1.13284 26.8027 1.53817 26.76 2.26351 26.76ZM22.07 22.152C21.942 22.536 21.75 22.728 21.494 22.728C21.238 22.728 21.11 22.408 21.11 21.768C21.11 21.128 21.6647 19.9973 22.774 18.376C23.8833 16.712 25.4833 14.9413 27.574 13.064C29.7073 11.144 32.0753 9.33066 34.678 7.624C37.2807 5.91733 40.2887 4.50933 43.702 3.4C47.158 2.248 50.5713 1.672 53.942 1.672C54.2833 1.8 54.71 1.97066 55.222 2.184C55.7767 2.35467 56.4807 2.76 57.334 3.4C58.23 3.99733 58.678 4.552 58.678 5.064C58.678 5.576 58.5713 5.96 58.358 6.216C55.0727 9.20267 51.382 12.808 47.286 17.032C43.2327 21.256 40.118 24.776 37.942 27.592L33.334 33.608C33.078 33.992 32.95 34.2907 32.95 34.504V34.568L33.974 34.056C34.0593 34.0133 34.1233 33.9707 34.166 33.928C49.7393 22.9627 60.1713 15.1973 65.462 10.632C65.59 10.4613 65.7607 10.376 65.974 10.376C66.1873 10.376 66.3367 10.44 66.422 10.568C66.5073 10.696 66.9127 11.1013 67.638 11.784C68.3633 12.424 68.726 12.9147 68.726 13.256C68.726 13.5547 68.598 13.8107 68.342 14.024C64.118 18.0347 59.8087 23.0693 55.414 29.128C51.0193 35.1867 48.822 39.8587 48.822 43.144C48.822 43.528 49.014 43.72 49.398 43.72C50.2513 43.72 52.2567 42.568 55.414 40.264C58.5713 37.96 62.1553 35.0373 66.166 31.496C70.2193 27.9547 74.486 23.624 78.966 18.504C83.4887 13.3413 87.1793 8.328 90.038 3.464C90.422 2.65333 90.7207 1.992 90.934 1.48C91.1473 0.925332 91.4673 0.647999 91.894 0.647999C92.3633 0.647999 92.8327 1.288 93.302 2.568C93.814 3.80533 94.07 4.89333 94.07 5.832C94.07 7.32533 92.3633 10.312 88.95 14.792C85.5367 19.272 81.5473 23.9013 76.982 28.68C72.4167 33.4587 67.574 37.7253 62.454 41.48C57.334 45.192 53.302 47.048 50.358 47.048C48.95 47.048 47.542 46.4933 46.134 45.384C44.7687 44.2747 44.086 42.4827 44.086 40.008C44.086 36.936 45.0033 33.7787 46.838 30.536C47.5633 29.256 48.438 28.104 49.462 27.08L50.934 25.352L51.19 24.84V24.776C51.19 24.6907 51.1687 24.648 51.126 24.648C50.998 24.648 50.806 24.776 50.55 25.032C41.0353 33.3947 34.5927 38.9627 31.222 41.736C27.8513 44.4667 25.8673 45.832 25.27 45.832C24.6727 45.832 24.182 45.5333 23.798 44.936C23.6273 44.7227 23.4353 44.5093 23.222 44.296C23.0513 44.04 22.9233 43.8693 22.838 43.784C22.7527 43.656 22.6673 43.5493 22.582 43.464C22.4967 43.336 22.4327 43.2507 22.39 43.208C22.3473 42.9947 22.326 42.6747 22.326 42.248C22.326 41.8213 22.4753 41.2027 22.774 40.392C23.0727 39.5813 23.35 38.8133 23.606 38.088C23.9047 37.32 24.7153 35.7413 26.038 33.352C27.3607 30.92 28.9393 28.488 30.774 26.056C32.6087 23.5813 35.2967 20.5733 38.838 17.032C42.3793 13.4907 46.3473 10.0773 50.742 6.792C51.5527 6.152 51.958 5.74666 51.958 5.576C51.958 5.40533 51.8727 5.32 51.702 5.32C48.502 5.32 43.1687 7.45333 35.702 11.72C28.278 15.9867 23.734 19.464 22.07 22.152ZM90.826 39.368C90.826 39.5813 90.9113 39.688 91.082 39.688C91.2527 39.688 91.594 39.56 92.106 39.304C98.4633 35.8907 105.461 31.3467 113.098 25.672C113.482 25.9707 113.674 26.3333 113.674 26.76C113.674 27.1867 113.461 27.592 113.034 27.976C112.607 28.36 111.989 28.9147 111.178 29.64C110.41 30.3653 108.917 31.6667 106.698 33.544C104.479 35.4213 102.41 37.128 100.49 38.664C95.4553 42.7173 91.7433 45.1067 89.354 45.832C88.586 46.0453 87.754 46.152 86.858 46.152C85.4073 46.152 84.682 45.0213 84.682 42.76C84.682 41.992 85.1513 40.7333 86.09 38.984C87.0287 37.192 87.498 35.8907 87.498 35.08C87.498 34.9947 87.434 34.952 87.306 34.952C87.178 34.952 86.858 35.144 86.346 35.528C80.4153 40.136 76.81 43.336 75.53 45.128C75.274 45.512 74.9327 45.704 74.506 45.704C73.5673 45.704 72.97 45.256 72.714 44.36C72.714 43.08 74.506 39.8373 78.09 34.632C81.7167 29.4267 85.962 23.9653 90.826 18.248C95.69 12.488 99.658 8.43466 102.73 6.088C103.626 5.23466 105.717 4.808 109.002 4.808C109.514 4.936 109.77 5.14933 109.77 5.448C109.77 5.74667 109.621 6.04533 109.322 6.344C97.034 18.2053 89.226 26.4187 85.898 30.984C85.7273 31.1547 85.4927 31.4747 85.194 31.944C84.938 32.3707 84.81 32.648 84.81 32.776L84.874 32.84C85.0447 32.84 86.3887 31.9013 88.906 30.024C91.4233 28.104 93.3007 26.7387 94.538 25.928C94.922 25.544 95.7327 25.352 96.97 25.352C98.0367 25.48 98.57 25.8213 98.57 26.376C98.57 26.5467 98.5273 26.696 98.442 26.824C95.2847 31.304 93.386 34.1627 92.746 35.4C91.466 37.4053 90.826 38.728 90.826 39.368ZM112.22 42.312L112.732 38.216C112.732 38.088 112.689 38.024 112.604 38.024C112.561 38.024 112.454 38.1093 112.284 38.28C111.729 38.8773 111.025 39.624 110.172 40.52C109.318 41.3733 107.846 42.5467 105.756 44.04C103.708 45.4907 102.044 46.216 100.764 46.216C100.55 46.1733 100.294 46.088 99.9955 45.96C99.6542 45.8747 99.2275 45.5333 98.7155 44.936C98.2035 44.3387 97.9475 43.4853 97.9475 42.376C97.9475 41.2667 98.8008 39.5813 100.508 37.32C102.172 35.016 104.177 32.776 106.524 30.6C108.87 28.3813 111.473 26.4613 114.332 24.84C117.233 23.2187 119.75 22.408 121.884 22.408C122.694 22.4507 123.334 23.0267 123.804 24.136C124.23 23.7093 124.614 23.496 124.956 23.496C125.297 23.496 125.702 23.752 126.172 24.264C126.428 24.3067 126.684 24.456 126.94 24.712C127.196 24.9253 127.324 25.2453 127.324 25.672C127.324 26.0987 127.025 26.568 126.428 27.08C125.532 28.1893 124.486 29.448 123.292 30.856C122.097 32.264 121.244 33.288 120.732 33.928C120.22 34.5253 119.686 35.208 119.132 35.976C118.193 37.2987 117.681 38.3653 117.596 39.176C121.948 37.0853 128.796 32.584 138.14 25.672C138.524 25.9707 138.716 26.3333 138.716 26.76C138.716 27.1867 138.545 27.5493 138.204 27.848C137.862 28.1467 137.436 28.5093 136.924 28.936C136.454 29.3627 135.494 30.1947 134.044 31.432C132.593 32.6693 131.185 33.864 129.82 35.016C128.497 36.1253 126.961 37.384 125.212 38.792C123.505 40.1573 121.969 41.3307 120.604 42.312C117.318 44.6587 115.27 45.832 114.46 45.832C113.649 45.832 113.073 45.576 112.732 45.064C112.39 44.552 112.22 43.6347 112.22 42.312ZM105.692 39.624C106.204 39.624 107.761 38.5787 110.364 36.488C113.009 34.3973 115.505 32.3067 117.852 30.216L121.436 27.08C121.606 26.9093 121.692 26.8027 121.692 26.76C121.692 26.6747 121.628 26.632 121.5 26.632C119.878 26.632 117.766 27.5707 115.164 29.448C112.561 31.2827 110.3 33.2453 108.38 35.336C106.502 37.384 105.564 38.7707 105.564 39.496C105.564 39.5813 105.606 39.624 105.692 39.624ZM154.821 15.432L158.085 15.368C162.309 15.368 165.381 15.9653 167.301 17.16C168.24 17.4587 168.709 17.8427 168.709 18.312C168.709 18.6533 168.282 18.888 167.429 19.016C166.618 19.144 163.738 19.4853 158.789 20.04C153.882 20.552 150.512 20.8507 148.677 20.936C147.866 20.9787 145.989 22.3867 143.045 25.16C140.144 27.9333 137.37 30.984 134.725 34.312C132.08 37.64 130.757 39.9653 130.757 41.288C130.757 41.5013 130.864 41.6933 131.077 41.864C131.29 41.992 131.546 42.056 131.845 42.056C132.186 42.056 132.698 41.928 133.381 41.672C141.488 36.8933 149.36 31.6667 156.997 25.992C157.381 26.2907 157.573 26.6533 157.573 27.08C157.573 27.5067 157.36 27.9333 156.933 28.36C156.506 28.744 155.866 29.32 155.013 30.088C154.202 30.856 152.666 32.2427 150.405 34.248C148.144 36.2533 146.01 38.0453 144.005 39.624C138.629 43.976 134.874 46.4933 132.741 47.176C131.973 47.3893 131.056 47.496 129.989 47.496C128.965 47.496 128.005 46.9627 127.109 45.896C126.256 44.8293 125.829 43.3787 125.829 41.544C125.829 39.7093 127.002 37.064 129.349 33.608C131.738 30.152 134.981 26.6107 139.077 22.984C139.461 22.6853 139.653 22.408 139.653 22.152C139.653 21.896 139.205 21.768 138.309 21.768L134.277 21.896C128.602 21.896 125.68 21.256 125.509 19.976C124.186 19.72 123.525 19.336 123.525 18.824C123.525 18.6533 123.61 18.568 123.781 18.568C123.952 18.5253 124.101 18.504 124.229 18.504C124.357 18.4613 124.57 18.4187 124.869 18.376C125.168 18.3333 127.514 17.992 131.909 17.352C136.346 16.712 141.381 16.1787 147.013 15.752L151.429 9.864C151.685 9.352 152.581 9.096 154.117 9.096C155.653 9.096 156.421 9.416 156.421 10.056C156.421 10.2693 156.25 10.6533 155.909 11.208L154.309 13.448C154.096 14.1307 153.968 14.6427 153.925 14.984C153.925 15.2827 154.224 15.432 154.821 15.432ZM152.74 40.328C154.233 40.328 155.598 39.432 156.836 37.64C158.116 35.8053 159.012 33.9707 159.524 32.136C160.036 30.2587 160.292 28.7653 160.292 27.656C160.292 27.3573 160.057 27.208 159.588 27.208C159.161 27.208 158.649 27.4427 158.052 27.912L149.668 34.376C149.07 34.7173 148.388 34.888 147.62 34.888C146.852 34.888 146.468 34.6107 146.468 34.056C146.468 33.672 146.51 33.416 146.596 33.288C146.724 33.16 147.044 32.9467 147.556 32.648C150.713 30.472 155.022 26.9307 160.484 22.024C161.124 21.1707 161.7 20.744 162.212 20.744C162.724 20.744 163.577 20.9147 164.772 21.256C165.966 21.5547 166.564 21.9173 166.564 22.344C166.564 24.904 166.329 27.2293 165.86 29.32C165.39 31.4107 164.9 33.0107 164.388 34.12C163.918 35.1867 163.684 35.7627 163.684 35.848C163.684 35.9333 163.726 35.976 163.812 35.976C163.897 35.976 164.068 35.912 164.324 35.784C167.524 34.1627 171.598 31.5173 176.548 27.848L178.083 26.696C178.468 26.9947 178.66 27.3573 178.66 27.784C178.66 28.2107 178.468 28.5947 178.083 28.936C177.998 28.936 176.889 29.832 174.756 31.624C172.665 33.416 170.318 35.3787 167.716 37.512C165.156 39.6027 162.404 41.5227 159.46 43.272C156.516 45.0213 154.233 45.896 152.612 45.896C148.601 45.896 146.596 43.4853 146.596 38.664C146.596 38.28 146.745 37.9387 147.044 37.64C147.385 37.2987 147.812 37.128 148.324 37.128C148.324 37.3413 148.43 37.6827 148.644 38.152C148.9 38.5787 149.156 38.9413 149.411 39.24C150.18 39.9653 151.289 40.328 152.74 40.328ZM213.902 3.592C215.139 2.568 216.547 2.056 218.126 2.056C219.704 2.056 220.494 2.376 220.494 3.016C220.494 3.272 220.302 3.656 219.918 4.168C219.576 4.936 217.976 7.83733 215.118 12.872C207.651 25.928 203.918 34.632 203.918 38.984C203.918 39.3253 204.003 39.496 204.174 39.496C204.43 39.496 204.856 39.0693 205.454 38.216C207.203 35.1867 209.443 31.7093 212.174 27.784C214.904 23.8587 217.486 20.4027 219.918 17.416C222.35 14.4293 225.102 11.6347 228.174 9.032C231.246 6.42933 234.04 4.808 236.558 4.168C240.739 3.48533 243.448 3.144 244.686 3.144C244.814 3.18666 244.878 3.29333 244.878 3.464C244.878 3.592 244.643 3.784 244.174 4.04C239.352 6.728 233.358 11.848 226.19 19.4C219.064 26.9093 212.622 34.632 206.862 42.568C205.326 45.1707 204.131 46.792 203.278 47.432C202.424 48.072 201.4 48.392 200.206 48.392C197.987 48.392 196.878 46.0453 196.878 41.352C196.878 39.304 197.283 37.2133 198.094 35.08C201.08 27.1013 203.875 21.384 206.478 17.928C207.928 15.7947 208.654 14.6213 208.654 14.408C208.654 14.28 208.398 14.536 207.886 15.176C197.262 28.5307 189.752 37.2773 185.358 41.416C182.328 44.5733 178.894 47.816 175.054 51.144C171.214 54.472 168.141 56.7547 165.837 57.992C165.112 58.5893 164.344 58.888 163.533 58.888C162.723 58.888 161.741 58.5467 160.59 57.864C159.438 57.1813 158.861 56.392 158.861 55.496C158.861 55.0267 159.117 54.6 159.629 54.216L170.125 45.384C170.765 44.8293 171.171 44.552 171.342 44.552C171.469 44.552 171.533 44.6373 171.533 44.808C171.533 44.936 171.469 45.128 171.342 45.384C171.214 45.64 171.021 45.9173 170.766 46.216C170.467 46.5147 170.168 46.792 169.87 47.048L168.781 48.2C167.459 49.5227 166.798 50.248 166.798 50.376C166.798 50.5467 166.84 50.632 166.925 50.632C167.011 50.632 167.224 50.504 167.566 50.248C171.662 47.432 177.571 42.1413 185.294 34.376C193.016 26.568 199.715 19.4853 205.39 13.128L213.902 3.592ZM234.505 25.672C233.396 25.672 231.518 26.824 228.873 29.128C226.228 31.3893 224.905 32.776 224.905 33.288C224.905 33.3733 224.969 33.416 225.097 33.416C226.036 33.416 227.892 32.3707 230.665 30.28C233.481 28.1893 234.889 26.76 234.889 25.992C234.889 25.7787 234.761 25.672 234.505 25.672ZM220.873 46.152C217.588 46.152 215.945 44.1467 215.945 40.136C215.945 37.6187 217.033 34.952 219.209 32.136C221.428 29.2773 224.03 26.952 227.017 25.16C230.004 23.3253 232.649 22.408 234.953 22.408C235.977 22.408 236.916 22.8133 237.769 23.624C238.665 24.4347 239.113 25.224 239.113 25.992C239.113 27.4 238.11 29 236.105 30.792C234.1 32.5413 231.988 33.9707 229.769 35.08C227.593 36.1467 226.142 36.68 225.417 36.68C224.734 36.68 224.222 36.36 223.881 35.72C223.71 35.592 223.476 35.528 223.177 35.528C222.878 35.528 222.388 36.104 221.705 37.256C221.022 38.3653 220.681 39.2827 220.681 40.008C220.681 40.6907 220.937 41.1173 221.449 41.288C224.692 41.288 228.212 40.3493 232.009 38.472C235.806 36.552 241.054 33.2027 247.753 28.424C248.222 28.0827 248.926 27.5707 249.865 26.888C250.846 26.2053 251.422 25.8 251.593 25.672C251.977 25.9707 252.169 26.3333 252.169 26.76C252.169 27.1867 251.977 27.5707 251.593 27.912C249.46 30.0453 246.686 32.4347 243.273 35.08C239.902 37.7253 236.02 40.2427 231.625 42.632C227.23 44.9787 223.646 46.152 220.873 46.152ZM243.93 28.424C247.684 26.4613 249.924 25.1173 250.65 24.392C251.418 23.6667 252.143 23.304 252.826 23.304C254.959 23.304 256.026 23.56 256.026 24.072C256.026 24.584 254.682 26.056 251.994 28.488L251.034 29.32C250.436 29.9173 249.455 31.0267 248.09 32.648C246.767 34.2267 246.106 35.2507 246.106 35.72C246.106 35.8053 246.148 35.848 246.234 35.848C246.916 35.848 248.772 34.6533 251.802 32.264C254.874 29.8747 256.836 28.2107 257.69 27.272C258.586 26.2907 259.183 25.8 259.482 25.8C259.951 25.8 260.292 25.992 260.506 26.376C261.444 26.5467 261.914 26.9093 261.914 27.464C261.914 27.72 261.807 27.9973 261.594 28.296C261.38 28.552 260.335 29.7893 258.458 32.008C256.58 34.2267 255.386 35.7413 254.874 36.552C254.362 37.3627 253.828 38.3867 253.274 39.624C252.762 40.8187 252.506 41.608 252.506 41.992C252.506 42.376 252.612 42.568 252.826 42.568C253.167 42.568 253.871 42.1627 254.938 41.352C257.156 39.6027 259.93 36.616 263.258 32.392C266.586 28.168 268.463 25.288 268.89 23.752C269.359 22.216 269.764 21.448 270.106 21.448C270.49 21.448 270.874 21.9173 271.258 22.856C271.642 23.7947 271.834 24.904 271.834 26.184C271.834 27.4213 270.66 29.6613 268.314 32.904C266.01 36.1467 263.194 39.176 259.866 41.992C256.538 44.808 253.764 46.216 251.546 46.216C249.028 46.216 247.77 44.9573 247.77 42.44C247.77 40.9893 248.154 39.5387 248.922 38.088C248.964 37.96 248.986 37.8533 248.986 37.768C248.986 37.64 248.922 37.576 248.794 37.576C248.708 37.576 248.516 37.6613 248.218 37.832L242.074 42.568C241.69 42.9947 241.135 43.208 240.41 43.208C239.727 43.208 239.087 42.888 238.49 42.248C237.935 41.608 237.658 41.0107 237.658 40.456C237.658 38.1947 240.047 34.7173 244.826 30.024C243.588 30.024 242.97 29.832 242.97 29.448C242.97 29.192 243.29 28.8507 243.93 28.424ZM281.626 26.76L288.858 26.888C290.735 26.888 292.57 26.824 294.362 26.696C294.661 26.568 294.959 26.504 295.258 26.504C296.453 26.504 297.391 27.1653 298.074 28.488C298.415 28.9147 298.586 29.3413 298.586 29.768C298.586 30.792 298.138 31.4107 297.242 31.624C288.239 31.4533 282.949 31.3467 281.37 31.304C281.029 31.432 280.709 31.496 280.41 31.496C280.154 31.496 279.983 31.4533 279.898 31.368C279.813 31.24 279.77 30.9627 279.77 30.536L280.41 26.888C280.495 26.8027 280.901 26.76 281.626 26.76Z" })
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("ul", { className: "inline-flex gap-4", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            className: "w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600/[0.65] shadow-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors",
            href: "https://twitter.com/intent/tweet?text=Check%20this%20out!&url=https%3A%2F%2Fwasnew.catshoulder.dev%2F",
            "aria-label": "X",
            title: "Share on Twitter",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "fill-current",
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "14",
                children: /* @__PURE__ */ jsx("path", { d: "M16 14h-4.938L7.197 9.108 2.771 14H.316l5.736-6.342L0 0h5.063l3.496 4.476L12.601 0h2.454L9.697 5.932 16 14Zm-4.26-1.422h1.36L4.323 1.347H2.865l8.875 11.231Z" })
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            className: "w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600/[0.65] shadow-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors",
            href: "https://github.com/sayjeyhi/whats-new",
            "aria-label": "GitHub",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "fill-current",
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                children: /* @__PURE__ */ jsx("path", { d: "M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.994-2.683-.994-.398-.894-.895-1.192-.895-1.192-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.894 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.976 0-.894.298-1.59.795-2.087-.1-.198-.397-.993.1-2.086 0 0 .695-.2 2.186.795a6.408 6.408 0 0 1 1.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.796 2.186-.796.398 1.094.199 1.889.1 2.087.496.597.795 1.292.795 2.087 0 3.081-1.889 3.677-3.677 3.876.298.398.596.895.596 1.59v2.187c0 .198.1.496.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0Z" })
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            className: "w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600/[0.65] shadow-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors",
            href: "#0",
            "aria-label": "Facebook",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "fill-current",
                xmlns: "http://www.w3.org/2000/svg",
                width: "10",
                height: "15",
                children: /* @__PURE__ */ jsx("path", { d: "m2.834 15-.022-6.563H0V5.626h2.813V3.75C2.813 1.22 4.38 0 6.636 0c1.081 0 2.01.08 2.281.116v2.645H7.353c-1.228 0-1.466.584-1.466 1.44v1.424h3.488l-.938 2.813h-2.55V15H2.834Z" })
              }
            )
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 dark:text-gray-600", children: [
        "© ",
        /* @__PURE__ */ jsx("a", { className: "underline", href: "https://github.com/sayjeyhi/whats-new", target: "_blank", children: "What's new" }),
        " OSS project. All rights reserved."
      ] })
    ] })
  ] });
}
const technologiesPath = path.join(process.cwd(), "..");
const getParser = async () => {
  const highlighter = await createHighlighter({
    // In this case, we include the "js" language specifier to ensure that
    // Shiki applies the appropriate syntax highlighting for Markdown code
    // blocks.
    langs: ["md", "js", "ts", "tsx", "css", "html", "json", "go", "php", "java", "python", "ruby", "rust", "swift", "yaml"],
    themes: ["material-theme-darker"]
  });
  const Parser = new Marked().use(
    markedShiki({
      highlight(code, lang, props) {
        return highlighter.codeToHtml(code, {
          lang,
          theme: "material-theme-darker",
          meta: { __raw: props.join(" ") },
          // required by `transformerMeta*`
          transformers: [
            transformerNotationDiff({
              matchAlgorithm: "v3"
            }),
            transformerNotationHighlight({
              matchAlgorithm: "v3"
            }),
            transformerNotationWordHighlight({
              matchAlgorithm: "v3"
            }),
            transformerNotationFocus({
              matchAlgorithm: "v3"
            }),
            transformerNotationErrorLevel({
              matchAlgorithm: "v3"
            }),
            transformerMetaHighlight(),
            transformerMetaWordHighlight()
          ]
        });
      }
    })
  );
  return Parser;
};
async function getTechnologyList() {
  const files = await readdir(technologiesPath);
  const technologies = await Promise.all(
    files.filter((file) => file.endsWith(".md")).filter((file) => file !== "README.md").map(async (file) => {
      const content = await readFile(path.join(technologiesPath, file), "utf-8");
      const { attributes, body } = frontMatter(content);
      const Parser = await getParser();
      const html = Parser.parse(body);
      const excerpt = body.split("\n")[0];
      const latestVersion = body.match(/<h2>(.*?)<\/h2>/)[1];
      const formatedDate = new Date(attributes.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      return {
        slug: file.replace(".md", ""),
        title: attributes.title,
        updated: attributes.updated,
        formatedDate,
        latestVersion,
        tags: attributes.tags,
        description: attributes.description,
        image: attributes.image,
        content: html,
        excerpt
      };
    })
  );
  return technologies.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
}
async function latestThreeUpdatedTechnologies() {
  const technologies = await getTechnologyList();
  return technologies.sort((post) => parseInt(post.updated, 10)).slice(0, 3);
}
async function getTechnology(slug) {
  try {
    const content = await readFile(path.join(technologiesPath, `${slug}.md`), "utf-8");
    const { attributes, body } = frontMatter(content);
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
        hour: "numeric"
      })
    };
  } catch {
    return null;
  }
}
const links = () => {
  return [
    { rel: "stylesheet", href: styles }
  ];
};
async function loader$2() {
  const posts = await latestThreeUpdatedTechnologies();
  return json({ posts });
}
function App() {
  const { posts } = useLoaderData();
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsx(
      "body",
      {
        className: "font-inter antialiased bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100 tracking-tight",
        children: /* @__PURE__ */ jsx(Theme, { children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden supports-[overflow:clip]:overflow-clip", children: /* @__PURE__ */ jsx("div", { className: "max-w-[728px] mx-auto", children: /* @__PURE__ */ jsx("div", { className: "w-full bg-white dark:bg-gray-900 border-x border-gray-100 dark:border-gray-800 box-content", children: /* @__PURE__ */ jsx("div", { className: "px-3 md:px-16", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
          /* @__PURE__ */ jsx(Header, {}),
          /* @__PURE__ */ jsx("main", { className: "grow py-12 space-y-12", children: /* @__PURE__ */ jsx(Outlet, {}) }),
          /* @__PURE__ */ jsx(ScrollRestoration, {}),
          /* @__PURE__ */ jsx(Scripts, {}),
          /* @__PURE__ */ jsx(Footer, { latestUpdatedTechnologies: posts })
        ] }) }) }) }) }) })
      }
    )
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
async function loader$1({ params }) {
  const post = await getTechnology(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ post });
}
function Post() {
  const { post } = useLoaderData();
  return /* @__PURE__ */ jsxs("article", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: post.title }),
    /* @__PURE__ */ jsxs("div", { className: "text-gray-600 mb-8", children: [
      "Last updated: ",
      post.formatedDate
    ] }),
    /* @__PURE__ */ jsx("div", { className: "prose dark:prose-invert", dangerouslySetInnerHTML: { __html: post.content } })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Post,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function RecentlyUpdatedTechnologies({ technologies }) {
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsx("h2", { className: "font-inter-tight text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4", children: "Recently Updated Technologies" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-1", children: technologies.map((item, index) => /* @__PURE__ */ jsx(
      "a",
      {
        className: "block hover:no-underline decoration-2 p-5 rounded-xl odd:bg-linear-to-tr odd:from-gray-100 odd:to-gray-50 dark:odd:bg-linear-to-tr dark:odd:from-gray-800 dark:odd:to-gray-800/[0.65] border-2 border-transparent hover:border-green-200",
        href: `/posts/${item.slug}`,
        children: /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("div", { className: "sm:flex gap-5", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              className: "w-10 h-10 rounded-xs",
              src: item.image,
              alt: item.title
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 mb-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 dark:text-gray-100", children: item.title }),
                /* @__PURE__ */ jsx("span", { className: "text-[13px] italic text-gray-500/70", children: item.formatedDate })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-[13px] font-medium text-gray-600dark:text-gray-400", children: item.latestVersion })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: item.description })
          ] })
        ] }) })
      },
      item.slug
    )) })
  ] });
}
async function loader() {
  const posts = await getTechnologyList();
  return json({ posts });
}
function Index() {
  const { posts } = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "flex gap-20 flex-col", children: /* @__PURE__ */ jsx(RecentlyUpdatedTechnologies, { technologies: posts }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-spcd44vf.js", "imports": ["/assets/components-CNqGG_R9.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-C13TyVRS.js", "imports": ["/assets/components-CNqGG_R9.js"], "css": [] }, "routes/posts.$slug": { "id": "routes/posts.$slug", "parentId": "root", "path": "posts/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/posts._slug-CbKm6WXR.js", "imports": ["/assets/components-CNqGG_R9.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-C2ZF0mvn.js", "imports": ["/assets/components-CNqGG_R9.js"], "css": [] } }, "url": "/assets/manifest-86491fc9.js", "version": "86491fc9" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/posts.$slug": {
    id: "routes/posts.$slug",
    parentId: "root",
    path: "posts/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
