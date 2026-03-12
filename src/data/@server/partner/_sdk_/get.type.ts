export interface Partner {
    Id: string;
    Ten: string;
    Domain: string;
    LoaiHinhKinhDoanh: string;
    Mobile: string;
    Email: string;
    Address: string;
    Active: boolean;
    CreateDate: string;
    UpdateDate: string;
    Activated: boolean;
    SubName: string | null;
    JsonData: string;
    LogoUrl: string | null;
    SubDate: string | null;
    SubExpiredDate: string | null;
    SubQuota: number | null;
    Billed: number | null;
    ConsumeQuota: number | null;
    TotalQuota: number | null;
    LastUseTime: string | null;
}

export type GetPartnerRequest = {
    params: {
        domain: string;
    },
    queries: {
        page: number;
        pageSize: number;
        loaiHinhKinhDoanh: string;
        search: string;
        typeOfFilterDate: number;
        from: string;
        to: string;
        active: number;
        warningQuota: number;
    };
}

export type GetPartnerResponse = {
    200: {
        Sum: number;
        Total: number;
        Value: Partner[];
    }
}

export type GetPartnerError = {
    [key: number]: {
        message: string;
        error: string;
    }
}



