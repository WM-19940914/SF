// ============================================
// 관리자 영역 레이아웃
// → /admin 아래 모든 페이지에 공통 적용
// → 왼쪽: 사이드바 메뉴 | 오른쪽: 페이지 내용
// ============================================

import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* 왼쪽 사이드바 메뉴 */}
      <AdminSidebar />

      {/* 오른쪽 메인 콘텐츠 영역 */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
