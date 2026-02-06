// ============================================
// 삼성 출고가 관리 페이지
// → DB에서 SET 상품 + 부품 목록 조회
// → SET을 펼치면 부품 목록이 보임 (아코디언 스타일)
// → 부품 출고가 인라인 수정 → DB에 저장
// ============================================

"use client";

import { useState, useEffect } from "react";
import { getProductSets, updateProductPrice, type ProductSet, type Product } from "@/lib/db";
import { formatPrice } from "@/data/mock-data";
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

export default function SamsungPricePage() {
  // SET 목록 (부품 포함)
  const [sets, setSets] = useState<ProductSet[]>([]);
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  // 펼쳐진 SET의 id 목록
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  // 현재 편집 중인 부품 id
  const [editingId, setEditingId] = useState<string | null>(null);
  // 편집 중인 값 임시 저장
  const [editPrice, setEditPrice] = useState(0);
  // 저장 중 표시
  const [saving, setSaving] = useState(false);

  // 페이지 로드 시 DB에서 데이터 가져오기
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await getProductSets();
    setSets(data);
    setLoading(false);
  }

  // SET 펼치기/접기 토글
  function toggleExpand(setId: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(setId)) {
        next.delete(setId);
      } else {
        next.add(setId);
      }
      return next;
    });
  }

  // 전체 펼치기/접기
  function toggleAll() {
    if (expandedIds.size === sets.length) {
      // 전부 펼쳐져 있으면 → 전부 접기
      setExpandedIds(new Set());
    } else {
      // 아니면 → 전부 펼치기
      setExpandedIds(new Set(sets.map((s) => s.id)));
    }
  }

  // 부품 출고가 수정 시작
  function startEdit(product: Product) {
    setEditingId(product.id);
    setEditPrice(product.base_price);
  }

  // 수정 저장 → DB 업데이트
  async function saveEdit(productId: string) {
    setSaving(true);
    const success = await updateProductPrice(productId, editPrice);
    if (success) {
      // DB에서 최신 데이터 다시 불러오기 (합계도 업데이트됨)
      await loadData();
    } else {
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
    setEditingId(null);
    setSaving(false);
  }

  // 수정 취소
  function cancelEdit() {
    setEditingId(null);
  }

  // 엑셀 업로드 (UI만)
  function handleExcelUpload() {
    alert("엑셀 업로드 기능은 추후 구현 예정입니다.\n(SheetJS 연동 후 사용 가능)");
  }

  // 카테고리별 뱃지 색상
  function categoryBadge(category: string) {
    const colors: Record<string, string> = {
      "벽걸이": "bg-blue-100 text-blue-800",
      "홈멀티": "bg-cyan-100 text-cyan-800",
      "스탠드": "bg-green-100 text-green-800",
      "천장형": "bg-purple-100 text-purple-800",
      "시스템": "bg-orange-100 text-orange-800",
    };
    return (
      <Badge variant="outline" className={colors[category] || ""}>
        {category}
      </Badge>
    );
  }

  // 냉방/냉난방 뱃지
  function coolingBadge(coolingType: string) {
    return coolingType === "냉방" ? (
      <Badge variant="outline" className="bg-sky-50 text-sky-700">냉방</Badge>
    ) : (
      <Badge variant="outline" className="bg-red-50 text-red-700">냉난방</Badge>
    );
  }

  // 통계 계산
  const totalSets = sets.length;
  const totalProducts = sets.reduce(
    (sum, s) => sum + (s.products?.length || 0),
    0
  );
  const categories = new Set(sets.map((s) => s.category)).size;

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-lg font-medium">데이터를 불러오는 중...</div>
          <p className="text-sm text-muted-foreground mt-1">
            Supabase에서 SET 상품 데이터를 가져오고 있습니다
          </p>
        </div>
      </div>
    );
  }

  // 데이터 없음 표시
  if (sets.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-lg font-medium">데이터가 없습니다</div>
          <p className="text-sm text-muted-foreground mt-1">
            Supabase에서 테이블을 만들고 데이터를 삽입해주세요.
          </p>
          <p className="text-sm text-muted-foreground">
            supabase/001_create_tables.sql → 002_insert_data.sql 순서로 실행
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 페이지 제목 + 버튼들 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">삼성 출고가 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">
            SET 상품별 부품 출고가 관리 (부가세 포함)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={toggleAll}>
            {expandedIds.size === sets.length ? "전체 접기" : "전체 펼치기"}
          </Button>
          <Button variant="outline" onClick={handleExcelUpload}>
            엑셀 업로드
          </Button>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              SET 상품 수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSets}개</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              전체 부품 수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}개</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              카테고리 수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories}개</div>
          </CardContent>
        </Card>
      </div>

      {/* SET 상품 목록 테이블 */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>SET 이름</TableHead>
              <TableHead>SET 모델</TableHead>
              <TableHead>타입</TableHead>
              <TableHead className="text-right">출고가 합계</TableHead>
              <TableHead>비고</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sets.map((set) => {
              const isExpanded = expandedIds.has(set.id);
              return (
                <SetRow
                  key={set.id}
                  set={set}
                  isExpanded={isExpanded}
                  onToggle={() => toggleExpand(set.id)}
                  editingId={editingId}
                  editPrice={editPrice}
                  saving={saving}
                  onEditPriceChange={setEditPrice}
                  onStartEdit={startEdit}
                  onSaveEdit={saveEdit}
                  onCancelEdit={cancelEdit}
                  categoryBadge={categoryBadge}
                  coolingBadge={coolingBadge}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// SET 행 + 부품 행 컴포넌트
// ────────────────────────────────────────
function SetRow({
  set,
  isExpanded,
  onToggle,
  editingId,
  editPrice,
  saving,
  onEditPriceChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  categoryBadge,
  coolingBadge,
}: {
  set: ProductSet;
  isExpanded: boolean;
  onToggle: () => void;
  editingId: string | null;
  editPrice: number;
  saving: boolean;
  onEditPriceChange: (price: number) => void;
  onStartEdit: (product: Product) => void;
  onSaveEdit: (productId: string) => Promise<void>;
  onCancelEdit: () => void;
  categoryBadge: (cat: string) => React.ReactNode;
  coolingBadge: (type: string) => React.ReactNode;
}) {
  const products = set.products || [];

  return (
    <>
      {/* SET 행 (클릭하면 펼침/접힘) */}
      <TableRow
        className="cursor-pointer hover:bg-muted/50"
        onClick={onToggle}
      >
        <TableCell className="text-center">
          <span className="text-lg">{isExpanded ? "▼" : "▶"}</span>
        </TableCell>
        <TableCell>{categoryBadge(set.category)}</TableCell>
        <TableCell className="font-medium">{set.set_name}</TableCell>
        <TableCell className="font-mono text-sm text-muted-foreground">
          {set.set_model}
        </TableCell>
        <TableCell>{coolingBadge(set.cooling_type)}</TableCell>
        <TableCell className="text-right font-bold">
          {formatPrice(set.total_price)}
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          {set.note || ""}
        </TableCell>
      </TableRow>

      {/* 부품 행 (펼쳤을 때만 표시) */}
      {isExpanded &&
        products.map((product, idx) => (
          <TableRow
            key={product.id}
            className="bg-muted/30"
            onClick={(e) => e.stopPropagation()}
          >
            <TableCell></TableCell>
            <TableCell className="pl-8 text-muted-foreground">
              {idx === products.length - 1 ? "└" : "├"}
            </TableCell>
            <TableCell className="text-sm">
              <span className="text-muted-foreground mr-2">
                {product.product_type}
              </span>
              {product.quantity > 1 && (
                <Badge variant="secondary" className="mr-1 text-xs">
                  x{product.quantity}
                </Badge>
              )}
            </TableCell>
            <TableCell className="font-mono text-sm">
              {product.model_name}
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">
              {editingId === product.id ? (
                <Input
                  type="number"
                  className="w-32 ml-auto text-right"
                  value={editPrice}
                  onChange={(e) => onEditPriceChange(Number(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span className="text-sm">
                  {formatPrice(product.base_price)}
                  {product.quantity > 1 && (
                    <span className="text-muted-foreground ml-1">
                      (소계: {formatPrice(product.base_price * product.quantity)})
                    </span>
                  )}
                </span>
              )}
            </TableCell>
            <TableCell>
              {editingId === product.id ? (
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    onClick={() => onSaveEdit(product.id)}
                    disabled={saving}
                  >
                    {saving ? "저장중..." : "저장"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onCancelEdit}
                    disabled={saving}
                  >
                    취소
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onStartEdit(product)}
                >
                  수정
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
