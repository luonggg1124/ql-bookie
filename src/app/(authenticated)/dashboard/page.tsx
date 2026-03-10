"use client";

import { useMemo } from "react";
import {
  CalendarCheck,
  Building2,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chart from "@/components/custom/chart";

const statCards = [
  {
    title: "Đặt lịch trong tháng",
    value: "1.284",
    change: "+12%",
    trend: "up" as const,
    description: "So với tháng trước",
    icon: CalendarCheck,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Đối tác hoạt động",
    value: "24",
    change: "+2",
    trend: "up" as const,
    description: "Bệnh viện & phòng khám",
    icon: Building2,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Doanh thu tháng",
    value: "₫ 48,2M",
    change: "-3%",
    trend: "down" as const,
    description: "So với tháng trước",
    icon: TrendingUp,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Tỷ lệ hoàn thành",
    value: "94%",
    change: "+1.2%",
    trend: "up" as const,
    description: "Lịch đã khám xong",
    icon: CheckCircle2,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-500/10",
  },
];

export default function DashboardPage() {
  const areaChartOptions = useMemo(
    () => ({
      chart: {
        type: "area" as const,
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: "inherit",
      },
      series: [
        {
          name: "Đặt lịch",
          data: [31, 42, 38, 55, 48, 62, 58],
        },
      ],
      xaxis: {
        categories: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        labels: { style: { fontSize: "12px" } },
      },
      yaxis: {
        labels: { style: { fontSize: "12px" } },
      },
      colors: ["#3b82f6"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
        },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" as const, width: 2 },
      grid: {
        borderColor: "hsl(var(--border))",
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
      },
      tooltip: {
        theme: "light",
        x: { format: "dd/MM" },
      },
    }),
    []
  );

  const barChartOptions = useMemo(
    () => ({
      chart: {
        type: "bar" as const,
        toolbar: { show: false },
        fontFamily: "inherit",
      },
      series: [
        {
          name: "Lượt đặt",
          data: [120, 98, 156, 87, 134, 72, 109],
        },
      ],
      xaxis: {
        categories: [
          "BV 108",
          "Bạch Mai",
          "Chợ Rẫy",
          "PK Quốc tế",
          "PK Sài Gòn",
          "BV E",
          "BV F",
        ],
        labels: {
          style: { fontSize: "11px" },
          maxWidth: 60,
        },
      },
      yaxis: {
        labels: { style: { fontSize: "12px" } },
      },
      colors: ["#10b981"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: "60%",
        },
      },
      dataLabels: { enabled: false },
      grid: {
        borderColor: "hsl(var(--border))",
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
      },
      tooltip: {
        theme: "light",
      },
    }),
    []
  );

  const donutChartOptions = useMemo(
    () => ({
      chart: {
        type: "donut" as const,
        fontFamily: "inherit",
      },
      series: [completed, confirmed, pending, cancelled],
      labels: ["Đã khám", "Đã xác nhận", "Chờ xác nhận", "Đã hủy"],
      colors: ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"],
      legend: {
        position: "bottom" as const,
        fontSize: "12px",
        horizontalAlign: "center" as const,
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${Math.round(val)}%`,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Tổng",
                formatter: () => "1.284",
              },
            },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Tổng quan đặt lịch và đối tác
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <span
                className={`flex size-9 items-center justify-center rounded-lg ${stat.bgColor} ${stat.color}`}
              >
                <stat.icon className="size-4" />
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <ArrowDownRight className="size-3.5 text-red-600 dark:text-red-400" />
                )}
                <span
                  className={
                    stat.trend === "up"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }
                >
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Đặt lịch theo tuần</CardTitle>
            <p className="text-muted-foreground text-sm">
              Số lượt đặt lịch 7 ngày gần nhất
            </p>
          </CardHeader>
          <CardContent>
            <Chart options={areaChartOptions} height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Đặt lịch theo đối tác</CardTitle>
            <p className="text-muted-foreground text-sm">
              Top đối tác có lượt đặt trong tháng
            </p>
          </CardHeader>
          <CardContent>
            <Chart options={barChartOptions} height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Donut chart */}
      <Card className="lg:max-w-105">
        <CardHeader>
          <CardTitle>Phân bố trạng thái</CardTitle>
          <p className="text-muted-foreground text-sm">
            Theo trạng thái đặt lịch trong tháng
          </p>
        </CardHeader>
        <CardContent>
          <Chart options={donutChartOptions} height={320} />
        </CardContent>
      </Card>
    </div>
  );
}

// Dữ liệu cho donut (phần trăm)
const completed = 58;
const confirmed = 24;
const pending = 14;
const cancelled = 4;
