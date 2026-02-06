// ============================================
// 업체 영역 레이아웃
// → /dealer 아래 모든 페이지에 공통 적용
// → 왼쪽: 사이드바 메뉴 | 오른쪽: 페이지 내용
// ============================================

import { DealerSidebar } from "@/components/dealer-sidebar";

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* 왼쪽 사이드바 메뉴 */}
      <DealerSidebar />

      {/* 오른쪽 메인 콘텐츠 영역 */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
