import { apiClient } from "@/data/client.config";
import {
  GetAdministrativeBoundaryError,
  GetAdministrativeBoundaryRequest,
  GetAdministrativeBoundaryResponse,
} from "./get.type";
import { apiPaths } from "@/paths";

export * from "./get.type";

export class AdministrativeBoundarySdk {
  static async getAdministrativeBoundary<
    ThrowOnError extends boolean = false
  >(request: GetAdministrativeBoundaryRequest) {
    return apiClient.get<
      GetAdministrativeBoundaryResponse,
      GetAdministrativeBoundaryError,
      ThrowOnError
    >({
      url: apiPaths.server.administrativeBoundary.base.getPath(
        request.queries
      ),
    });
  }
}
