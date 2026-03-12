/**
 * Partner model interface (frontend)
 */
export interface IPartner {
  id: string; // Id
  name: string; // Ten
  domain: string; // Domain
  businessType: string; // LoaiHinhKinhDoanh
  mobile: string; // Mobile
  email: string; // Email
  address: string; // Address
  active: boolean; // Active
  activated: boolean; // Activated
  subscriptionName: string | null; // SubName
  // jsonData: Record<string, unknown> | null; // JsonData
  logoUrl: string | null; // LogoUrl
  subscriptionDate: string | null;
  subscriptionExpiredDate: string | null; // SubExpiredDate
  subscriptionQuota: number | null; // SubQuota 
  billed: number | null; // Billed
  consumeQuota: number | null; // ConsumeQuota
  totalQuota: number | null; // TotalQuota
  lastUseTime: string | null; // LastUseTime
  createdAt: string; // CreateDate
  updatedAt: string; // UpdateDate
}