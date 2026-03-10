import type { IUser } from "@/data/models/user";
import { AuthSdk } from "@/data/@server/auth/_sdk_";


import type { LoginResponse } from "@/data/@server/auth/_sdk_/login.type";
import { throwExceptionByStatus } from "@/exceptions";
import { GetMyPermissionRequest } from "../_sdk_/get-permission.type";
import { RefreshRequest } from "../_sdk_";

type ApiUser = LoginResponse[200]["Data"]["User"];

/**
 * Transform API User → Frontend User
 */
const mapUser = (apiUser: ApiUser | null | undefined): IUser => {
  if (!apiUser) {
    throw new Error("User data is missing");
  }

  return {
    id: apiUser.Id,
    email: apiUser.Email,
    domain: apiUser.Domain,
    firstName: apiUser.FirstName,
    lastName: apiUser.LastName,
    permissions: apiUser.Permissions,
    roles: apiUser.Roles,
    twoFactorEnabled: apiUser.TwoFactorEnabled,
    username: apiUser.Username,
    active: apiUser.Active,
    createdAt: apiUser.CreateDate,
    lastLoginAt: apiUser.LastLoginAt,
    phoneNumber: apiUser.PhoneNumber,
    departments: apiUser.Departments,
    googleImageUrl: apiUser.GoogleImageUrl,
    googleRefreshToken: apiUser.GoogleRefreshToken,
    emailConfirmed: apiUser.EmailConfirmed,
  };
};

/**
 * Transform API Auth → Frontend Auth
 */

export const transform = (
  apiData: LoginResponse[200]["Data"] | null | undefined
) => {
  if (!apiData) {
    throw new Error("Auth data is missing");
  }

  return {
    accessToken: {
      value: apiData.AccessToken,
      expiresAt: apiData.ExpiresAt,
    },
    refreshToken: {
      value: apiData.RefreshToken,
    },
    user: mapUser(apiData.User),
  };
};
type LoginData = {
  data: {
    username: string;
    password: string;
    rememberMe: boolean;
    domain: string;
  };
};
export const login = async (request: LoginData) => {
  const response = await AuthSdk.login({
    body: request.data,
  });


  if (response.error) {
    const status = response.response?.status || 500;
    const error = response.error;

    const message = error?.Message || "Unknown error";

    throwExceptionByStatus(status, message);
  }

  const auth = transform(response.data.Data);
  return auth;
};

export const getMyPermission = async (request: GetMyPermissionRequest) => {
  const { data, response, error } = await AuthSdk.myPermission(request);
  if (error) {
    const status = response?.status || 500;
    const message = error?.message || "Lỗi khi lấy quyền của người dùng";
    throwExceptionByStatus(status, message);
  }
  console.log(data,'permission data');
  
  const raw = data?.data || "";
  if (!raw) return [];

  const parts = raw
    .split(";")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return Array.from(new Set(parts));
};

export const refreshUser = async (request:RefreshRequest) => {
  const {data,error,response} = await AuthSdk.refresh(request);
  
    
  if (error) {
    const status = response?.status || 500;
    const message = error?.Message || "Lỗi khi lấy quyền của người dùng";
    throwExceptionByStatus(status, message);
  }
  return transform(data?.Data);
}