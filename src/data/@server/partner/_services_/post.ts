import { throwExceptionByStatus } from "@/exceptions";
import { CreatePartnerRequest, PartnerSdk } from "../_sdk_";

export async function createPartner(request: CreatePartnerRequest){
    const {data, response, error} = await PartnerSdk.create(request);
    if (error) {
        const status = response?.status || 500;
        const message = error?.message || "Lỗi khi tạo đối tác";
        throwExceptionByStatus(status, message);
    }
    return data;
}