import { getSubscriptionType } from "@/data/@server/scription-type";
import { getErrorInfo } from "@/exceptions";
import { NextRequest, NextResponse } from "next/server";


export const runtime = "edge";

export async function GET(request: NextRequest, { params }: { params: Promise<{ domain: string }> }) {
    try {
        const { domain } = await params;
        const data = await getSubscriptionType({ params: { domain: domain } });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        const errorInfo = getErrorInfo(error);
        return NextResponse.json({ error: errorInfo.message }, { status: errorInfo.status });
    }
}