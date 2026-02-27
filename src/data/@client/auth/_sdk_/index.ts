/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import { client } from "@/data/client.config";

import { LoginError, LoginRequest, LoginResponse } from "./login.type";
import { LogoutError, LogoutRequest, LogoutResponse } from "./logout.type";
import apiPaths from "@/paths/api";


export * from "./login.type";
export * from "./logout.type";

export class AuthSdk {
  static async login<ThrowOnError extends boolean = false>(
    request: LoginRequest
  ) {
    const response = await client.post<LoginResponse, LoginError, ThrowOnError>(
      {
        url: apiPaths.client.auth.login.getPath(),
        body: request.body,
      }
    );
    return response;
  }
 
  static async logout<ThrowOnError extends boolean = false>(
    request: LogoutRequest = {}
  ) {
    const response = await client.delete<LogoutResponse, LogoutError, ThrowOnError>(
      {
        url: apiPaths.client.auth.logout.getPath(),
      }
    );
    return response;
  }
}
