import PartnerDetailClient from "./client";

export const runtime = "edge";

export default async function PartnerDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const resolvedParams = await params;
    return <PartnerDetailClient params={resolvedParams} />
}