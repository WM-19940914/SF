-- ============================================
-- 멜레아 B2B 유통 웹앱 - 초기 데이터 삽입
-- 001_create_tables.sql 실행 후에 실행하세요!
-- ============================================

-- ============================================
-- 1. 업체 데이터 (5개)
-- ============================================
INSERT INTO companies (name, contact_person, phone, email, grade, address) VALUES
  ('엘에스전자', '이상호', '010-1234-5678', 'ls@lselec.com', 'A', '서울특별시 강남구 테헤란로 123'),
  ('상미에어컨', '김상미', '010-2345-6789', 'sang@sangmi.com', 'A', '경기도 성남시 분당구 판교로 456'),
  ('한빛냉동', '박한빛', '010-3456-7890', 'park@hanbit.com', 'B', '서울특별시 영등포구 여의대로 789'),
  ('대한공조', '최지영', '010-4567-8901', 'choi@daehanhvac.com', 'B', '인천광역시 연수구 인천타워대로 321'),
  ('미래설비', '정수현', '010-5678-9012', 'jung@miraesetup.com', 'C', '경기도 수원시 영통구 광교로 654');

-- ============================================
-- 2. SET 상품 데이터 (20개)
-- ============================================

-- ───── 벽걸이 (6개) ─────
INSERT INTO product_sets (set_name, set_model, category, cooling_type, capacity, total_price, note, sort_order) VALUES
  ('벽걸이 7평 [냉방]',    'AR07B1100HZQ', '벽걸이', '냉방',   '7평',  925000,  NULL, 1),
  ('벽걸이 9평 [냉방]',    'AR09B1100HZQ', '벽걸이', '냉방',   '9평',  1195000, NULL, 2),
  ('벽걸이 11평 [냉방]',   'AR11B1100HZQ', '벽걸이', '냉방',   '11평', 1345000, NULL, 3),
  ('벽걸이 7평 [냉난방]',  'AR07B5190HZN', '벽걸이', '냉난방', '7평',  1089000, NULL, 4),
  ('벽걸이 9평 [냉난방]',  'AR09B5190HZN', '벽걸이', '냉난방', '9평',  1375000, NULL, 5),
  ('벽걸이 11평 [냉난방]', 'AR11B5190HZN', '벽걸이', '냉난방', '11평', 1595000, NULL, 6);

-- ───── 홈멀티 (4개) ─────
INSERT INTO product_sets (set_name, set_model, category, cooling_type, capacity, total_price, note, sort_order) VALUES
  ('홈멀티 7+7평 [냉방]',    'AJ040TXJ2KH', '홈멀티', '냉방',   '7+7평',    1790000, NULL, 7),
  ('홈멀티 7+9평 [냉방]',    'AJ050TXJ2KH', '홈멀티', '냉방',   '7+9평',    2060000, NULL, 8),
  ('홈멀티 7+7+9평 [냉방]',  'AJ068TXJ3KH', '홈멀티', '냉방',   '7+7+9평',  2890000, NULL, 9),
  ('홈멀티 7+9+11평 [냉방]', 'AJ080TXJ3KH', '홈멀티', '냉방',   '7+9+11평', 3530000, NULL, 10);

-- ───── 스탠드 (4개) ─────
INSERT INTO product_sets (set_name, set_model, category, cooling_type, capacity, total_price, note, sort_order) VALUES
  ('스탠드 17평 [냉방]',    'AF17T6474EZS', '스탠드', '냉방',   '17평', 2100000, NULL, 11),
  ('스탠드 23평 [냉방]',    'AF23T7674EZS', '스탠드', '냉방',   '23평', 2750000, NULL, 12),
  ('스탠드 17평 [냉난방]',  'AF17B6474EZN', '스탠드', '냉난방', '17평', 2450000, NULL, 13),
  ('스탠드 23평 [냉난방]',  'AF23B7674EZN', '스탠드', '냉난방', '23평', 3100000, NULL, 14);

