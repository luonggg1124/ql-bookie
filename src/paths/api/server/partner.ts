import { buildQueryString } from "@/paths";


const partnerPaths = {
    base: {
        path: "/{domain}/SuperAdmin",
        getPath: (domain: string, queries?: Record<string, string | number | boolean>) => {
            return `/${domain}/SuperAdmin${buildQueryString(queries)}`;
        },
    },
    get: {
        path: "/{domain}/SuperAdmin/company",
        getPath: (domain: string, queries?: Record<string, string | number | boolean>) => {
            return `/${domain}/SuperAdmin/company${buildQueryString(queries)}`;
        },
    },
    create: {
        path: "/{domain}/SuperAdmin/company",
        getPath: (domain: string, queries?: Record<string, string | number | boolean>) => {
            return `/${domain}/SuperAdmin/company${buildQueryString(queries)}`;
        },
    },
}

export default partnerPaths;