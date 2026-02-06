// ============================================
// 삼성 출고가 관리 페이지
// → 세트모델 클릭 시 아코디언으로 구성품 표시
// → Supabase DB 연동 + 수정 기능
// ============================================

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Search, ListFilter, Loader2, Pencil, Trash2, Plus } from "lucide-react";
import EditSetModal from "@/components/pricing/EditSetModal";
import EditPartModal from "@/components/pricing/EditPartModal";
import AddSetModal from "@/components/pricing/AddSetModal";
import AddPartModal from "@/components/pricing/AddPartModal";
import { Toast } from "@/components/ui/toast-simple";
import { ConfirmModal } from "@/components/ui/confirm-modal";

// Supabase 테이블 타입
interface ProductSet {
  id: string;
  category: string;
  cooling_type: string;
  set_name: string;
  set_model: string;
  factory_price: number;
  dc_rate: number;
  sale_price: number;
  note: string | null;
  sort_order: number;
}

interface Product {
  id: string;
  set_id: string;
  part_name: string;
  model_name: string;
  factory_price: number;
  dc_rate: number;
  sale_price: number;
  is_material: boolean;
  sort_order: number;
}

// 프론트엔드용 가공 데이터 타입
interface PriceItem {
  id: string;
  구분: string;
  타입: string;
  품목명: string;
  모델명: string;
  출고가: number;
  DC율: number;
  판매가: number;
  비고: string;
  구성품: Part[];
  // 원본 데이터 (수정용)
  _raw: ProductSet;
  _rawParts: Product[];
}

interface Part {
  id: string;
  품목명: string;
  모델명: string;
  출고가: number;
  DC율: number;
  판매가: number;
  is_material: boolean;
  _raw: Product;
}

// 가격 포맷팅
function formatPrice(price: number): string {
  if (!price) return "-";
  return price.toLocaleString("ko-KR") + "원";
}

