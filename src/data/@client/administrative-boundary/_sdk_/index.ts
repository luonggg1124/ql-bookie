import { client } from "@/data/client.config";
import {
  GetAdministrativeBoundaryRequest,
  GetAdministrativeBoundaryResponse,
  GetAdministrativeBoundaryError,
} from "./get.type";
import { apiPaths } from "@/paths";

export * from "./get.type";

export class AdministrativeBoundarySdk {
  static async getAdministrativeBoundary<
    ThrowOnError extends boolean = false
  >(request: GetAdministrativeBoundaryRequest) {
    return client.get<
      GetAdministrativeBoundaryResponse,
      GetAdministrativeBoundaryError,
      ThrowOnError
    >({
      url: apiPaths.client.administrativeBoundary.base.getPath({
        ...request.query,
        newData: true,
      }),
    });
  }
}
