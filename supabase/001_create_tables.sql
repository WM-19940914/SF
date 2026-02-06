-- ============================================
-- 멜레아 B2B 유통 웹앱 - 테이블 생성
-- Supabase SQL Editor에서 실행하세요!
-- ============================================

-- ① companies (업체) 테이블
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,                -- 업체명
  contact_person TEXT,               -- 담당자
  phone TEXT,                        -- 연락처
  email TEXT,                        -- 이메일
  grade TEXT DEFAULT 'B',            -- 등급 (A/B/C)
  address TEXT,                      -- 주소
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ② product_sets (SET 상품) 테이블
-- 예: "벽걸이 7평 [냉방]" = 실내기+실외기+리모컨+배관 묶음
CREATE TABLE IF NOT EXISTS product_sets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  set_name TEXT NOT NULL,            -- SET 이름 (벽걸이 7평 [냉방])
  set_model TEXT,                    -- SET 모델명 (AR60F07D12W)
  category TEXT,                     -- 대분류 (벽걸이/홈멀티/스탠드/천장형)
  cooling_type TEXT,                 -- 냉방/냉난방
  capacity TEXT,                     -- 평수 (7평, 9평 등)
  total_price INTEGER DEFAULT 0,    -- SET 출고가 합계 (부가세포함)
  note TEXT,                         -- 비고 (구형/신형/리모컨포함 등)
  sort_order INTEGER DEFAULT 0,     -- 정렬 순서
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ③ products (개별 부품) 테이블
-- 예: 실내기 AR60F07D12WNKO 362,000원
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  set_id UUID REFERENCES product_sets(id) ON DELETE CASCADE,  -- 어떤 SET에 속하는지
  model_name TEXT NOT NULL,          -- 모델명
  product_type TEXT,                 -- 실내기/실외기/리모컨/배관/분배관
  quantity INTEGER DEFAULT 1,       -- 수량
  base_price INTEGER DEFAULT 0,     -- 삼성 출고가 (부가세포함)
  sort_order INTEGER DEFAULT 0,     -- 정렬 순서 (실내기→실외기→리모컨→배관 순)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS(행 단위 보안) 설정 - 일단 모든 인증 사용자가 읽기 가능
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 읽기 정책: 인증된 사용자는 모두 읽기 가능
CREATE POLICY "인증 사용자 companies 읽기" ON companies
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "인증 사용자 product_sets 읽기" ON product_sets
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "인증 사용자 products 읽기" ON products
  FOR SELECT TO authenticated USING (true);

-- 쓰기 정책: 인증된 사용자는 모두 쓰기 가능 (나중에 관리자만으로 제한 가능)
CREATE POLICY "인증 사용자 companies 쓰기" ON companies
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "인증 사용자 product_sets 쓰기" ON product_sets
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "인증 사용자 products 쓰기" ON products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
