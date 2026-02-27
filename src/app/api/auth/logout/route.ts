import {  NextResponse } from "next/server";
import { GLOBAL_COOKIES } from "@/data/utils/cookie";
import { getErrorInfo } from "@/exceptions";

export const runtime = "edge";

export async function DELETE() {
  try {
    const res = NextResponse.json({ success: true }, { status: 200 });

    // Xóa TOKEN cookie (httpOnly: true)
    res.cookies.set(GLOBAL_COOKIES.AUTH.TOKEN.KEY, "", {
      maxAge: 0,
      path: GLOBAL_COOKIES.AUTH.TOKEN.OPTIONS.path,
      httpOnly: GLOBAL_COOKIES.AUTH.TOKEN.OPTIONS.httpOnly,
      secure: GLOBAL_COOKIES.AUTH.TOKEN.OPTIONS.secure,
      sameSite: GLOBAL_COOKIES.AUTH.TOKEN.OPTIONS.sameSite,
    });
    res.cookies.set(GLOBAL_COOKIES.DOMAIN.KEY, "", {
      maxAge: 0,
      path: GLOBAL_COOKIES.DOMAIN.OPTIONS.path,
      httpOnly: GLOBAL_COOKIES.DOMAIN.OPTIONS.httpOnly,
      secure: GLOBAL_COOKIES.DOMAIN.OPTIONS.secure,
      sameSite: GLOBAL_COOKIES.DOMAIN.OPTIONS.sameSite,
    });

    return res;
  } catch (error) {
    const { message, status } = getErrorInfo(error);
    return NextResponse.json({ error: message }, { status: status });
  }
}
