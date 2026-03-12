import { throwExceptionByStatus } from "@/exceptions";
import type { IPartner } from "@/data/models/partner";
import { GetPartnerRequest, Partner, PartnerSdk } from "../_sdk_";

/**
 * Safely parse JsonData field to an object.
 */
// const parseJsonData = (
//   raw: string | null | undefined
// ): Record<string, unknown> | null => {
//   if (!raw) return null;
//   try {
//     return JSON.parse(raw);
//   } catch {
//     return null;
//   }
// };

/**
 * Transform API Partner → Frontend Partner model
 */
function transform(data: Partner[]): IPartner[] {
  return data.map((item) => ({
    id: item.Id,
    name: item.Ten,
    domain: item.Domain,
    businessType: item.LoaiHinhKinhDoanh,
    mobile: item.Mobile,
    email: item.Email,
    address: item.Address,
    active: item.Active,
    activated: item.Activated,
    subscriptionName: item.SubName,
    // jsonData: parseJsonData(item.JsonData),
    logoUrl: item.LogoUrl,
    subscriptionDate: item.SubDate,
    subscriptionExpiredDate: item.SubExpiredDate,
    subscriptionQuota: item.SubQuota,
    billed: item.Billed,
    consumeQuota: item.ConsumeQuota,
    totalQuota: item.TotalQuota,
    lastUseTime: item.LastUseTime,
    createdAt: item.CreateDate,
    updatedAt: item.UpdateDate,
  }));
}

export async function getPartner(request: GetPartnerRequest){
    const { data, response, error } = await PartnerSdk.get(request);
    if (error) {
        const status = response?.status || 500;
        const message = error?.message || "Lỗi khi lấy danh sách đối tác";
        throwExceptionByStatus(status, message);
    }
    return {
        data: transform(data?.Value || []),
        total: data?.Total || 0,
        sum: data?.Sum || 0,
    };
}