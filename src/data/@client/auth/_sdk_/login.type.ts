import { IUser } from "@/data/models/user";


export type LoginRequest = {
    body: {
      username: string;
      password: string;
      rememberMe: boolean;
      domain: string;
    };
  };
  export type LoginError = {
    500: {
      error:string;
    };
    400: {
      error:string;
    };
  };
  export type LoginResponse = {
    201: {
      user: IUser;
      permissions: string[];
     
    };
  };