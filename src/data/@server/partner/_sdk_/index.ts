import { apiPaths } from "@/paths";
import { apiClient } from "@/data/client.config";


export class PartnerSdk {
    static async get(request: GetPartnerRequest){
        return apiClient.get<GetPartnerResponse, GetPartnerError>({
            url: apiPaths.server.partner.get.getPath(
                request.params.domain,
                request.queries
            ),
        });
    }
    static async create(request: CreatePartnerRequest){
        return apiClient.post<CreatePartnerResponse, CreatePartnerError>({
            url: apiPaths.server.partner.create.getPath(request.params.domain),
            body: request.body,
        });
    }
}

import type { GetPartnerError, GetPartnerRequest, GetPartnerResponse } from "./get.type";
import type { CreatePartnerRequest, CreatePartnerResponse, CreatePartnerError } from "./create.type";

export type * from "./get.type";
export type * from "./create.type";