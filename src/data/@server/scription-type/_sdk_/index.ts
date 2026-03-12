import { apiPaths } from "@/paths";
import { apiClient } from "@/data/client.config";


export class SubscriptionTypeSdk {
    static async getSubscriptionType<ThrowOnError extends boolean = false>(request: GetSubscriptionTypeRequest) {
        return apiClient.get<GetSubscriptionTypeResponse, GetSubscriptionTypeError, ThrowOnError>({
            url: apiPaths.server.subscriptionType.get.getPath(request.params.domain),
        });
    }
}

import type { GetSubscriptionTypeRequest, GetSubscriptionTypeResponse, GetSubscriptionTypeError } from "./get.type";

export type * from "./get.type";