-- ============================================
-- RLS 수정: 비로그인(anon) 사용자도 읽기 가능하게
-- → 개발 중에는 로그인 없이도 데이터를 볼 수 있어야 하므로
-- → 나중에 로그인 기능 완성 후 다시 제한 가능
-- ============================================

-- product_sets: 누구나 읽기 가능
CREATE POLICY "누구나 product_sets 읽기" ON product_sets
  FOR SELECT TO anon USING (true);

-- products: 누구나 읽기 가능
CREATE POLICY "누구나 products 읽기" ON products
  FOR SELECT TO anon USING (true);

-- companies: 누구나 읽기 가능
CREATE POLICY "누구나 companies 읽기" ON companies
  FOR SELECT TO anon USING (true);

-- 쓰기도 anon에게 허용 (개발 중이므로)
CREATE POLICY "누구나 products 쓰기" ON products
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "누구나 product_sets 쓰기" ON product_sets
  FOR UPDATE TO anon USING (true) WITH CHECK (true);
