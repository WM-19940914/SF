// ============================================
// SET 상품 수정 모달
// ============================================

"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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
}

interface EditSetModalProps {
  set: ProductSet;
  onClose: () => void;
  onSave: () => void;
}

export default function EditSetModal({ set, onClose, onSave }: EditSetModalProps) {
  const [formData, setFormData] = useState({
    category: set.category,
    cooling_type: set.cooling_type,
    set_name: set.set_name,
    set_model: set.set_model,
    factory_price: set.factory_price,
    dc_rate: set.dc_rate,
    sale_price: set.sale_price,
    note: set.note || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // DC율 변경 시 판매가 자동 계산
  const handleDcRateChange = (dcRate: number) => {
    const salePrice = Math.round(formData.factory_price * (1 - dcRate / 100));
    setFormData(prev => ({ ...prev, dc_rate: dcRate, sale_price: salePrice }));
  };

  // 판매가 변경 시 DC율 역계산
  const handleSalePriceChange = (salePrice: number) => {
    const dcRate = formData.factory_price > 0
      ? Math.round((1 - salePrice / formData.factory_price) * 10000) / 100
      : 0;
    setFormData(prev => ({ ...prev, sale_price: salePrice, dc_rate: dcRate }));
  };

  // 출고가 변경 시 판매가 재계산
  const handleFactoryPriceChange = (factoryPrice: number) => {
    const salePrice = Math.round(factoryPrice * (1 - formData.dc_rate / 100));
    setFormData(prev => ({ ...prev, factory_price: factoryPrice, sale_price: salePrice }));
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== handleSubmit 실행 ===");
    console.log("formData:", formData);
    console.log("set.id:", set.id);

    setSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      console.log("Supabase 클라이언트 생성됨");

      const updateData = {
        category: formData.category,
        cooling_type: formData.cooling_type,
        set_name: formData.set_name,
        set_model: formData.set_model,
        factory_price: Number(formData.factory_price),
        dc_rate: Number(formData.dc_rate),
        sale_price: Number(formData.sale_price),
        note: formData.note || null,
      };

      console.log("updateData:", updateData);

      const { data, error: updateError } = await supabase
        .from("product_sets")
        .update(updateData)
        .eq("id", set.id)
        .select();

      console.log("Supabase 응답 - data:", data);
      console.log("Supabase 응답 - error:", updateError);

      if (updateError) {
        throw updateError;
      }

      console.log("수정 성공!");
      onSave();
      onClose();
    } catch (err: any) {
      console.error("수정 실패:", err);
      const errorMsg = err?.message || err?.details || JSON.stringify(err) || "수정에 실패했습니다.";
      setError(errorMsg);
      alert("에러: " + errorMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">SET 상품 수정</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* 구분 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">구분</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="벽걸이형">벽걸이형 (RAC)</option>
              <option value="FAC">FAC</option>
              <option value="투인원">투인원</option>
              <option value="스탠드형">스탠드형</option>
              <option value="천장형">천장형</option>
              <option value="시스템">시스템</option>
            </select>
          </div>

          {/* 타입 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">타입</label>
            <select
              value={formData.cooling_type}
              onChange={(e) => handleChange("cooling_type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="냉방">냉방</option>
              <option value="냉난방">냉난방</option>
            </select>
          </div>

          {/* 품목명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">품목명</label>
            <input
              type="text"
              value={formData.set_name}
              onChange={(e) => handleChange("set_name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* 모델명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">모델명</label>
            <input
              type="text"
              value={formData.set_model}
              onChange={(e) => handleChange("set_model", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
              required
            />
          </div>

          {/* 가격 정보 */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">출고가</label>
              <input
                type="number"
                value={formData.factory_price}
                onChange={(e) => handleFactoryPriceChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DC율 (%)</label>
              <input
                type="number"
                value={formData.dc_rate}
                onChange={(e) => handleDcRateChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="100"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">판매가</label>
              <input
                type="number"
                value={formData.sale_price}
                onChange={(e) => handleSalePriceChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* 비고 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
            <input
              type="text"
              value={formData.note}
              onChange={(e) => handleChange("note", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="선택사항"
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  저장
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
