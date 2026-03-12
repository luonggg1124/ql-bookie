import type { ISubscriptionType } from "@/data/models/scription-type";

export type GetSubscriptionTypeRequest = {
  params: {
    domain: string;
  };
};

export type GetSubscriptionTypeResponse = {
  data: {
    data: ISubscriptionType[];
  };
};

export type GetSubscriptionTypeError = {
  [key: number]: {
    error: string;
  };
};

