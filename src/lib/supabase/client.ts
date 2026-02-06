// ============================================
// Supabase 브라우저 클라이언트
// → 브라우저(프론트엔드)에서 Supabase에 접속할 때 사용
// → 비유: "웹사이트가 데이터베이스에 전화거는 전화기"
// ============================================

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
