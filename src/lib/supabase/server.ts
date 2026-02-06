// ============================================
// Supabase 서버 클라이언트
// → 서버(백엔드)에서 Supabase에 접속할 때 사용
// → 비유: "주방(서버)에서 창고(DB)에 접근하는 통로"
// ============================================

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 컴포넌트에서 호출 시 무시 (정상 동작)
          }
        },
      },
    }
  );
}
