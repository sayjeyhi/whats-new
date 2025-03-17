import {type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("routes/home.tsx"),
    route("technology/:slug", "routes/Technology.tsx"),
    route("technology/:slug/:version", "routes/TechnologyVersion.tsx"),
  ]),
] satisfies RouteConfig;
