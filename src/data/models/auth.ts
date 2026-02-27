/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import { IUser } from "./user";

export interface IToken {
  access: {
    value: string;
    expiresAt: string;
  };
  refresh: {
    value: string;
    expiresAt?: string | null;
  };
}
