import { apiClient } from "@/data/client.config";
import { LoginError, LoginRequest, LoginResponse } from "./login.type";
import apiPaths from "@/paths/api";
import { GetMyPermissionError, GetMyPermissionRequest, GetMyPermissionResponse } from "./get-permission.type";
import { RefreshError, RefreshRequest,RefreshResponse } from "./refresh.type";


export class AuthSdk {
  static refresh<ThrowOnError extends boolean = false>(request: RefreshRequest  ){
    return apiClient.post<RefreshResponse, RefreshError, ThrowOnError>({
      url: apiPaths.server.auth.refresh.getPath(),
      body: request.body,
    });
  }
  static login<ThrowOnError extends boolean = false>(request: LoginRequest) {
    return apiClient.post<LoginResponse, LoginError, ThrowOnError>({
      url: apiPaths.server.auth.login.getPath(),
      body: request.body,
    });
  }
  static async myPermission<ThrowOnError extends boolean = false>(request: GetMyPermissionRequest){
    return apiClient.get<GetMyPermissionResponse, GetMyPermissionError, ThrowOnError>({
      url: apiPaths.server.auth.myPermission.getPath(request.params.domain),
      headers: {
        "Authorization": `Bearer ${request.headers.accessToken}`
      }
    });
  }
}
export type * from "./login.type";
export type * from "./get-permission.type";
export type * from "./refresh.type";