import { IPartner } from "@/data/models/partner";

export type GetPartnerRequest = {
    params: {
        domain: string;
    },
    queries: {
        page: number;
        pageSize: number;
        typeOfBusiness: string;
        search: string;
        typeOfFilterDate: string;
        from: string;
        to: string;
        active: string;
        warningQuota: string;
    };
}

export type GetPartnerResponse = {
    200: {
        sum: number;
        total: number;
        data: IPartner[];
    }
}

export type GetPartnerError = {
    [key: number]: {
        error: string;
    }
}



