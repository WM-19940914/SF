// ============================================
// 확인 모달 컴포넌트
// ============================================

"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "danger" | "warning";
}

export function ConfirmModal({
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  type = "danger",
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        {/* 아이콘 영역 */}
        <div className={`p-6 flex flex-col items-center ${
          type === "danger" ? "bg-red-50" : "bg-amber-50"
        }`}>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
            type === "danger" ? "bg-red-100" : "bg-amber-100"
          }`}>
            {type === "danger" ? (
              <Trash2 className="w-7 h-7 text-red-600" />
            ) : (
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            )}
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
          <p className="mt-2 text-sm text-gray-600 text-center">{message}</p>
        </div>

        {/* 버튼 영역 */}
        <div className="p-4 flex gap-3 bg-gray-50">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-white transition-colors font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl transition-colors font-medium ${
              type === "danger"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-amber-600 text-white hover:bg-amber-700"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
