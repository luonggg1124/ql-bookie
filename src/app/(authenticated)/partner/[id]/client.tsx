type PartnerDetailClientProps = {
    params: { id: string }
}
export default function PartnerDetailClient({ params }: PartnerDetailClientProps) {

    return <div>PartnerDetailClient {params.id}</div>
}