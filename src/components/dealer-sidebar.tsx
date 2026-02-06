// ============================================
// 업체(거래처) 사이드바 (왼쪽 메뉴)
// → 업체 담당자가 로그인하면 보이는 메뉴바
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// 업체용 메뉴 (관리자보다 적음)
const menuItems = [
  { href: "/dealer/prices", label: "단가표", icon: "💰" },
  { href: "/dealer/order/new", label: "발주 신청", icon: "🛒" },
  { href: "/dealer/orders", label: "발주 내역", icon: "📋" },
  { href: "/dealer/inventory", label: "재고 조회", icon: "📦" },
];

export function DealerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card min-h-screen p-4">
      {/* 로고/제목 */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold">멜레아 B2B</h1>
        <p className="text-sm text-muted-foreground">업체 전용</p>
      </div>

      {/* 메뉴 목록 */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
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
