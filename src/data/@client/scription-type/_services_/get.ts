import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SubscriptionTypeSdk, GetSubscriptionTypeRequest } from "../_sdk_";
import { useAuth } from "@/data/@client/auth";

export const subscriptionTypeKeys = {
    all: ["subscription-type"] as const,
    list: (request: GetSubscriptionTypeRequest) =>
        [...subscriptionTypeKeys.all, "list", request] as const,
};

export const useSubscriptionTypes = () => {
    const { user } = useAuth();
    const domain = user?.domain.trim() || "";
    const enabled = domain.length > 0;
    const queryKey = subscriptionTypeKeys.list({ params: { domain } });
    const queryClient = useQueryClient();

    const queryResult = useQuery({
        queryKey,
        queryFn: async () => {
            const { data, error } = await SubscriptionTypeSdk.getSubscriptionType({ params: { domain } });

            if (error) {
                throw new Error(error?.error || "Lỗi khi lấy loại đăng ký");
            }

            return data || [];
        },
        enabled,
    });

    return {
        loading: queryResult.isLoading,
        data: queryResult.data,
        error: queryResult.error,
        refetch: queryResult.refetch,
        isFetching: queryResult.isFetching,
        invalidate: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    };
};

