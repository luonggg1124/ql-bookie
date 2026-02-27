/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

export type LogoutRequest = any;

export type LogoutError = {
  [key: number]: {
    error: string;
  };
};

export type LogoutResponse = {
  200: {
    success: true;
  };
};

