import { defineRoute } from "..";


const partnerPaths = {
    index: defineRoute({
        title: "Đối tác",
        path: "/partner",
        getPath: () => "/partner",
        display: {
            sidebar: true,
            search: false,
        },
    }),
    detail: defineRoute({
        title: "Partner Detail",
        path: "/partner/:id",
        getPath: (params) => `/partner/${params.id}`,
        display: {
            sidebar: false,
            search: false,
        },
    }),
}
export default partnerPaths;