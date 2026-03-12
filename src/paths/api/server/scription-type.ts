import { buildQueryString } from "@/paths";


const subscriptionTypePaths = {
    get: {
        path: "/{domain}/SuperAdmin/dmSubscriptionType",
        getPath: (domain: string, queries?: Record<string, string | number | boolean>) => {
            return `/${domain}/SuperAdmin/dmSubscriptionType${buildQueryString(queries)}`;
        },
    }
}

export default subscriptionTypePaths;