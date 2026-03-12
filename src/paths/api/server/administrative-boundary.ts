import { buildQueryString } from "@/paths";
import { defineApiRoute } from "..";

const administrativeBoundaryPaths = {
  base: defineApiRoute({
    path: "/administrative-boundary",
    getPath: (queries?: Record<string, string | number | boolean>) => {
      return `/diagioihanhchinh${buildQueryString(queries)}`;
    },
  }),
};

export default administrativeBoundaryPaths;

