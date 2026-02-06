-- ============================================
-- 삼성 출고가 관리 - 새 테이블 스키마
-- 기존 테이블 삭제 후 새로 생성
-- Supabase SQL Editor에서 실행하세요!
-- ============================================

-- 기존 테이블 삭제 (의존성 순서대로)
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS product_sets CASCADE;

-- ============================================
-- product_sets (SET 상품) 테이블
-- ============================================
CREATE TABLE product_sets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,              -- 구분 (벽걸이형, FAC, 투인원 등)
  cooling_type TEXT NOT NULL,          -- 타입 (냉방/냉난방)
  set_name TEXT NOT NULL,              -- 품목명 (벽걸이 6평 [냉방] SET)
  set_model TEXT NOT NULL UNIQUE,      -- 모델명 (AR06D1150HZ)
  factory_price INTEGER DEFAULT 0,     -- 출고가
  dc_rate INTEGER DEFAULT 0,           -- DC율 (%)
  sale_price INTEGER DEFAULT 0,        -- 판매가
  note TEXT,                           -- 비고
  sort_order INTEGER DEFAULT 0,        -- 정렬 순서
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- products (구성품) 테이블
-- ============================================
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  set_id UUID REFERENCES product_sets(id) ON DELETE CASCADE,
  part_name TEXT NOT NULL,             -- 품목명 (벽걸이 6평 [냉방] 실내기)
  model_name TEXT NOT NULL,            -- 모델명 (AR06D1150HZN)
  factory_price INTEGER DEFAULT 0,     -- 출고가
  dc_rate INTEGER DEFAULT 0,           -- DC율 (%)
  sale_price INTEGER DEFAULT 0,        -- 판매가
  is_material BOOLEAN DEFAULT FALSE,   -- 자재박스 여부
  sort_order INTEGER DEFAULT 0,        -- 정렬 순서
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_product_sets_category ON product_sets(category);
CREATE INDEX idx_product_sets_cooling_type ON product_sets(cooling_type);
CREATE INDEX idx_product_sets_set_model ON product_sets(set_model);
CREATE INDEX idx_products_set_id ON products(set_id);

-- ============================================
-- RLS (Row Level Security) 설정
-- ============================================
ALTER TABLE product_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 모든 사용자 읽기 허용 (anon 포함)
CREATE POLICY "모든 사용자 product_sets 읽기" ON product_sets
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "모든 사용자 products 읽기" ON products
  FOR SELECT TO anon, authenticated USING (true);

-- 인증된 사용자만 쓰기 가능
CREATE POLICY "인증 사용자 product_sets 쓰기" ON product_sets
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "인증 사용자 products 쓰기" ON products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER product_sets_updated_at
  BEFORE UPDATE ON product_sets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
