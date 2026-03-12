import { client } from "@/data/client.config";
import { apiPaths } from "@/paths";

export class SubscriptionTypeSdk {
    static async getSubscriptionType<ThrowOnError extends boolean = false>(
        request: GetSubscriptionTypeRequest,
    ) {
        return client.get<
            GetSubscriptionTypeResponse,
            GetSubscriptionTypeError,
            ThrowOnError
        >({
            url: apiPaths.client.subscriptionType.get.getPath(request.params.domain),
        });
    }
}

import type {
    GetSubscriptionTypeError,
    GetSubscriptionTypeRequest,
    GetSubscriptionTypeResponse,
} from "./get.type";

export type * from "./get.type";
