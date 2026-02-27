import { buildQueryString } from "../../index";

const authPaths = {
  login: {
    path: "/Auth/login",
    getPath: (queries?: Record<string, string | number | boolean>) => {
      return `/Auth/login${buildQueryString(queries)}`;
    },
  },
  myPermission: {
    path: "/{domain}/Permission/my-permissions",
    getPath: (domain: string, queries?: Record<string, string | number | boolean>) => {
      return `/${domain}/Permission/my-permissions${buildQueryString(queries)}`;
    },
  },
  refresh: {
    path: "/Auth/refresh-token",
    getPath: (queries?: Record<string, string | number | boolean>) => {
      return `/Auth/refresh-token${buildQueryString(queries)}`;
    },
  }
};

export default authPaths;

