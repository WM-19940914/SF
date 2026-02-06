// ============================================
// 관리자 사이드바 (왼쪽 메뉴)
// → 관리자가 로그인하면 왼쪽에 항상 보이는 메뉴바
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// 메뉴 항목 목록
const menuItems = [
  { href: "/admin/dashboard", label: "대시보드", icon: "📊" },
  { href: "/admin/pricing/samsung", label: "삼성 출고가", icon: "💰" },
  { href: "/admin/pricing/incentive", label: "장려금 설정", icon: "📋" },
  { href: "/admin/pricing/publish", label: "단가 공시", icon: "📢" },
  { href: "/admin/orders", label: "발주 관리", icon: "📦" },
  { href: "/admin/inventory", label: "재고 현황", icon: "🏭" },
  { href: "/admin/companies", label: "업체 관리", icon: "🏢" },
];

export function AdminSidebar() {
  // 현재 페이지 주소를 가져옴 (어떤 메뉴가 선택됐는지 표시하려고)
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card min-h-screen p-4">
      {/* 로고/제목 */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold">멜레아 B2B</h1>
        <p className="text-sm text-muted-foreground">관리자</p>
      </div>

      {/* 메뉴 목록 */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              // 기본 스타일
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              // 현재 페이지면 파란색 배경, 아니면 투명
              pathname.startsWith(item.href)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
