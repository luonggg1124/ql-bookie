import { buildQueryString } from "@/paths";
import { defineApiRoute } from "..";


const partnerPaths = {
    get: defineApiRoute({
        path: "/api/{domain}/partner",
        getPath: (domain: string, queries?: Record<string, string | number | boolean>) => {
            return `/api/${domain}/partner${buildQueryString(queries)}`;
        },
    }),
    create: defineApiRoute({
        path: "/api/{domain}/partner",
        getPath: (domain: string, queries?: Record<string, string | number | boolean>) => {
            return `/api/${domain}/partner${buildQueryString(queries)}`;
        },
    }),
}
export default partnerPaths;