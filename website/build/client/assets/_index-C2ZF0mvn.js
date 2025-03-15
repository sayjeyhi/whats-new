import{n as e,v as r}from"./components-CNqGG_R9.js";function t({technologies:a}){return e.jsxs("section",{children:[e.jsx("h2",{className:"font-inter-tight text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4",children:"Recently Updated Technologies"}),e.jsx("div",{className:"space-y-1",children:a.map((s,d)=>e.jsx("a",{className:"block hover:no-underline decoration-2 p-5 rounded-xl odd:bg-linear-to-tr odd:from-gray-100 odd:to-gray-50 dark:odd:bg-linear-to-tr dark:odd:from-gray-800 dark:odd:to-gray-800/[0.65] border-2 border-transparent hover:border-green-200",href:`/posts/${s.slug}`,children:e.jsx("article",{children:e.jsxs("div",{className:"sm:flex gap-5",children:[e.jsx("img",{className:"w-10 h-10 rounded-xs",src:s.image,alt:s.title}),e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"space-y-1.5 mb-3",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h3",{className:"font-semibold text-gray-800 dark:text-gray-100",children:s.title}),e.jsx("span",{className:"text-[13px] italic text-gray-500/70",children:s.formatedDate})]}),e.jsx("div",{className:"text-[13px] font-medium text-gray-600dark:text-gray-400",children:s.latestVersion})]}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:s.description})]})]})})},s.slug))})]})}function n(){const{posts:a}=r();return e.jsx("div",{className:"flex gap-20 flex-col",children:e.jsx(t,{technologies:a})})}export{n as default};
