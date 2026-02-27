/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

// ApiRoute hỗ trợ mọi kiểu getPath đang dùng ở các file path api client

import clientPaths from "./client";
import serverPaths from "./server";


// (domain, queries), (domain, id, queries), (domain) ...
export type ApiRoute<Args extends any[] = any[]> = {
    path: string;
    getPath: (...args: Args) => string;
    auth?: boolean;
    permissions?: string | string[];
  };
  export function defineApiRoute<Args extends any[] = any[]>({
    path,
    getPath,
    auth,
    permissions,
  }: {
    path: string;
    getPath: (...args: Args) => string;
    auth?: boolean;
    permissions?: string | string[];
  }): ApiRoute<Args> {
    return {
      path,
      getPath,
      auth,
      permissions,
    };
  }
  
  export type ApiRouteGroup = Record<string, ApiRoute| Record<string, ApiRoute>>;

const apiPaths = {
    client: clientPaths,
    server: serverPaths,
}
export default apiPaths;