export interface SubscriptionType {
  Code: string;
  Name: string;
  Description: string;
  TotalQuota: number;
  Price: number;
  Active: boolean;
  Id: string;
}

export type GetSubscriptionTypeRequest = {
    params: {
        domain: string;
    },
}

export type GetSubscriptionTypeResponse = {
    200: {
        code: string | null;
        message: string | null;
        success: boolean;
        result: SubscriptionType[];
    }
}

export type GetSubscriptionTypeError = {
    [key: number]: {
        message: string;
        error: string;
    }
}