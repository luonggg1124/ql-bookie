import { defineRoute } from "..";


const partnerPaths = {
    index: defineRoute({
        title: "Đối tác",
        path: "/partner",
        getPath: () => "/partner",
        display: {
            sidebar: true,
            search: true,
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
    create: defineRoute({
        title: "Thêm đối tác",
        path: "/partner/create",
        getPath: () => "/partner/create",
        display: {
            sidebar: false,
            search: true,
        },
    }),
}
export default partnerPaths;