-- ───── 천장형 (4개) ─────
INSERT INTO product_sets (set_name, set_model, category, cooling_type, capacity, total_price, note, sort_order) VALUES
  ('천장형 1Way 11평 [냉방]',  'AP110RAPPBH1', '천장형', '냉방',   '11평', 1850000, '1Way', 15),
  ('천장형 1Way 14평 [냉방]',  'AP145RAPPBH1', '천장형', '냉방',   '14평', 2400000, '1Way', 16),
  ('천장형 4Way 11평 [냉방]',  'AP110RAPPBH4', '천장형', '냉방',   '11평', 2050000, '4Way', 17),
  ('천장형 4Way 14평 [냉방]',  'AP145RAPPBH4', '천장형', '냉방',   '14평', 2600000, '4Way', 18);

-- ───── 시스템 에어컨 (2개) ─────
INSERT INTO product_sets (set_name, set_model, category, cooling_type, capacity, total_price, note, sort_order) VALUES
  ('시스템 7평 [냉방]',  'AC070TNHPKG', '시스템', '냉방', '7평',  2800000, NULL, 19),
  ('시스템 12평 [냉방]', 'AC120TNHPKG', '시스템', '냉방', '12평', 3200000, NULL, 20);


-- ============================================
-- 3. 부품(products) 데이터
-- SET의 id를 찾아서 연결해야 하므로 서브쿼리 사용
-- ============================================

-- ───── 벽걸이 7평 [냉방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AR07B1100HZQ'), 'AR07B1100HZQNKO', '실내기', 1, 362000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AR07B1100HZQ'), 'AR07B1100HZQXKO', '실외기', 1, 515000, 2),
  ((SELECT id FROM product_sets WHERE set_model = 'AR07B1100HZQ'), 'ARR-WK8F', '리모컨', 1, 48000, 3);

-- ───── 벽걸이 9평 [냉방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AR09B1100HZQ'), 'AR09B1100HZQNKO', '실내기', 1, 475000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AR09B1100HZQ'), 'AR09B1100HZQXKO', '실외기', 1, 672000, 2),
  ((SELECT id FROM product_sets WHERE set_model = 'AR09B1100HZQ'), 'ARR-WK8F', '리모컨', 1, 48000, 3);

-- ───── 벽걸이 11평 [냉방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AR11B1100HZQ'), 'AR11B1100HZQNKO', '실내기', 1, 530000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AR11B1100HZQ'), 'AR11B1100HZQXKO', '실외기', 1, 767000, 2),
  ((SELECT id FROM product_sets WHERE set_model = 'AR11B1100HZQ'), 'ARR-WK8F', '리모컨', 1, 48000, 3);

-- ───── 벽걸이 7평 [냉난방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AR07B5190HZN'), 'AR07B5190HZNNKO', '실내기', 1, 432000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AR07B5190HZN'), 'AR07B5190HZNXKO', '실외기', 1, 609000, 2),
  ((SELECT id FROM product_sets WHERE set_model = 'AR07B5190HZN'), 'ARR-WK8F', '리모컨', 1, 48000, 3);

-- ───── 벽걸이 9평 [냉난방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AR09B5190HZN'), 'AR09B5190HZNNKO', '실내기', 1, 562000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AR09B5190HZN'), 'AR09B5190HZNXKO', '실외기', 1, 765000, 2),
  ((SELECT id FROM product_sets WHERE set_model = 'AR09B5190HZN'), 'ARR-WK8F', '리모컨', 1, 48000, 3);

-- ───── 벽걸이 11평 [냉난방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AR11B5190HZN'), 'AR11B5190HZNNKO', '실내기', 1, 645000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AR11B5190HZN'), 'AR11B5190HZNXKO', '실외기', 1, 902000, 2),
  ((SELECT id FROM product_sets WHERE set_model = 'AR11B5190HZN'), 'ARR-WK8F', '리모컨', 1, 48000, 3);

-- ───── 홈멀티 7+7평 [냉방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AJ040TXJ2KH'), 'AR07B1100HZQNKO', '실내기', 2, 362000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ040TXJ2KH'), 'AJ040TXJ2KHXKO', '실외기', 1, 968000, 2),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ040TXJ2KH'), 'ARR-WK8F', '리모컨', 2, 48000, 3);

-- ───── 홈멀티 7+9평 [냉방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AJ050TXJ2KH'), 'AR07B1100HZQNKO', '실내기(7)', 1, 362000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ050TXJ2KH'), 'AR09B1100HZQNKO', '실내기(9)', 1, 475000, 2),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ050TXJ2KH'), 'AJ050TXJ2KHXKO', '실외기', 1, 1127000, 3),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ050TXJ2KH'), 'ARR-WK8F', '리모컨', 2, 48000, 4);