export default function SamsungPricePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("전체");
  const [typeFilter, setTypeFilter] = useState<string>("전체");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [data, setData] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 수정 모달 상태
  const [editingSet, setEditingSet] = useState<ProductSet | null>(null);
  const [editingPart, setEditingPart] = useState<Product | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // 토스트 상태
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // 추가 모달 상태
  const [showAddSet, setShowAddSet] = useState(false);
  const [addPartForSet, setAddPartForSet] = useState<{ id: string; name: string } | null>(null);

  // 삭제 확인 모달 상태
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "set" | "part";
    id: string;
    name: string;
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  // 데이터 로드 함수
  const fetchData = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      const { data: sets, error: setsError } = await supabase
        .from("product_sets")
        .select("*")
        .order("sort_order");

      if (setsError) throw setsError;

      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .order("sort_order");

      if (productsError) throw productsError;

      const priceItems: PriceItem[] = (sets as ProductSet[]).map((set) => {
        const rawParts = (products as Product[]).filter((p) => p.set_id === set.id);
        const setParts = rawParts.map((p) => ({
          id: p.id,
          품목명: p.part_name,
          모델명: p.model_name,
          출고가: p.factory_price,
          DC율: p.dc_rate,
          판매가: p.sale_price,
          is_material: p.is_material,
          _raw: p,
        }));

        return {
          id: set.id,
          구분: set.category,
          타입: set.cooling_type,
          품목명: set.set_name,
          모델명: set.set_model,
          출고가: set.factory_price,
          DC율: set.dc_rate,
          판매가: set.sale_price,
          비고: set.note || "",
          구성품: setParts,
          _raw: set,
          _rawParts: rawParts,
        };
      });

      setData(priceItems);
      setError(null);
    } catch (err) {
      console.error("데이터 로드 실패:", err);
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 카테고리 목록
  const categories = ["전체", ...new Set(data.map(item => item.구분).filter(Boolean))];
  const types = ["전체", ...new Set(data.map(item => item.타입).filter(Boolean))];

  const categoryDisplayName: Record<string, string> = {
    "전체": "전체",
    "벽걸이형": "RAC",
    "스탠드형": "스탠드",
    "천장형": "천장형",
    "시스템": "시스템",
    "투인원": "투인원",
    "FAC": "FAC",
  };

  // 필터링
  const filteredData = data.filter(item => {
    const matchesSearch =
      item.품목명.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.모델명.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "전체" || item.구분 === categoryFilter;
    const matchesType =
      typeFilter === "전체" || item.타입 === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  // 아코디언 토글
  const toggleRow = (id: string) => {
    if (isEditMode) return; // 수정 모드에서는 아코디언 토글 안함
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // 전체 펼치기/접기
  const toggleAll = () => {
    if (expandedRows.size === filteredData.length) {
      setExpandedRows(new Set());
    } else {
      setExpandedRows(new Set(filteredData.map(item => item.id)));
    }
  };

  // SET 삭제 실행
  const executeDeleteSet = async (setId: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("product_sets")
        .delete()
        .eq("id", setId);

      if (error) throw error;
      fetchData();
      showToast("삭제 완료!");
    } catch (err) {
      console.error("삭제 실패:", err);
      showToast("삭제에 실패했습니다.", "error");
    }
  };

  // 구성품 삭제 실행
  const executeDeletePart = async (partId: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", partId);

      if (error) throw error;
      fetchData();
      showToast("삭제 완료!");
    } catch (err) {
      console.error("삭제 실패:", err);
      showToast("삭제에 실패했습니다.", "error");
    }
  };

  // 삭제 확인 후 실행
  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;

    if (deleteConfirm.type === "set") {
      executeDeleteSet(deleteConfirm.id);
    } else {
      executeDeletePart(deleteConfirm.id);
    }
    setDeleteConfirm(null);
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-500" />
          <p className="text-gray-500">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            삼성 출고가
          </h1>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-medium mb-2">데이터 로드 실패</p>
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <div className="text-left bg-white rounded-lg p-4 border border-red-100 max-w-xl mx-auto">
            <p className="text-sm text-gray-600 mb-2">다음 SQL 파일을 Supabase SQL Editor에서 실행하세요:</p>
            <ol className="text-sm text-gray-500 list-decimal list-inside space-y-1">
              <li><code className="bg-gray-100 px-1 rounded">supabase/004_new_schema.sql</code></li>
              <li><code className="bg-gray-100 px-1 rounded">supabase/005_insert_data.sql</code></li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 토스트 알림 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* 수정 모달 */}
      {editingSet && (
        <EditSetModal
          set={editingSet}
          onClose={() => setEditingSet(null)}
          onSave={() => {
            fetchData();
            showToast("수정 완료!");
          }}
        />
      )}
      {editingPart && (
        <EditPartModal
          part={editingPart}
          onClose={() => setEditingPart(null)}
          onSave={() => {
            fetchData();
            showToast("수정 완료!");
          }}
        />
      )}

      {/* 추가 모달 */}
      {showAddSet && (
        <AddSetModal
          onClose={() => setShowAddSet(false)}
          onSave={() => {
            fetchData();
            showToast("SET 상품 추가 완료!");
          }}
        />
      )}
      {addPartForSet && (
        <AddPartModal
          setId={addPartForSet.id}
          setName={addPartForSet.name}
          onClose={() => setAddPartForSet(null)}
          onSave={() => {
            fetchData();
            showToast("구성품 추가 완료!");
          }}
        />
      )}

      {/* 삭제 확인 모달 */}
      {deleteConfirm && (
        <ConfirmModal
          title={deleteConfirm.type === "set" ? "SET 상품 삭제" : "구성품 삭제"}
          message={
            deleteConfirm.type === "set"
              ? `"${deleteConfirm.name}"과(와) 모든 구성품이 삭제됩니다. 삭제하시겠습니까?`
              : `"${deleteConfirm.name}"을(를) 삭제하시겠습니까?`
          }
          confirmText="삭제"
          cancelText="취소"
          type="danger"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {/* 페이지 헤더 */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            삼성 출고가
          </h1>
          <p className="text-muted-foreground mt-1">
            2026. 02. 01. 기준 · 부가세 포함
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* SET 추가 버튼 */}
          {isEditMode && (
            <button
              onClick={() => setShowAddSet(true)}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              SET 추가
            </button>
          )}
          {/* 수정 모드 토글 */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
              isEditMode
                ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                : "bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
            }`}
          >
            <Pencil className="w-4 h-4" />
            {isEditMode ? "수정 완료" : "수정 모드"}
          </button>
          <button
            onClick={toggleAll}
            className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all shadow-sm"
          >
            {expandedRows.size === filteredData.length ? "전체 접기" : "전체 펼치기"}
          </button>
        </div>
      </div>

      {/* 수정 모드 안내 */}
      {isEditMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <Pencil className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-amber-800 font-medium">수정 모드가 활성화되었습니다</p>
            <p className="text-amber-600 text-sm">각 행의 수정/삭제 버튼을 클릭하여 데이터를 변경할 수 있습니다.</p>
          </div>
        </div>
      )}

      {/* 필터 영역 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          <ListFilter className="w-4 h-4" />
          필터
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="품목 또는 모델명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-64 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>

          <div className="h-8 w-px bg-gray-200" />

          <div className="flex gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  categoryFilter === cat
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {categoryDisplayName[cat] || cat}
              </button>
            ))}
          </div>

          <div className="h-8 w-px bg-gray-200" />

          <div className="flex gap-1.5">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  typeFilter === type
                    ? type === "냉방"
                      ? "bg-sky-500 text-white shadow-md shadow-sky-200"
                      : type === "냉난방"
                      ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                      : "bg-gray-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="ml-auto text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filteredData.length}</span>개 상품
          </div>
        </div>
      </div>

      {/* 가격표 테이블 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/80 border-b border-gray-200">
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-28 font-semibold text-gray-600">구분</TableHead>
              <TableHead className="font-semibold text-gray-600">품목명</TableHead>
              <TableHead className="font-semibold text-gray-600">모델명</TableHead>
              <TableHead className="text-right font-semibold text-gray-600">출고가</TableHead>
              <TableHead className="w-20 text-right font-semibold text-gray-600">DC</TableHead>
              <TableHead className="text-right font-semibold text-gray-600">판매가</TableHead>
              <TableHead className={`font-semibold text-gray-600 ${isEditMode ? "w-40" : "w-32"}`}>
                {isEditMode ? "관리" : "비고"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => {
              const isExpanded = expandedRows.has(item.id);
              return (
                <ProductRow
                  key={item.id}
                  item={item}
                  isExpanded={isExpanded}
                  isEditMode={isEditMode}
                  onToggle={() => toggleRow(item.id)}
                  onEditSet={() => setEditingSet(item._raw)}
                  onDeleteSet={() => setDeleteConfirm({ type: "set", id: item.id, name: item.품목명 })}
                  onEditPart={(part) => setEditingPart(part)}
                  onDeletePart={(partId, partName) => setDeleteConfirm({ type: "part", id: partId, name: partName })}
                  onAddPart={() => setAddPartForSet({ id: item.id, name: item.품목명 })}
                />
              );
            })}
          </TableBody>
        </Table>

        {filteredData.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">검색 결과가 없습니다</p>
            <p className="text-sm mt-1">다른 검색어나 필터를 시도해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 제품 행 컴포넌트
function ProductRow({
  item,
  isExpanded,
  isEditMode,
  onToggle,
  onEditSet,
  onDeleteSet,
  onEditPart,
  onDeletePart,
  onAddPart,
}: {
  item: PriceItem;
  isExpanded: boolean;
  isEditMode: boolean;
  onToggle: () => void;
  onEditSet: () => void;
  onDeleteSet: () => void;
  onEditPart: (part: Product) => void;
  onDeletePart: (partId: string, partName: string) => void;
  onAddPart: () => void;
}) {
  const [includeMaterial, setIncludeMaterial] = useState(false);

  const parts = item.구성품 || [];
  const baseParts = parts.filter(p => !p.is_material);
  const materialParts = parts.filter(p => p.is_material);
  const activeParts = includeMaterial ? parts : baseParts;
  const totalOut = activeParts.reduce((sum, p) => sum + p.출고가, 0);
  const totalSale = activeParts.reduce((sum, p) => sum + p.판매가, 0);

  return (
    <>
      {/* 메인 행 (SET) */}
      <TableRow
        className={`transition-colors ${
          isEditMode
            ? "hover:bg-amber-50/50"
            : isExpanded
            ? "bg-blue-50/50 hover:bg-blue-50"
            : "hover:bg-gray-50"
        } ${!isEditMode && "cursor-pointer"}`}
        onClick={onToggle}
      >
        <TableCell className="text-center">
          {parts.length > 0 && !isEditMode ? (
            <div className={`inline-flex items-center justify-center w-6 h-6 rounded-md transition-colors ${
              isExpanded ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
            }`}>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          ) : null}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1.5">
            <CategoryBadge category={item.구분} />
            <TypeBadge type={item.타입} />
          </div>
        </TableCell>
        <TableCell className="font-semibold text-gray-900">
          {item.품목명}
        </TableCell>
        <TableCell className="font-mono text-sm font-semibold text-blue-600">
          {item.모델명}
        </TableCell>
        <TableCell className="text-right font-bold text-gray-900 tabular-nums">
          {formatPrice(item.출고가)}
        </TableCell>
        <TableCell className="text-right text-gray-500 tabular-nums">
          {item.출고가 > 0
            ? ((1 - item.판매가 / item.출고가) * 100).toFixed(2)
            : item.DC율.toFixed(2)}%
        </TableCell>
        <TableCell className="text-right font-bold text-blue-600 tabular-nums">
          {formatPrice(item.판매가)}
        </TableCell>
        <TableCell>
          {isEditMode ? (
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onEditSet}
                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                title="수정"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={onDeleteSet}
                className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <span className="text-sm text-gray-500">{item.비고}</span>
          )}
        </TableCell>
      </TableRow>

      {/* 구성품 행 - 기본 구성품 */}
      {isExpanded && baseParts.map((part, idx) => (
        <TableRow key={part.id} className="bg-gray-50/50 hover:bg-gray-100/50">
          <TableCell className="text-center">
            <span className="text-gray-300 text-xs font-mono">
              {idx === baseParts.length - 1 && materialParts.length === 0 ? "└" : "├"}
            </span>
          </TableCell>
          <TableCell>
            <PartTypeBadge name={part.품목명} />
          </TableCell>
          <TableCell className="text-sm text-gray-500">
            {part.품목명}
          </TableCell>
          <TableCell className="font-mono text-xs text-gray-400">
            {part.모델명}
          </TableCell>
          <TableCell className="text-right text-sm text-gray-500 tabular-nums">
            {formatPrice(part.출고가)}
          </TableCell>
          <TableCell className="text-right text-sm text-gray-400 tabular-nums">
            {part.출고가 > 0
              ? ((1 - part.판매가 / part.출고가) * 100).toFixed(2)
              : part.DC율.toFixed(2)}%
          </TableCell>
          <TableCell className="text-right text-sm font-medium text-blue-500 tabular-nums">
            {formatPrice(part.판매가)}
          </TableCell>
          <TableCell>
            {isEditMode && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditPart(part._raw)}
                  className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                  title="수정"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeletePart(part.id, part.품목명)}
                  className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                  title="삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </TableCell>
        </TableRow>
      ))}

      {/* 구성품 행 - 자재박스 */}
      {isExpanded && materialParts.map((part, idx) => (
        <TableRow
          key={part.id}
          className={`transition-opacity ${
            includeMaterial
              ? "bg-amber-50/50 hover:bg-amber-100/50"
              : "bg-gray-50/30 opacity-40"
          }`}
        >
          <TableCell className="text-center">
            <span className="text-gray-300 text-xs font-mono">
              {idx === materialParts.length - 1 ? "└" : "├"}
            </span>
          </TableCell>
          <TableCell>
            <PartTypeBadge name={part.품목명} />
          </TableCell>
          <TableCell className={`text-sm text-gray-500 ${!includeMaterial ? "line-through decoration-gray-400" : ""}`}>
            {part.품목명}
          </TableCell>
          <TableCell className={`font-mono text-xs text-gray-400 ${!includeMaterial ? "line-through decoration-gray-400" : ""}`}>
            {part.모델명}
          </TableCell>
          <TableCell className={`text-right text-sm text-gray-500 tabular-nums ${!includeMaterial ? "line-through decoration-gray-400" : ""}`}>
            {formatPrice(part.출고가)}
          </TableCell>
          <TableCell className={`text-right text-sm text-gray-400 tabular-nums ${!includeMaterial ? "line-through decoration-gray-400" : ""}`}>
            {part.출고가 > 0
              ? ((1 - part.판매가 / part.출고가) * 100).toFixed(2)
              : part.DC율.toFixed(2)}%
          </TableCell>
          <TableCell className={`text-right text-sm font-medium text-blue-500 tabular-nums ${!includeMaterial ? "line-through decoration-gray-400" : ""}`}>
            {formatPrice(part.판매가)}
          </TableCell>
          <TableCell>
            {isEditMode && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditPart(part._raw)}
                  className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                  title="수정"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeletePart(part.id, part.품목명)}
                  className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                  title="삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </TableCell>
        </TableRow>
      ))}

      {/* 합계 행 */}
      {isExpanded && (
        <TableRow className="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200">
          <TableCell></TableCell>
          <TableCell colSpan={2}>
            <div className="flex items-center gap-4">
              {parts.length > 0 && (
                <span className="text-sm font-semibold text-gray-700">
                  합계 <span className="text-gray-400 font-normal">({activeParts.length}개)</span>
                </span>
              )}
              {materialParts.length > 0 && (
                <label
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={includeMaterial}
                    onChange={(e) => setIncludeMaterial(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className={`text-xs transition-colors ${
                    includeMaterial
                      ? "text-amber-600 font-medium"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}>
                    자재박스 포함
                  </span>
                </label>
              )}
              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddPart();
                  }}
                  className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-md transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  구성품 추가
                </button>
              )}
            </div>
          </TableCell>
          <TableCell></TableCell>
          <TableCell className="text-right font-bold text-gray-900 tabular-nums">
            {parts.length > 0 ? formatPrice(totalOut) : "-"}
          </TableCell>
          <TableCell></TableCell>
          <TableCell className="text-right font-bold text-blue-600 tabular-nums">
            {parts.length > 0 ? formatPrice(totalSale) : "-"}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      )}
    </>
  );
}

