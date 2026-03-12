import { createPartner, getPartner } from "@/data/@server/partner";
import { getErrorInfo } from "@/exceptions";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ domain: string }> }
) {
  try {
    const { domain } = await params;
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const typeOfBusiness = searchParams.get("typeOfBusiness") || "";
    const search = searchParams.get("search") || "";
    const typeOfFilterDate = searchParams.get("typeOfFilterDate") || "";
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const active = searchParams.get("active") ?? "";
    const warningQuota = searchParams.get("warningQuota") || "";

    const data = await getPartner({
      params: { domain: domain },
      queries: {
        page,
        pageSize,
        loaiHinhKinhDoanh: typeOfBusiness,
        search,
        typeOfFilterDate: Number(typeOfFilterDate),
        from,
        to,
        active: Number(active),
        warningQuota: Number(warningQuota),
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const { message, status } = getErrorInfo(error);
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ domain: string }> }
) {
  try {
    const { domain } = await params;
    const body = await request.json();

    const data = await createPartner({
      params: { domain: domain },
      body: {
        Activated: body.activated,
        Address: body.address,
        CurrentSubscriptionTypeId: body.currentSubscriptionTypeId,
        Domain: domain,
        Email: body.email,
        GoiSuDungZMA: body.zmaPackage,
        LoaiHinhKinhDoanh: body.typeOfBusiness,
        Mobile: body.mobile,
        Name: body.name,
        UseBookie: body.useBookie,
        UseCRM: body.useCRM,
        UseCommonPatientPortal: body.useCommonPatientPortal,
        Website: body.website,
        ZMAPackage: body.zmaPackage,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const { message, status } = getErrorInfo(error);
    return NextResponse.json({ error: message }, { status });
  }
}

