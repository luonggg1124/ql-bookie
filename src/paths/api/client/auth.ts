import { buildQueryString } from "../../index";
import { defineApiRoute } from "..";

const authPaths = {
  refresh: defineApiRoute({
    path: "/api/auth/refresh",
    getPath: (queries?: Record<string, string | number | boolean>) => {
      return `/api/auth/refresh${buildQueryString(queries)}`;
    },
  }),
  login: defineApiRoute({
    path: "/api/auth/login",
    getPath: (queries?: Record<string, string | number | boolean>) => {
      return `/api/auth/login${buildQueryString(queries)}`;
    },
  }),
  register: defineApiRoute({
    path: "/api/auth/register",
    getPath: (queries?: Record<string, string | number | boolean>) => {
      return `/api/auth/register${buildQueryString(queries)}`;
    },
  }),
  me: defineApiRoute({
    path: "/api/auth/me",
    getPath: (queries?: Record<string, string | number | boolean>) => {
      return `/api/auth/me${buildQueryString(queries)}`;
    },
  }),
  logout: defineApiRoute({
    path: "/api/auth/logout",
    getPath: (queries?: Record<string, string | number | boolean>) => {
      return `/api/auth/logout${buildQueryString(queries)}`;
    },
  }),
};

export default authPaths;