// 카테고리 뱃지
function CategoryBadge({ category }: { category: string }) {
  const styles: Record<string, string> = {
    "벽걸이형": "bg-blue-100 text-blue-700 border-blue-200",
    "스탠드형": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "천장형": "bg-violet-100 text-violet-700 border-violet-200",
    "시스템": "bg-orange-100 text-orange-700 border-orange-200",
    "투인원": "bg-pink-100 text-pink-700 border-pink-200",
    "FAC": "bg-cyan-100 text-cyan-700 border-cyan-200",
  };

  const displayName: Record<string, string> = {
    "벽걸이형": "RAC",
    "스탠드형": "스탠드",
    "천장형": "천장형",
    "시스템": "시스템",
    "투인원": "투인원",
    "FAC": "FAC",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${
      styles[category] || "bg-gray-100 text-gray-700 border-gray-200"
    }`}>
      {displayName[category] || category}
    </span>
  );
}

// 냉방/냉난방 뱃지
function TypeBadge({ type }: { type: string }) {
  return type === "냉방" ? (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-sky-100 text-sky-700 border border-sky-200">
      냉방
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
      냉난방
    </span>
  );
}

// 부품 타입 뱃지
function PartTypeBadge({ name }: { name: string }) {
  let type = "기타";
  let style = "bg-gray-100 text-gray-600";

  if (name.includes("실내기")) {
    type = "실내기";
    style = "bg-teal-100 text-teal-700";
  } else if (name.includes("실외기")) {
    type = "실외기";
    style = "bg-orange-100 text-orange-700";
  } else if (name.includes("리모컨")) {
    type = "리모컨";
    style = "bg-purple-100 text-purple-700";
  } else if (name.includes("자재박스") || name.includes("배관")) {
    type = "자재";
    style = "bg-slate-200 text-slate-600";
  }

  return (
    <span className={`inline-flex items-center justify-center w-14 px-2 py-0.5 rounded text-xs font-medium ${style}`}>
      {type}
    </span>
  );
}
