// ============================================
// 발주 관리 페이지
// → 전체 발주 목록 조회
// → 상태 변경 (발주접수 → 확인 → 출고대기 → 출고완료 → 배송완료)
// → 발주 상세 보기 다이얼로그
// ============================================

"use client";

import { useState } from "react";
import {
  mockOrders,
  ORDER_STATUS_LIST,
  type Order,
  type OrderStatus,
  formatPrice,
} from "@/data/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 상태별 뱃지 색상
function statusBadge(status: OrderStatus) {
  const colors: Record<OrderStatus, string> = {
    "발주접수": "bg-gray-500",
    "확인": "bg-blue-500",
    "출고대기": "bg-yellow-500",
    "출고완료": "bg-purple-500",
    "배송완료": "bg-green-600",
  };
  return <Badge className={colors[status]}>{status}</Badge>;
}

export default function AdminOrdersPage() {
  // 발주 목록
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  // 상세 보기 다이얼로그
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // 필터: 상태별
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // 필터링된 발주 목록
  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  // 상태 변경
  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );
  }

  // 상세 보기
  function handleDetail(order: Order) {
    setDetailOrder(order);
    setDetailOpen(true);
  }

  // 요약 통계 계산
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "발주접수").length,
    confirmed: orders.filter((o) => o.status === "확인").length,
    shipping: orders.filter(
      (o) => o.status === "출고대기" || o.status === "출고완료"
    ).length,
    completed: orders.filter((o) => o.status === "배송완료").length,
    totalAmount: orders.reduce((sum, o) => sum + o.totalPrice, 0),
  };

  return (
    <div>
      {/* 페이지 제목 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">발주 관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          발주 접수, 확인, 출고, 배송 상태 관리
        </p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              전체 발주
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              접수 대기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {stats.pending}건
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              확인 완료
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.confirmed}건
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              출고 진행
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.shipping}건
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              총 발주 금액
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(stats.totalAmount)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 필터 */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm font-medium">상태 필터:</span>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            {ORDER_STATUS_LIST.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filteredOrders.length}건 표시 중
        </span>
      </div>

      {/* 발주 목록 테이블 */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>발주번호</TableHead>
              <TableHead>업체명</TableHead>
              <TableHead>제품 모델명</TableHead>
              <TableHead className="text-right">수량</TableHead>
              <TableHead className="text-right">단가</TableHead>
              <TableHead className="text-right">총액</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>발주일</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono">{order.id}</TableCell>
                <TableCell className="font-medium">
                  {order.companyName}
                </TableCell>
                <TableCell className="font-mono">
                  {order.productName}
                </TableCell>
                <TableCell className="text-right">{order.quantity}대</TableCell>
                <TableCell className="text-right">
                  {formatPrice(order.unitPrice)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatPrice(order.totalPrice)}
                </TableCell>

                {/* 상태 변경 드롭다운 */}
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleStatusChange(order.id, value as OrderStatus)
                    }
                  >
                    <SelectTrigger className="w-28 h-8">
                      <SelectValue>
                        {statusBadge(order.status)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUS_LIST.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>{order.orderedAt}</TableCell>

                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDetail(order)}
                  >
                    상세
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 발주 상세 다이얼로그 */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>발주 상세 정보</DialogTitle>
          </DialogHeader>

          {detailOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">발주번호</p>
                  <p className="font-mono font-medium">{detailOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">상태</p>
                  <p>{statusBadge(detailOrder.status)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">업체명</p>
                  <p className="font-medium">{detailOrder.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">발주일</p>
                  <p>{detailOrder.orderedAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">제품 모델명</p>
                  <p className="font-mono">{detailOrder.productName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">수량</p>
                  <p className="font-medium">{detailOrder.quantity}대</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">단가</p>
                  <p>{formatPrice(detailOrder.unitPrice)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">총액</p>
                  <p className="font-bold text-lg">
                    {formatPrice(detailOrder.totalPrice)}
                  </p>
                </div>
              </div>

              {/* 비고 */}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-1">비고</p>
                <p>{detailOrder.note || "-"}</p>
              </div>

              {/* 상태 변경 진행도 */}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  진행 상태
                </p>
                <div className="flex items-center gap-1">
                  {ORDER_STATUS_LIST.map((status, index) => {
                    const currentIndex = ORDER_STATUS_LIST.indexOf(
                      detailOrder.status
                    );
                    const isCompleted = index <= currentIndex;
                    return (
                      <div key={status} className="flex items-center">
                        <div
                          className={`px-3 py-1 rounded text-xs font-medium ${
                            isCompleted
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {status}
                        </div>
                        {index < ORDER_STATUS_LIST.length - 1 && (
                          <div
                            className={`w-4 h-0.5 ${
                              index < currentIndex
                                ? "bg-primary"
                                : "bg-muted"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
