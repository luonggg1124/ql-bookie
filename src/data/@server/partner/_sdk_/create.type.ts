export type CreatePartnerRequest = {
  params: {
    domain: string;
  };
  body: {
    Activated: boolean;
    Address: string;
    CurrentSubscriptionTypeId: string;
    Domain: string;
    Email: string;
    GoiSuDungZMA: number;
    LoaiHinhKinhDoanh: string;
    Mobile: string;
    Name: string;
    UseBookie: boolean;
    UseCRM: boolean;
    UseCommonPatientPortal: boolean;
    Website: string;
    ZMAPackage: number;
  };
};

export type CreatePartnerResponse = {
  200: {
    code: string | null;
    message: string | null;
    success: boolean;
    result: null;
  };
};

export type CreatePartnerError = {
  [key: number]: {
    message: string;
    error: string;
  };
};