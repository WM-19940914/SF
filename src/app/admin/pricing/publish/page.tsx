// ============================================
// 단가 공시 페이지
// → 업체 선택 → 해당 업체의 제품별 판매가 자동 계산
// → 계산 공식: 매입가 - 장려금금액 + 마진
// → 수동 조정 가능, "공시" 버튼으로 상태 변경
// ============================================

"use client";

import { useState, useMemo } from "react";
import {
  mockCompanies,
  mockProducts,
  mockIncentiveRates,
  mockCompanyIncentiveRates,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 제품별 공시 가격 데이터
interface PriceRow {
  productId: string;
  modelName: string;
  category: string;
  purchasePrice: number;      // 매입가
  totalIncentiveAmount: number; // 총 장려금 금액
  margin: number;              // 마진 금액
  calculatedPrice: number;     // 자동 계산 판매가
  adjustedPrice: number;       // 수동 조정 판매가
  isPublished: boolean;        // 공시 여부
}

export default function PublishPricePage() {
  // 선택된 업체 ID
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");

  // 기본 마진율 (%)
  const [marginRate, setMarginRate] = useState(5);

  // 공시 가격 데이터 (업체 선택 시 자동 계산)
  const [priceRows, setPriceRows] = useState<PriceRow[]>([]);

  // 수동 조정 중인 행
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState(0);

  // 선택된 업체의 장려금 반영비율 가져오기
  const selectedCompanyRate = useMemo(() => {
    return mockCompanyIncentiveRates.find(
      (cr) => cr.companyId === selectedCompanyId
    );
  }, [selectedCompanyId]);

  // 업체 선택 시 가격 자동 계산
  function handleCompanySelect(companyId: string) {
    setSelectedCompanyId(companyId);

    const companyRate = mockCompanyIncentiveRates.find(
      (cr) => cr.companyId === companyId
    );

    if (!companyRate) return;

    // 각 제품에 대해 판매가 계산
    const rows: PriceRow[] = mockProducts.map((product) => {
      // 장려금 금액 계산
      // = 매입가 × (각 장려금율 × 반영비율 / 10000)의 합계
      const incentiveAmount =
        product.purchasePrice *
        ((mockIncentiveRates.sellIn * companyRate.sellInRate +
          mockIncentiveRates.sellOut * companyRate.sellOutRate +
          mockIncentiveRates.quarterly * companyRate.quarterlyRate +
          mockIncentiveRates.yearly * companyRate.yearlyRate) /
          10000);

      const totalIncentive = Math.round(incentiveAmount);

      // 마진 금액
      const margin = Math.round(product.purchasePrice * (marginRate / 100));

      // 판매가 = 매입가 - 장려금 + 마진
      const calculatedPrice = product.purchasePrice - totalIncentive + margin;

      return {
        productId: product.id,
        modelName: product.modelName,
        category: product.category,
        purchasePrice: product.purchasePrice,
        totalIncentiveAmount: totalIncentive,
        margin,
        calculatedPrice,
        adjustedPrice: calculatedPrice,
        isPublished: false,
      };
    });

    setPriceRows(rows);
  }

  // 마진율 변경 시 재계산
  function handleMarginChange(newMarginRate: number) {
    setMarginRate(newMarginRate);

    if (!selectedCompanyId) return;

    const companyRate = mockCompanyIncentiveRates.find(
      (cr) => cr.companyId === selectedCompanyId
    );
    if (!companyRate) return;

    setPriceRows((prev) =>
      prev.map((row) => {
        const product = mockProducts.find((p) => p.id === row.productId)!;
        const margin = Math.round(product.purchasePrice * (newMarginRate / 100));
        const calculatedPrice = product.purchasePrice - row.totalIncentiveAmount + margin;
        return {
          ...row,
          margin,
          calculatedPrice,
          adjustedPrice: calculatedPrice,
        };
      })
    );
  }

  // 수동 가격 조정
  function startAdjust(row: PriceRow) {
    setEditingId(row.productId);
    setEditPrice(row.adjustedPrice);
  }

  function saveAdjust(productId: string) {
    setPriceRows(
      priceRows.map((r) =>
        r.productId === productId ? { ...r, adjustedPrice: editPrice } : r
      )
    );
    setEditingId(null);
  }

  // 전체 공시
  function handlePublishAll() {
    setPriceRows(priceRows.map((r) => ({ ...r, isPublished: true })));
    alert("모든 제품의 단가가 공시되었습니다!");
  }

  // 개별 공시/공시 취소
  function togglePublish(productId: string) {
    setPriceRows(
      priceRows.map((r) =>
        r.productId === productId
          ? { ...r, isPublished: !r.isPublished }
          : r
      )
    );
  }

  // 선택된 업체 이름
  const selectedCompanyName =
    mockCompanies.find((c) => c.id === selectedCompanyId)?.name || "";

  return (
    <div>
      {/* 페이지 제목 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">단가 공시</h1>
        <p className="text-sm text-muted-foreground mt-1">
          업체별 판매가를 계산하고 공시합니다
        </p>
      </div>

      {/* 업체 선택 + 마진율 설정 */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-6 items-end">
            {/* 업체 선택 */}
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">업체 선택</label>
              <Select
                value={selectedCompanyId}
                onValueChange={handleCompanySelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="업체를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {mockCompanies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name} ({company.grade}등급)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 마진율 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">기본 마진율</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  step="0.5"
                  value={marginRate}
                  onChange={(e) => handleMarginChange(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-muted-foreground">%</span>
              </div>
            </div>

            {/* 전체 공시 버튼 */}
            <Button
              onClick={handlePublishAll}
              disabled={priceRows.length === 0}
            >
              전체 공시
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 장려금 반영비율 요약 (업체 선택 시만 표시) */}
      {selectedCompanyRate && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {selectedCompanyName} - 장려금 반영비율
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6 text-sm">
              <div>
                셀인: <strong>{selectedCompanyRate.sellInRate}%</strong> 반영
                ({mockIncentiveRates.sellIn}% x {selectedCompanyRate.sellInRate}%)
              </div>
              <div>
                셀아웃: <strong>{selectedCompanyRate.sellOutRate}%</strong> 반영
                ({mockIncentiveRates.sellOut}% x {selectedCompanyRate.sellOutRate}%)
              </div>
              <div>
                분기: <strong>{selectedCompanyRate.quarterlyRate}%</strong> 반영
                ({mockIncentiveRates.quarterly}% x {selectedCompanyRate.quarterlyRate}%)
              </div>
              <div>
                년: <strong>{selectedCompanyRate.yearlyRate}%</strong> 반영
                ({mockIncentiveRates.yearly}% x {selectedCompanyRate.yearlyRate}%)
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 가격 테이블 */}
      {priceRows.length > 0 ? (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>모델명</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead className="text-right">매입가</TableHead>
                <TableHead className="text-right">장려금 금액</TableHead>
                <TableHead className="text-right">마진</TableHead>
                <TableHead className="text-right">자동계산가</TableHead>
                <TableHead className="text-right">공시 판매가</TableHead>
                <TableHead className="text-center">상태</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceRows.map((row) => (
                <TableRow key={row.productId}>
                  <TableCell className="font-mono font-medium">
                    {row.modelName}
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(row.purchasePrice)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    -{formatPrice(row.totalIncentiveAmount)}
                  </TableCell>
                  <TableCell className="text-right text-blue-600">
                    +{formatPrice(row.margin)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatPrice(row.calculatedPrice)}
                  </TableCell>

                  {/* 공시 판매가 (수동 조정 가능) */}
                  <TableCell className="text-right font-bold">
                    {editingId === row.productId ? (
                      <div className="flex items-center justify-end gap-2">
                        <Input
                          type="number"
                          className="w-32 text-right"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                        />
                        <Button
                          size="sm"
                          onClick={() => saveAdjust(row.productId)}
                        >
                          확인
                        </Button>
                      </div>
                    ) : (
                      <span
                        className={
                          row.adjustedPrice !== row.calculatedPrice
                            ? "text-orange-600"
                            : ""
                        }
                      >
                        {formatPrice(row.adjustedPrice)}
                        {row.adjustedPrice !== row.calculatedPrice && " *"}
                      </span>
                    )}
                  </TableCell>

                  {/* 공시 상태 */}
                  <TableCell className="text-center">
                    {row.isPublished ? (
                      <Badge className="bg-green-600">공시됨</Badge>
                    ) : (
                      <Badge variant="outline">미공시</Badge>
                    )}
                  </TableCell>

                  {/* 관리 */}
                  <TableCell className="text-right space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startAdjust(row)}
                    >
                      조정
                    </Button>
                    <Button
                      size="sm"
                      variant={row.isPublished ? "destructive" : "default"}
                      onClick={() => togglePublish(row.productId)}
                    >
                      {row.isPublished ? "취소" : "공시"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            위에서 업체를 선택하면 해당 업체의 판매가가 자동으로 계산됩니다.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
