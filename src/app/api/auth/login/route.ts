import { getMyPermission, login } from "@/data/@server/auth";
import { getErrorInfo, throwExceptionByStatus } from "@/exceptions";
import { setAuthCookies } from "@/data/utils/cookie";
import { NextRequest, NextResponse } from "next/server";
import { validate } from "./request";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      throwExceptionByStatus(400, "Invalid body");
    }

    // Chuẩn hóa domain: loại bỏ toàn bộ dấu cách
    if (typeof body.domain === "string") {
      body.domain = body.domain.replace(/\s+/g, "");
    }
    if (typeof body.username === "string") {
      body.username = body.username.replace(/\s+/g, "");
    }

    validate(body);
    const auth = await login({
      data: {
        username: body.username,
        password: body.password,
        rememberMe: body?.rememberMe ? true : false,
        domain: body.domain,
      },
    });

    const permissions = await getMyPermission({
      params: {
        domain: body.domain,
      },
      headers: {
        accessToken: auth.accessToken.value,
      },
    });

    const res = NextResponse.json({ user: auth.user, permissions }, { status: 201 });

    // Set auth cookies sử dụng helper function
    setAuthCookies(res, {
      accessToken: {
        value: auth.accessToken.value,
        expiresAt: auth.accessToken.expiresAt,
      },
      refreshToken: {
        value: auth.refreshToken.value,
      },
      user: auth.user,
    });

    return res;
  } catch (error) {
    const { message, status } = getErrorInfo(error);

    return NextResponse.json(
      { error: message },
      {
        status: status,
      }
    );
  }
}
