import { getMyPermission, refreshUser } from "@/data/@server/auth";
import { getDomain, getToken, setAuthCookies } from "@/data/utils/cookie";
import { getErrorInfo } from "@/exceptions";
import {  NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
    try {
        const tokenData = await getToken();
        const domain = await getDomain();
        const data = await refreshUser({
            body: {
                refreshToken: tokenData?.refresh.value || "",
                domain: domain || "",

            }
        });

        const permissions = await getMyPermission({
            params: {
                domain: domain || "",
            },
            headers: {
                accessToken: data.accessToken.value,
            },
        });
        
        const res = NextResponse.json({ user: data.user, permissions }, { status: 201 });
        return setAuthCookies(res, {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user,
        });

    } catch (error) {
        const { message, status } = getErrorInfo(error);
        return NextResponse.json({ error: message }, { status });
    }
}
