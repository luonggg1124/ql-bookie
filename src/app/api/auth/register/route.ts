import { getErrorInfo } from "@/exceptions";
import {NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  try {
    return NextResponse.json(
      { message: "Tính năng đang chờ phát triển" },
      { status: 201 }
    );
  } catch (error) {
    const { message, status } = getErrorInfo(error);
    return NextResponse.json({ error: message }, { status });
  }
}
