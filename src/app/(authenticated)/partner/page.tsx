"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UsePartnerInfinite } from "@/data/@client/partner";
import PartnerDataTable from "./components/data-table";
import PartnerFilter, {
  getInitialPartnerFilterState,
  type PartnerFilterState,
} from "./components/filter";
import Link from "next/link";
import paths from "@/paths";

export default function PartnerPage() {
  const [filters, setFilters] = useState<PartnerFilterState>(() => ({
    search: "",
    typeOfBusiness: "",
    active: 2,
    warningQuota: 2,
    from: "",
    to: "",
    preset: { value: "week", label: "7 ngày qua", days: 7 },
    showFilters: false,
    localFrom: "",
    localTo: "",
  }));
  const [mounted, setMounted] = useState(false);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setFilters(getInitialPartnerFilterState());
  }, []);

  const {
    data: partners,
    loading,
    hasNextPage,
    fetchNextPage,
    fetchingNextPage,
  } = UsePartnerInfinite({
    page: 1,
    pageSize: 10,
    typeOfBusiness: filters.typeOfBusiness === "0" ? "" : filters.typeOfBusiness,
    search: filters.search,
    from: filters.from,
    to: filters.to,
    typeOfFilterDate: "0",
    active: String(filters.active),
    warningQuota: String(filters.warningQuota),
  });

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !fetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const current = observerTarget.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasNextPage, fetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Danh sách đối tác
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Quản lý bệnh viện và phòng khám đối tác
          </p>
        </div>
        <Link href={paths.partner.create.path}>
          <Button size="sm" className="w-fit shrink-0">
            <Plus className="size-4" />
            Thêm đối tác
          </Button>
        </Link>
      </div>

      <PartnerFilter
        filters={filters}
        onFilterChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
      />

      <PartnerDataTable data={partners} loading={!mounted || loading} />

      {hasNextPage && (
        <div
          ref={observerTarget}
          className="h-8 flex items-center justify-center text-xs text-muted-foreground"
        >
          {fetchingNextPage ? "Đang tải thêm..." : ""}
        </div>
      )}
    </div>
  );
}