-- ───── 홈멀티 7+7+9평 [냉방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AJ068TXJ3KH'), 'AR07B1100HZQNKO', '실내기(7)', 2, 362000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ068TXJ3KH'), 'AR09B1100HZQNKO', '실내기(9)', 1, 475000, 2),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ068TXJ3KH'), 'AJ068TXJ3KHXKO', '실외기', 1, 1585000, 3),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ068TXJ3KH'), 'ARR-WK8F', '리모컨', 3, 48000, 4);

-- ───── 홈멀티 7+9+11평 [냉방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AJ080TXJ3KH'), 'AR07B1100HZQNKO', '실내기(7)', 1, 362000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ080TXJ3KH'), 'AR09B1100HZQNKO', '실내기(9)', 1, 475000, 2),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ080TXJ3KH'), 'AR11B1100HZQNKO', '실내기(11)', 1, 530000, 3),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ080TXJ3KH'), 'AJ080TXJ3KHXKO', '실외기', 1, 2019000, 4),
  ((SELECT id FROM product_sets WHERE set_model = 'AJ080TXJ3KH'), 'ARR-WK8F', '리모컨', 3, 48000, 5);

-- ───── 스탠드 17평 [냉방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AF17T6474EZS'), 'AF17T6474EZSNKO', '실내기', 1, 1050000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AF17T6474EZS'), 'AF17T6474EZSXKO', '실외기', 1, 1050000, 2);

-- ───── 스탠드 23평 [냉방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AF23T7674EZS'), 'AF23T7674EZSNKO', '실내기', 1, 1375000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AF23T7674EZS'), 'AF23T7674EZSXKO', '실외기', 1, 1375000, 2);

-- ───── 스탠드 17평 [냉난방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AF17B6474EZN'), 'AF17B6474EZNNKO', '실내기', 1, 1225000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AF17B6474EZN'), 'AF17B6474EZNXKO', '실외기', 1, 1225000, 2);

-- ───── 스탠드 23평 [냉난방] 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AF23B7674EZN'), 'AF23B7674EZNNKO', '실내기', 1, 1550000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AF23B7674EZN'), 'AF23B7674EZNXKO', '실외기', 1, 1550000, 2);

-- ───── 천장형 1Way 11평 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AP110RAPPBH1'), 'AP110RAPPBH1NKO', '실내기', 1, 925000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AP110RAPPBH1'), 'AP110RAPPBH1XKO', '실외기', 1, 925000, 2);

-- ───── 천장형 1Way 14평 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AP145RAPPBH1'), 'AP145RAPPBH1NKO', '실내기', 1, 1200000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AP145RAPPBH1'), 'AP145RAPPBH1XKO', '실외기', 1, 1200000, 2);

-- ───── 천장형 4Way 11평 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AP110RAPPBH4'), 'AP110RAPPBH4NKO', '실내기', 1, 1025000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AP110RAPPBH4'), 'AP110RAPPBH4XKO', '실외기', 1, 1025000, 2);

-- ───── 천장형 4Way 14평 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AP145RAPPBH4'), 'AP145RAPPBH4NKO', '실내기', 1, 1300000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AP145RAPPBH4'), 'AP145RAPPBH4XKO', '실외기', 1, 1300000, 2);

-- ───── 시스템 7평 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AC070TNHPKG'), 'AC070TNHPKGNKO', '실내기', 1, 1400000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AC070TNHPKG'), 'AC070TNHPKGXKO', '실외기', 1, 1400000, 2);

-- ───── 시스템 12평 부품 ─────
INSERT INTO products (set_id, model_name, product_type, quantity, base_price, sort_order) VALUES
  ((SELECT id FROM product_sets WHERE set_model = 'AC120TNHPKG'), 'AC120TNHPKGNKO', '실내기', 1, 1600000, 1),
  ((SELECT id FROM product_sets WHERE set_model = 'AC120TNHPKG'), 'AC120TNHPKGXKO', '실외기', 1, 1600000, 2);


-- ============================================
-- 확인: 데이터가 잘 들어갔는지 조회
-- ============================================
-- SELECT count(*) as "SET 수" FROM product_sets;      -- 20개여야 함
-- SELECT count(*) as "부품 수" FROM products;          -- 약 50개
-- SELECT count(*) as "업체 수" FROM companies;         -- 5개
