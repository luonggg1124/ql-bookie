 "use client";

import { useEffect, useState } from "react";
import { CalendarIcon, Filter, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QUICK_FILTER_OPTIONS = [
  { value: "day", label: "Hôm nay", days: 0 },
  { value: "week", label: "7 ngày qua", days: 7 },
  { value: "month", label: "30 ngày qua", days: 30 },
] as const;

const ACTIVE_OPTIONS = [
    {value: "2", label: "Tất cả"},
    {value: "1", label: "Hoạt động"},
    {value: "0", label: "Không hoạt động"}
] as const;

const WARNING_QUOTA_OPTIONS = [
    {value: "0", label: "Không có cảnh báo"},
    {value: "1", label: "Có cảnh báo"},
    {value: "2", label: "Tất cả"},
] as const;

type FilterPreset = (typeof QUICK_FILTER_OPTIONS)[number];

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatDateDisplay(dateStr: string): string {
  if (!dateStr || dateStr.length < 10) return dateStr || "";
  const [y, m, d] = dateStr.slice(0, 10).split("-");
  return d && m && y ? `${d}-${m}-${y}` : dateStr;
}

function parseDdMmYyyy(str: string): string | null {
  const s = str.trim().replace(/\//g, "-").replace(/\./g, "-");
  const parts = s.split("-").filter(Boolean);
  if (parts.length !== 3) return null;
  const [d, m, y] = parts;
  if (!d || !m || !y || d.length !== 2 || m.length !== 2 || y.length !== 4) {
    return null;
  }
  const day = parseInt(d, 10);
  const month = parseInt(m, 10);
  const year = parseInt(y, 10);
  if (!Number.isFinite(day) || !Number.isFinite(month) || !Number.isFinite(year)) {
    return null;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return `${year}-${m}-${d}`;
}

function getDateRangeForPreset(preset: FilterPreset): { from: string; to: string } {
  const now = new Date();

  // to = tomorrow so "today" includes full day on backends that do inclusive filters
  const to = new Date(now);
  to.setDate(to.getDate() + 1);

  const from = new Date(now);
  from.setDate(from.getDate() - preset.days);

  return {
    from: toLocalDateString(from),
    to: toLocalDateString(to),
  };
}

export type PartnerFilterState = {
  search: string;
  typeOfBusiness: string;
  active: number;
  warningQuota: number;
  from: string;
  to: string;
  preset: FilterPreset;
  showFilters: boolean;
  localFrom: string;
  localTo: string;
};

export function getInitialPartnerFilterState(): PartnerFilterState {
  const defaultRange = getDateRangeForPreset(QUICK_FILTER_OPTIONS[1]);
  return {
    search: "",
    typeOfBusiness: "0",
    active: 2,
    warningQuota: 2,
    ...defaultRange,
    preset: QUICK_FILTER_OPTIONS[1],
    showFilters: false,
    localFrom: defaultRange.from,
    localTo: defaultRange.to,
  };
}

type Props = {
  filters: PartnerFilterState;
  onFilterChange: (next: Partial<PartnerFilterState>) => void;
};

export default function PartnerFilter({ filters, onFilterChange }: Props) {
  const [draft, setDraft] = useState<PartnerFilterState>(filters);
  const [inputFrom, setInputFrom] = useState(formatDateDisplay(filters.localFrom));
  const [inputTo, setInputTo] = useState(formatDateDisplay(filters.localTo));

  useEffect(() => {
    setDraft(filters);
    setInputFrom(formatDateDisplay(filters.localFrom));
    setInputTo(formatDateDisplay(filters.localTo));
  }, [filters]);

  const handleTimeFilterChange = (preset: FilterPreset) => {
    const range = getDateRangeForPreset(preset);
    setDraft((prev) => ({
      ...prev,
      ...range,
      preset,
      localFrom: range.from,
      localTo: range.to,
    }));
    setInputFrom(formatDateDisplay(range.from));
    setInputTo(formatDateDisplay(range.to));
  };

  const handleApplyCustomRange = () => {
    onFilterChange({
      search: draft.search,
      typeOfBusiness: draft.typeOfBusiness,
      active: draft.active,
      warningQuota: draft.warningQuota,
      from: draft.localFrom,
      to: draft.localTo,
      preset: draft.preset,
      localFrom: draft.localFrom,
      localTo: draft.localTo,
      showFilters: false,
    });
  };

  return (
    <div className="flex items-center justify-end">
      <Popover
        open={filters.showFilters}
        onOpenChange={(open) => onFilterChange({ showFilters: open })}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "gap-2",
              filters.showFilters ? "border-blue-500 bg-blue-50" : undefined
            )}
          >
            <Settings className={cn("h-4 w-4", filters.showFilters && "text-blue-600")} />
            Bộ lọc
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[92vw] max-w-[420px] p-0" align="end">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Filter className="h-5 w-5 text-blue-600" />
              </div>
              <div className="font-semibold">Bộ lọc</div>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <Label>Tìm kiếm</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo tên, địa chỉ, email, SĐT..."
                  value={draft.search}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="pl-9 w-full"
                />
              </div>
            </div>

            {/* Active */}
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select
                value={String(draft.active ?? 2)}
                onValueChange={(v) => {
                  const n = Number.parseInt(v, 10);
                  setDraft((prev) => ({ ...prev, active: Number.isNaN(n) ? 2 : n }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Warning quota */}
            <div className="space-y-2">
              <Label>Cảnh báo quota</Label>
              <Select
                value={String(draft.warningQuota ?? 2)}
                onValueChange={(v) => {
                  const n = Number.parseInt(v, 10);
                  setDraft((prev) => ({
                    ...prev,
                    warningQuota: Number.isNaN(n) ? 2 : n,
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn cảnh báo quota" />
                </SelectTrigger>
                <SelectContent>
                  {WARNING_QUOTA_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date preset */}
            <div className="space-y-2">
              <Label>Lọc theo ngày</Label>
              <div className="flex flex-wrap gap-2">
                {QUICK_FILTER_OPTIONS.map((opt) => (
                  <Button
                    key={opt.value}
                      variant={draft.preset.value === opt.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeFilterChange(opt)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Từ ngày (dd/mm/yyyy)</Label>
                <Input
                  value={inputFrom}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInputFrom(val);
                    const parsed = parseDdMmYyyy(val);
                    if (parsed) setDraft((prev) => ({ ...prev, localFrom: parsed }));
                  }}
                  placeholder="dd/mm/yyyy"
                />
              </div>
              <div className="space-y-2">
                <Label>Đến ngày (dd/mm/yyyy)</Label>
                <Input
                  value={inputTo}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInputTo(val);
                    const parsed = parseDdMmYyyy(val);
                    if (parsed) setDraft((prev) => ({ ...prev, localTo: parsed }));
                  }}
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>

            <Button className="w-full" onClick={handleApplyCustomRange}>
              <CalendarIcon className="h-4 w-4 mr-2" />
              Áp dụng
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

