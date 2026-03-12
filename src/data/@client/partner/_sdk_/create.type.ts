export type CreatePartnerRequest = {
    params: {
      domain: string;
    };
    body: {
      activated: boolean;
      address: string;
      currentSubscriptionTypeId: string;
      email: string;
      typeOfBusiness: string;
      mobile: string;
      name: string;
      useBookie: boolean;
      useCRM: boolean;
      useCommonPatientPortal: boolean;
      website: string;
      zmaPackage: number;
    };
  };
  
  export type CreatePartnerResponse = {
    201: {
      success: true;
    };
  };
  
  export type CreatePartnerError = {
    [key: number]: {
      message: string;
      error: string;
    };
  };