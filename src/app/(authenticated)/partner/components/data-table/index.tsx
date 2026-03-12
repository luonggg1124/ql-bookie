import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PartnerTableSkeleton } from "./skeleton-table";
import { IPartner } from "@/data/models/partner";

type Props = {
    data: IPartner[];
    loading?: boolean;
};

export default function PartnerDataTable({ data, loading }: Props) {
    if (loading) {
        return <PartnerTableSkeleton />;
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">{data.length} đối tác</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-55">Tên</TableHead>
                            <TableHead className="w-30">Loại</TableHead>
                            <TableHead className="min-w-50 hidden md:table-cell">Địa chỉ</TableHead>
                            <TableHead className="w-32.5">Điện thoại</TableHead>
                            <TableHead className="min-w-45 hidden lg:table-cell">Email</TableHead>
                            <TableHead className="w-25">Trạng thái</TableHead>
                            <TableHead className="w-17.5 text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-muted-foreground h-24 text-center"
                                >
                                    Không tìm thấy đối tác nào.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((partner) => (
                                <TableRow key={partner.id}>
                                    <TableCell className="whitespace-normal align-top max-w-[320px]">
                                        <div className="flex items-start gap-2">
                                            {partner.logoUrl ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={partner.logoUrl}
                                                    alt={partner.name ? `${partner.name} logo` : "Partner logo"}
                                                    className="mt-0.5 h-8 w-8 shrink-0 rounded-md object-cover border bg-muted"
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer"
                                                    onError={(e) => {
                                                        // hide broken images
                                                        (e.currentTarget as HTMLImageElement).style.display = "none";
                                                    }}
                                                />
                                            ) : (
                                                <div className="mt-0.5 h-8 w-8 shrink-0 rounded-md border bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                                                    {(partner.name || "?").trim().charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <span className="min-w-0 wrap-break-word font-medium">
                                                {partner.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            partner.businessType === "" ? (
                                                <span>-</span>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-500/20"
                                                >
                                                    {partner.businessType}
                                                </Badge>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell className="whitespace-normal align-top max-w-70 hidden md:table-cell">
                                        <div className="flex items-start gap-1.5 text-muted-foreground">
                                            <MapPin className="size-3.5 shrink-0 mt-0.5" />
                                            <span className="min-w-0 wrap-break-word">{partner.address || "-"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <Phone className="text-muted-foreground size-3.5 shrink-0" />
                                            {partner.mobile || "-"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <div className="flex items-center gap-1.5">
                                            <Mail className="text-muted-foreground size-3.5 shrink-0" />
                                            <span className="truncate">{partner.email || "-"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {partner.activated ? (
                                            <Badge
                                                variant="outline"
                                                className="border-green-500/50 text-green-700 dark:text-green-400"
                                            >
                                                Hoạt động
                                            </Badge>
                                        ) : (
                                            <Badge
                                                variant="outline"
                                                className="border-red-500/50 text-red-700 dark:text-red-400"
                                            >
                                                Không hoạt động
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="col-span-1 flex items-center gap-1 justify-end">
                                            <button
                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                                                title="Chỉnh sửa"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive/10 h-8 w-8 p-0 text-destructive"
                                                title="Xóa"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

