// ============================================
// 장려금 설정 페이지
// → 상단: 4가지 장려금율 입력 (셀인/셀아웃/분기/년)
// → 하단: 업체별 장려금 반영비율 테이블
// ============================================

"use client";

import { useState } from "react";
import {
  mockIncentiveRates,
  mockCompanyIncentiveRates,
  type IncentiveRates,
  type CompanyIncentiveRate,
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
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function IncentivePage() {
  // 장려금율 (전체 공통)
  const [rates, setRates] = useState<IncentiveRates>(mockIncentiveRates);
  const [isRatesEditing, setIsRatesEditing] = useState(false);
  const [ratesBackup, setRatesBackup] = useState<IncentiveRates>(mockIncentiveRates);

  // 업체별 반영 비율
  const [companyRates, setCompanyRates] = useState<CompanyIncentiveRate[]>(
    mockCompanyIncentiveRates
  );

  // 업체별 편집 중인 행
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);
  const [editCompanyValues, setEditCompanyValues] = useState({
    sellInRate: 0,
    sellOutRate: 0,
    quarterlyRate: 0,
    yearlyRate: 0,
  });

  // --- 장려금율 편집 ---
  function startRatesEdit() {
    setRatesBackup(rates);
    setIsRatesEditing(true);
  }

  function saveRates() {
    setIsRatesEditing(false);
    // 더미: 실제로는 Supabase에 저장
  }

  function cancelRatesEdit() {
    setRates(ratesBackup);
    setIsRatesEditing(false);
  }

  // --- 업체별 반영비율 편집 ---
  function startCompanyEdit(cr: CompanyIncentiveRate) {
    setEditingCompanyId(cr.companyId);
    setEditCompanyValues({
      sellInRate: cr.sellInRate,
      sellOutRate: cr.sellOutRate,
      quarterlyRate: cr.quarterlyRate,
      yearlyRate: cr.yearlyRate,
    });
  }

  function saveCompanyEdit(companyId: string) {
    setCompanyRates(
      companyRates.map((cr) =>
        cr.companyId === companyId
          ? { ...cr, ...editCompanyValues }
          : cr
      )
    );
    setEditingCompanyId(null);
  }

  function cancelCompanyEdit() {
    setEditingCompanyId(null);
  }

  // 반영비율에 따라 뱃지 색상 결정
  function rateBadge(rate: number) {
    if (rate === 100) return <Badge className="bg-green-600">{rate}%</Badge>;
    if (rate >= 70) return <Badge className="bg-blue-600">{rate}%</Badge>;
    return <Badge variant="secondary">{rate}%</Badge>;
  }

  return (
    <div>
      {/* 페이지 제목 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">장려금 설정</h1>
        <p className="text-sm text-muted-foreground mt-1">
          장려금율 및 업체별 반영비율 관리
        </p>
      </div>

      {/* ===== 상단: 장려금율 설정 카드 ===== */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>장려금율 설정 (전체 공통)</CardTitle>
            {isRatesEditing ? (
              <div className="space-x-2">
                <Button size="sm" onClick={saveRates}>저장</Button>
                <Button size="sm" variant="outline" onClick={cancelRatesEdit}>
                  취소
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={startRatesEdit}>
                수정
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            {/* 셀인 장려금 */}
            <div className="space-y-2">
              <Label>셀인 장려금</Label>
              {isRatesEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={rates.sellIn}
                    onChange={(e) =>
                      setRates({ ...rates, sellIn: Number(e.target.value) })
                    }
                    className="w-24"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              ) : (
                <div className="text-2xl font-bold">{rates.sellIn}%</div>
              )}
              <p className="text-xs text-muted-foreground">
                삼성에서 매입 시 받는 장려금
              </p>
            </div>

            {/* 셀아웃 장려금 */}
            <div className="space-y-2">
              <Label>셀아웃 장려금</Label>
              {isRatesEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={rates.sellOut}
                    onChange={(e) =>
                      setRates({ ...rates, sellOut: Number(e.target.value) })
                    }
                    className="w-24"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              ) : (
                <div className="text-2xl font-bold">{rates.sellOut}%</div>
              )}
              <p className="text-xs text-muted-foreground">
                업체에 판매 시 받는 장려금
              </p>
            </div>

            {/* 분기 장려금 */}
            <div className="space-y-2">
              <Label>분기 장려금</Label>
              {isRatesEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={rates.quarterly}
                    onChange={(e) =>
                      setRates({ ...rates, quarterly: Number(e.target.value) })
                    }
                    className="w-24"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              ) : (
                <div className="text-2xl font-bold">{rates.quarterly}%</div>
              )}
              <p className="text-xs text-muted-foreground">
                분기별 실적 달성 장려금
              </p>
            </div>

            {/* 년 장려금 */}
            <div className="space-y-2">
              <Label>년 장려금</Label>
              {isRatesEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={rates.yearly}
                    onChange={(e) =>
                      setRates({ ...rates, yearly: Number(e.target.value) })
                    }
                    className="w-24"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              ) : (
                <div className="text-2xl font-bold">{rates.yearly}%</div>
              )}
              <p className="text-xs text-muted-foreground">
                연간 실적 달성 장려금
              </p>
            </div>
          </div>

          {/* 합계 표시 */}
          <div className="mt-4 pt-4 border-t">
            <span className="text-sm text-muted-foreground">
              합계 장려금율:{" "}
            </span>
            <span className="font-bold text-lg">
              {(rates.sellIn + rates.sellOut + rates.quarterly + rates.yearly).toFixed(1)}%
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ===== 하단: 업체별 반영비율 테이블 ===== */}
      <Card>
        <CardHeader>
          <CardTitle>업체별 장려금 반영비율</CardTitle>
          <p className="text-sm text-muted-foreground">
            업체 등급에 따라 장려금 반영비율이 다릅니다. 100%면 장려금 전액 반영.
          </p>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>업체명</TableHead>
                  <TableHead className="text-center">셀인 반영비율</TableHead>
                  <TableHead className="text-center">셀아웃 반영비율</TableHead>
                  <TableHead className="text-center">분기 반영비율</TableHead>
                  <TableHead className="text-center">년 반영비율</TableHead>
                  <TableHead className="text-right">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companyRates.map((cr) => (
                  <TableRow key={cr.companyId}>
                    <TableCell className="font-medium">
                      {cr.companyName}
                    </TableCell>

                    {/* 셀인 반영비율 */}
                    <TableCell className="text-center">
                      {editingCompanyId === cr.companyId ? (
                        <Input
                          type="number"
                          className="w-20 mx-auto text-center"
                          value={editCompanyValues.sellInRate}
                          onChange={(e) =>
                            setEditCompanyValues({
                              ...editCompanyValues,
                              sellInRate: Number(e.target.value),
                            })
                          }
                        />
                      ) : (
                        rateBadge(cr.sellInRate)
                      )}
                    </TableCell>

                    {/* 셀아웃 반영비율 */}
                    <TableCell className="text-center">
                      {editingCompanyId === cr.companyId ? (
                        <Input
                          type="number"
                          className="w-20 mx-auto text-center"
                          value={editCompanyValues.sellOutRate}
                          onChange={(e) =>
                            setEditCompanyValues({
                              ...editCompanyValues,
                              sellOutRate: Number(e.target.value),
                            })
                          }
                        />
                      ) : (
                        rateBadge(cr.sellOutRate)
                      )}
                    </TableCell>

                    {/* 분기 반영비율 */}
                    <TableCell className="text-center">
                      {editingCompanyId === cr.companyId ? (
                        <Input
                          type="number"
                          className="w-20 mx-auto text-center"
                          value={editCompanyValues.quarterlyRate}
                          onChange={(e) =>
                            setEditCompanyValues({
                              ...editCompanyValues,
                              quarterlyRate: Number(e.target.value),
                            })
                          }
                        />
                      ) : (
                        rateBadge(cr.quarterlyRate)
                      )}
                    </TableCell>

                    {/* 년 반영비율 */}
                    <TableCell className="text-center">
                      {editingCompanyId === cr.companyId ? (
                        <Input
                          type="number"
                          className="w-20 mx-auto text-center"
                          value={editCompanyValues.yearlyRate}
                          onChange={(e) =>
                            setEditCompanyValues({
                              ...editCompanyValues,
                              yearlyRate: Number(e.target.value),
                            })
                          }
                        />
                      ) : (
                        rateBadge(cr.yearlyRate)
                      )}
                    </TableCell>

                    {/* 관리 버튼 */}
                    <TableCell className="text-right">
                      {editingCompanyId === cr.companyId ? (
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            onClick={() => saveCompanyEdit(cr.companyId)}
                          >
                            저장
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelCompanyEdit}
                          >
                            취소
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startCompanyEdit(cr)}
                        >
                          수정
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
