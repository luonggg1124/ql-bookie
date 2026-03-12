import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PartnerTableSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Skeleton className="h-5 w-30" />
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
            {Array.from({ length: 6 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell colSpan={7}>
                  <div className="flex items-center gap-3 py-2">
                    <Skeleton className="h-9 w-9 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-72" />
                      <Skeleton className="h-3 w-96" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

