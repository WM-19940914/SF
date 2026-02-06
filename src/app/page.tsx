// ============================================
// 로그인 페이지 (메인 페이지)
// → 사이트에 처음 접속하면 보이는 화면
// → 관리자/업체 모두 여기서 로그인
// ============================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 로그인 버튼 클릭 시 실행
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지
    setError("");
    setLoading(true);

    // TODO: Supabase 연결 후 실제 로그인으로 교체
    // 지금은 테스트용으로 임시 동작
    if (email === "admin@melea.kr" && password === "admin123") {
      router.push("/admin/dashboard");
    } else if (email === "dealer@test.kr" && password === "dealer123") {
      router.push("/dealer/prices");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">멜레아 B2B</CardTitle>
          <CardDescription>유통 관리 시스템에 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* 이메일 입력 */}
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@company.kr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {/* 로그인 버튼 */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          {/* 테스트용 안내 (나중에 삭제) */}
          <div className="mt-6 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
            <p className="font-medium mb-1">테스트 계정:</p>
            <p>관리자: admin@melea.kr / admin123</p>
            <p>업체: dealer@test.kr / dealer123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
