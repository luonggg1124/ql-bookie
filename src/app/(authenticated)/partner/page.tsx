"use client";

import { useState, useMemo } from "react";
import {
  Building2,
  Stethoscope,
  Search,
  Plus,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type PartnerType = "hospital" | "clinic";
export type PartnerStatus = "active" | "inactive";

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  address: string;
  phone: string;
  email: string;
  status: PartnerStatus;
  createdAt?: string;
}

const PARTNER_TYPE_LABEL: Record<PartnerType, string> = {
  hospital: "Bệnh viện",
  clinic: "Phòng khám",
};

const PARTNER_STATUS_LABEL: Record<PartnerStatus, string> = {
  active: "Hoạt động",
  inactive: "Tạm dừng",
};

// Dữ liệu mẫu
const MOCK_PARTNERS: Partner[] = [
  {
    id: "1",
    name: "Bệnh viện Đa khoa Trung ương Quân đội 108",
    type: "hospital",
    address: "Số 1 Trần Hưng Đạo, Hai Bà Trưng, Hà Nội",
    phone: "024 6278 4129",
    email: "contact@bv108.vn",
    status: "active",
  },
  {
    id: "2",
    name: "Bệnh viện Bạch Mai",
    type: "hospital",
    address: "78 Giải Phóng, Đống Đa, Hà Nội",
    phone: "024 3869 3731",
    email: "info@bachmai.gov.vn",
    status: "active",
  },
  {
    id: "3",
    name: "Phòng khám Đa khoa Quốc tế",
    type: "clinic",
    address: "286 Thụy Khuê, Tây Hồ, Hà Nội",
    phone: "024 3719 9899",
    email: "pk@clinic.vn",
    status: "active",
  },
  {
    id: "4",
    name: "Phòng khám Nội tổng hợp Sài Gòn",
    type: "clinic",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    phone: "028 3822 5566",
    email: "lienhe@pk-saigon.vn",
    status: "inactive",
  },
  {
    id: "5",
    name: "Bệnh viện Chợ Rẫy",
    type: "hospital",
    address: "201B Nguyễn Chí Thanh, Quận 5, TP.HCM",
    phone: "028 3855 4137",
    email: "contact@choray.vn",
    status: "active",
  },
];

export default function PartnerPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<PartnerType | "all">("all");

  const filteredPartners = useMemo(() => {
    return MOCK_PARTNERS.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search);
      const matchType =
        typeFilter === "all" || p.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [search, typeFilter]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Danh sách đối tác
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Quản lý bệnh viện và phòng khám đối tác
          </p>
        </div>
        <Button size="sm" className="w-fit shrink-0">
          <Plus className="size-4" />
          Thêm đối tác
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm theo tên, địa chỉ, email, SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as PartnerType | "all")}
        >
          <SelectTrigger className="w-full sm:w-45">
            <SelectValue placeholder="Loại đối tác" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại</SelectItem>
            <SelectItem value="hospital">Bệnh viện</SelectItem>
            <SelectItem value="clinic">Phòng khám</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {filteredPartners.length} đối tác
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-55">Tên</TableHead>
                <TableHead className="w-30">Loại</TableHead>
                <TableHead className="min-w-50">Địa chỉ</TableHead>
                <TableHead className="w-32.5">Điện thoại</TableHead>
                <TableHead className="min-w-45">Email</TableHead>
                <TableHead className="w-25">Trạng thái</TableHead>
                <TableHead className="w-17.5 text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-muted-foreground h-24 text-center"
                  >
                    Không tìm thấy đối tác nào.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPartners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="whitespace-normal align-top max-w-[320px]">
                      <div className="flex items-start gap-2">
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-lg",
                            partner.type === "hospital"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          )}
                        >
                          {partner.type === "hospital" ? (
                            <Building2 className="size-4" />
                          ) : (
                            <Stethoscope className="size-4" />
                          )}
                        </span>
                        <span className="min-w-0 wrap-break-word font-medium">
                          {partner.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          partner.type === "hospital" ? "default" : "secondary"
                        }
                        className={cn(
                          partner.type === "clinic" &&
                            "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-500/20"
                        )}
                      >
                        {PARTNER_TYPE_LABEL[partner.type]}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-normal align-top max-w-70">
                      <div className="flex items-start gap-1.5 text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0 mt-0.5" />
                        <span className="min-w-0 wrap-break-word">
                          {partner.address}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Phone className="text-muted-foreground size-3.5 shrink-0" />
                        {partner.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Mail className="text-muted-foreground size-3.5 shrink-0" />
                        <span className="truncate">{partner.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          partner.status === "active"
                            ? "border-green-500/50 text-green-700 dark:text-green-400"
                            : "border-amber-500/50 text-amber-700 dark:text-amber-400"
                        )}
                      >
                        {PARTNER_STATUS_LABEL[partner.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-xs">
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Mở menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
