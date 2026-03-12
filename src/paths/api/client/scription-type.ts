import { buildQueryString } from "@/paths";
import { defineApiRoute } from "..";

const subscriptionTypePaths = {
  get: defineApiRoute({
    path: "/api/{domain}/scription-type",
    getPath: (domain: string, queries?: Record<string, string | number | boolean>) => {
      return `/api/${domain}/scription-type${buildQueryString(queries)}`;
    },
  }),
};

export default subscriptionTypePaths;

