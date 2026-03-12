import { throwExceptionByStatus } from "@/exceptions";
import { GetSubscriptionTypeRequest, SubscriptionType, SubscriptionTypeSdk } from "../_sdk_";
import { ISubscriptionType } from "@/data/models/scription-type";

function transform(data: SubscriptionType[]) : ISubscriptionType[] {
    return data.map(item => ({
        code: item.Code,
        name: item.Name,
        description: item.Description,
        totalQuota: item.TotalQuota,
        price: item.Price,
        active: item.Active,
        id: item.Id,
    }));
}

export async function getSubscriptionType(request: GetSubscriptionTypeRequest) {
    const { data, response, error } = await SubscriptionTypeSdk.getSubscriptionType(request);
    if (error) {
        const status = response?.status || 500;
        const message = error?.message || "Lỗi khi lấy loại đăng ký";
        throwExceptionByStatus(status, message);
    }
    return transform(data?.result || []);
}