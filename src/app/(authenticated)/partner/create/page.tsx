"use client";

import BreadcrumbManager from "@/layouts/_common_/breadcrumb";
import paths from "@/paths";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useSubscriptionTypes } from "@/data/@client/scription-type";
import { useCreatePartner } from "@/data/@client/partner";
import type { ISubscriptionType } from "@/data/models/scription-type";

type PartnerCreateFormState = {
  domain: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  businessType: string;
  zmaPackage: number | "";
  subscriptionCode: string;
};

const partnerCreateSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên công ty"),
  domain: z.string().trim().min(1, "Vui lòng nhập domain"),
  phone: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || z.string().email().safeParse(v).success, "Email không hợp lệ"),
  website: z.string().trim().optional(),
  businessType: z.string().trim().optional(),
  address: z.string().trim().optional(),
  subscriptionCode: z.string().trim().min(1, "Vui lòng chọn Subscription Type"),
  zmaPackage: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? 0 : Number(v)),
    z.number().nonnegative("Gói ZMA phải >= 0")
  ),
});

export default function PartnerCreatePage() {
  const [active, setActive] = useState(true);
  const [useBookie, setUseBookie] = useState(false);
  const [useCrm, setUseCrm] = useState(false);
  const [usePatientPortal, setUsePatientPortal] = useState(false);

  const [form, setForm] = useState<PartnerCreateFormState>({
    domain: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    businessType: "",
    zmaPackage: "",
    subscriptionCode: "",
  });

  const { data: subscriptionTypes, loading: subLoading } = useSubscriptionTypes();
  const { mutate: createPartner, loading: isCreating } = useCreatePartner();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = partnerCreateSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ");
      return;
    }

    // Find subscription type ID from code
    const subscriptionTypesArray = subscriptionTypes as ISubscriptionType[] | undefined;
    const selectedSubscription = subscriptionTypesArray?.find(
      (item: ISubscriptionType) => item.code === form.subscriptionCode
    );
    // (Defensive) subscriptionCode đã được validate bởi zod, nhưng vẫn check phòng khi list chưa load
    if (!selectedSubscription) {
      toast.error("Subscription Type không hợp lệ");
      return;
    }

    createPartner(
      {
        activated: active,
        address: parsed.data.address?.trim() || "",
        currentSubscriptionTypeId: selectedSubscription.id,
        email: parsed.data.email?.trim() || "",
        typeOfBusiness: parsed.data.businessType?.trim() || "",
        mobile: parsed.data.phone?.trim() || "",
        name: parsed.data.name.trim(),
        useBookie,
        useCRM: useCrm,
        useCommonPatientPortal: usePatientPortal,
        website: parsed.data.website?.trim() || "",
        zmaPackage: parsed.data.zmaPackage,
      },
      {
        onSuccess: () => {
          toast.success("Tạo đối tác thành công");
          router.push(paths.partner.index.path);
        },
        onError: (error) => {
          toast.error(error?.message || "Lỗi khi tạo đối tác");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbManager
        items={[
          {
            title: paths.partner.index.title,
            href: paths.partner.index.path,
          },
          {
            title: paths.partner.create.title,
            href: paths.partner.create.path,
          },
        ]}
      />

      <Card>
        <CardHeader className="">
          <CardTitle className="text-base">Thêm đối tác mới</CardTitle>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Tên công ty <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="Tên công ty"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>
                Domain <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="VD: example.com"
                value={form.domain}
                onChange={(e) => setForm((p) => ({ ...p, domain: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Số điện thoại</Label>
              <Input
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                placeholder="Website"
                value={form.website}
                onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
              />
            </div>
        
            <div className="space-y-2">
              <Label>Loại hình kinh doanh</Label>
              <Input
                placeholder="Nhập loại hình kinh doanh (ví dụ: Phòng khám, Bệnh viện...)"
                value={form.businessType}
                onChange={(e) =>
                  setForm((p) => ({ ...p, businessType: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Địa chỉ</Label>
              <Textarea
                placeholder="Địa chỉ"
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Subscription Type (Code - Name)</Label>
              <Select
                value={form.subscriptionCode}
                onValueChange={(v) => setForm((p) => ({ ...p, subscriptionCode: v }))}
                disabled={subLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={subLoading ? "Đang tải..." : "Chọn Subscription Type"} />
                </SelectTrigger>
                <SelectContent>
                  {(subscriptionTypes as ISubscriptionType[] | undefined)?.map(
                    (item) => (
                      <SelectItem key={item.id} value={item.code}>
                        {item.code} - {item.name}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Gói ZMA</Label>
              <Input
                type="number"
                placeholder="0"
                value={form.zmaPackage}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    zmaPackage: e.target.value === "" ? "" : Number(e.target.value),
                  }))
                }
              />
            </div>

            {/* Trạng thái & các tùy chọn sử dụng */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:col-span-2">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="space-y-0.5">
                  <div className="text-sm">
                    Trạng thái: {active ? "Hoạt động" : "Không hoạt động"}
                  </div>
                </div>
                <Switch checked={active} onCheckedChange={setActive} />
              </div>

              <label className="flex items-center justify-between rounded-md border p-3 text-sm">
                <span>Sử dụng Bookie</span>
                <Switch checked={useBookie} onCheckedChange={setUseBookie} size="sm" />
              </label>
              <label className="flex items-center justify-between rounded-md border p-3 text-sm">
                <span>Sử dụng CRM</span>
                <Switch checked={useCrm} onCheckedChange={setUseCrm} size="sm" />
              </label>
              <label className="flex items-center justify-between rounded-md border p-3 text-sm">
                <span>Sử dụng Patient Portal</span>
                <Switch
                  checked={usePatientPortal}
                  onCheckedChange={setUsePatientPortal}
                  size="sm"
                />
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 md:col-span-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
                disabled={isCreating}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Đang tạo..." : "Lưu"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}