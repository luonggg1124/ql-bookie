/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";

import { IUser } from "@/data/models/user";
import { IToken } from "@/data/models/auth";
import { GLOBAL_COOKIES } from "@/constants";



/**
 * Set auth cookies vào NextResponse (dùng trong login route)
 * @param response - NextResponse instance
 * @param authData - Object chứa accessToken, refreshToken, và user
 */
export function setAuthCookies(
  response: NextResponse,
  authData: {
    accessToken: {
      value: string;
      expiresAt: string;
    };
    refreshToken: {
      value: string;
      expiresAt?: string | null;
    };
    user: IUser;
  }
): NextResponse {
  // Set TOKEN cookie (httpOnly: true)
  const tokenData: IToken = {
    access: {
      value: authData.accessToken.value,
      expiresAt: authData.accessToken.expiresAt,
    },
    refresh: {
      value: authData.refreshToken.value,
      expiresAt: authData.refreshToken.expiresAt || null,
    },
  };
  response.cookies.set(
    GLOBAL_COOKIES.DOMAIN.KEY,
    authData.user.domain,
    {
      maxAge: GLOBAL_COOKIES.DOMAIN.OPTIONS.maxAge,
      path: GLOBAL_COOKIES.DOMAIN.OPTIONS.path,
      httpOnly: GLOBAL_COOKIES.DOMAIN.OPTIONS.httpOnly,
      secure: GLOBAL_COOKIES.DOMAIN.OPTIONS.secure,
      sameSite: GLOBAL_COOKIES.DOMAIN.OPTIONS.sameSite,
    }
  );
  response.cookies.set(
    GLOBAL_COOKIES.AUTH.TOKEN.KEY,
    JSON.stringify(tokenData),
    {
      maxAge: GLOBAL_COOKIES.AUTH.TOKEN.OPTIONS.maxAge,
      path: GLOBAL_COOKIES.AUTH.TOKEN.OPTIONS.path,
      httpOnly: GLOBAL_COOKIES.AUTH.TOKEN.OPTIONS.httpOnly,
      secure: GLOBAL_COOKIES.AUTH.TOKEN.OPTIONS.secure,
      sameSite: GLOBAL_COOKIES.AUTH.TOKEN.OPTIONS.sameSite,
    }
  );


  return response;
}

/**
 * Lấy token từ httpOnly cookie (server-side only)
 * Note: Chỉ hoạt động trong request context (API routes, Server Components)
 * @returns IToken | null
 */
export async function getToken(): Promise<IToken | null> {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const raw = cookieStore.get(GLOBAL_COOKIES.AUTH.TOKEN.KEY)?.value;

    if (!raw) {
      return null;
    }

    const tokenData = JSON.parse(raw) as IToken;
    return tokenData;
  } catch (error) {
    // Nếu không có request context, cookies() sẽ throw error
    // Trong trường hợp này, return null thay vì log error
    if ((error as any)?.message?.includes("request scope")) {
      return null;
    }
    console.error(
      "[getToken] Failed to parse token cookie:",
      error
    );
    return null;
  }
}

/**
 * Lấy domain từ httpOnly cookie (server-side only)
 * Note: Chỉ hoạt động trong request context (API routes, Server Components)
 * @returns string | null
 */
export async function getDomain(): Promise<string | null> {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const raw = cookieStore.get(GLOBAL_COOKIES.DOMAIN.KEY)?.value;

    return raw || null;
  } catch (error) {
    if ((error as any)?.message?.includes("request scope")) {
      return null;
    }
    console.error("[getDomain] Failed to get domain cookie:", error);
    return null;
  }
}



/**
 * Lấy user từ cookie (server-side only)
 * Note: Chỉ hoạt động trong request context (API routes, Server Components)
 * @returns IUser | null
 */
export async function getUserFromServerCookie(): Promise<IUser | null> {
  return null;

}

/**
 * Lấy token từ NextRequest (Edge runtime compatible - dùng trong middleware/API routes)
 * @param request - NextRequest instance
 * @returns IToken | null
 */
export function getTokenFromNextRequest(request: NextRequest): IToken | null {
  try {
    const raw = request.cookies.get(GLOBAL_COOKIES.AUTH.TOKEN.KEY)?.value;

    if (!raw) {
      return null;
    }

    const tokenData = JSON.parse(raw) as IToken;
    return tokenData;
  } catch (error) {
    console.error(
      "[getTokenFromNextRequest] Failed to parse token cookie:",
      error
    );
    return null;
  }
}






export { GLOBAL_COOKIES };
