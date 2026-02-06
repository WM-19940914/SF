-- ============================================
-- anon 사용자 쓰기 권한 부여
-- Supabase SQL Editor에서 실행하세요!
-- ============================================

-- 기존 쓰기 정책 삭제
DROP POLICY IF EXISTS "인증 사용자 product_sets 쓰기" ON product_sets;
DROP POLICY IF EXISTS "인증 사용자 products 쓰기" ON products;

-- anon 포함 모든 사용자 쓰기 허용
CREATE POLICY "모든 사용자 product_sets 쓰기" ON product_sets
  FOR ALL TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "모든 사용자 products 쓰기" ON products
  FOR ALL TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 확인
SELECT 'RLS 정책 업데이트 완료!' AS result;
