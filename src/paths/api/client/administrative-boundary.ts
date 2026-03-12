import { buildQueryString } from "@/paths";
import { defineApiRoute } from "..";

const administrativeBoundaryPaths = {
  base: defineApiRoute({
    path: "/api/administrative-boundary",
    getPath: (queries?: Record<string, string | number | boolean>) => {
      return `/api/administrative-boundary${buildQueryString(queries)}`;
    },
  }),
};

export default administrativeBoundaryPaths;

