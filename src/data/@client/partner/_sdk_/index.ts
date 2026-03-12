import { apiPaths } from "@/paths";
import { client } from "@/data/client.config";


export class PartnerSdk {
    static async get<ThrowOnError extends boolean = false>(request: GetPartnerRequest){
        return client.get<GetPartnerResponse, GetPartnerError, ThrowOnError>({
            url: apiPaths.client.partner.get.getPath(
                request.params.domain,
                request.queries
            ),
        });
    }
    static async create<ThrowOnError extends boolean = false>(request: CreatePartnerRequest){
        return client.post<CreatePartnerResponse, CreatePartnerError, ThrowOnError>({
            url: apiPaths.client.partner.create.getPath(request.params.domain),
            body: request.body,
        });
    }
}

import type { GetPartnerError, GetPartnerRequest, GetPartnerResponse } from "./get.type";
import type { CreatePartnerResponse, CreatePartnerError, CreatePartnerRequest } from "./create.type";

export type * from "./get.type";
export type * from "./create.type";