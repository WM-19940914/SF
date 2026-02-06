// ============================================
// 구성품 수정 모달
// ============================================

"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  set_id: string;
  part_name: string;
  model_name: string;
  factory_price: number;
  dc_rate: number;
  sale_price: number;
  is_material: boolean;
}

interface EditPartModalProps {
  part: Product;
  onClose: () => void;
  onSave: () => void;
}

export default function EditPartModal({ part, onClose, onSave }: EditPartModalProps) {
  const [formData, setFormData] = useState({
    part_name: part.part_name,
    model_name: part.model_name,
    factory_price: part.factory_price,
    dc_rate: part.dc_rate,
    sale_price: part.sale_price,
    is_material: part.is_material,
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

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("products")
        .update({
          part_name: formData.part_name,
          model_name: formData.model_name,
          factory_price: Number(formData.factory_price),
          dc_rate: Number(formData.dc_rate),
          sale_price: Number(formData.sale_price),
          is_material: formData.is_material,
        })
        .eq("id", part.id);

      if (updateError) throw updateError;

      onSave();
      onClose();
    } catch (err: any) {
      console.error("수정 실패:", err);
      setError(err.message || "수정에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">구성품 수정</h2>
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

          {/* 품목명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">품목명</label>
            <input
              type="text"
              value={formData.part_name}
              onChange={(e) => handleChange("part_name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* 모델명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">모델명</label>
            <input
              type="text"
              value={formData.model_name}
              onChange={(e) => handleChange("model_name", e.target.value)}
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

          {/* 자재박스 여부 */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="is_material"
              checked={formData.is_material}
              onChange={(e) => handleChange("is_material", e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
            />
            <label htmlFor="is_material" className="text-sm text-gray-700 cursor-pointer">
              자재박스 (체크 시 합계에서 기본 제외됨)
            </label>
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
