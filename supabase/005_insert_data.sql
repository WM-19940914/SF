-- ============================================
-- 삼성 출고가 데이터 INSERT
-- 004_new_schema.sql 실행 후 이 파일 실행
-- Supabase SQL Editor에서 실행하세요!
-- ============================================

-- 기존 데이터 삭제
DELETE FROM products;
DELETE FROM product_sets;

-- ============================================
-- SET 상품 데이터 INSERT
-- ============================================

-- 1. 벽걸이 6평 [냉방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉방', '벽걸이 6평 [냉방] SET', 'AR06D1150HZ', 603000, 33, 404000, '구형', 1);

-- 2. 벽걸이 13평 [냉방] SET (구형)
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉방', '벽걸이 13평 [냉방] SET', 'AR13D9150HZ', 1423000, 37, 898300, '구형', 2);

-- 3. 벽걸이 7평 [냉방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉방', '벽걸이 7평 [냉방] SET', 'AR60F07D12W', 925000, 33, 621800, '신형/ 리모컨포함', 3);

-- 4. 벽걸이 7평 [냉방]-1등급 SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉방', '벽걸이 7평 [냉방]-1등급 SET', 'AR60F07D11W', 1045000, 33, 702500, '신형/ 리모컨포함', 4);

-- 5. 벽걸이 9평 [냉방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉방', '벽걸이 9평 [냉방] SET', 'AR60F09D11W', 1195000, 33, 802400, '신형/ 리모컨포함', 5);

-- 6. 벽걸이 10평 [냉방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉방', '벽걸이 10평 [냉방] SET', 'AR50F10D13H', 825000, 33, 553800, '신형/ 리모컨포함', 6);

-- 7. 벽걸이 11평 [냉방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉방', '벽걸이 11평 [냉방] SET', 'AR60F11D11W', 1223000, 33, 820500, '신형/ 리모컨포함', 7);

-- 8. 벽걸이 13평 [냉방] SET (신형)
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉방', '벽걸이 13평 [냉방] SET', 'AR60F13D12W', 1423000, 33, 954400, '신형/ 리모컨포함', 8);

-- 9. 벽걸이 15평 [냉방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉방', '벽걸이 15평 [냉방] SET', 'AR60F15D12W', 1523000, 33, 1022400, '신형/ 리모컨포함', 9);

-- 10. 벽걸이 7평 무풍 [냉난방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉난방', '벽걸이 7평 무풍 [냉난방] SET', 'AR60F07C11W', 1633000, 32, 1102800, '신형/ 리모컨포함', 10);

-- 11. 벽걸이 7평 [냉난방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉난방', '벽걸이 7평 [냉난방] SET', 'AR60F07C12W', 1355000, 32, 914800, '신형/ 리모컨포함', 11);

-- 12. 벽걸이 7평 [냉난방]-3등급 SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉난방', '벽걸이 7평 [냉난방]-3등급 SET', 'AR60F07C14W', 1255000, 32, 847300, '신형/ 리모컨포함', 12);

-- 13. 벽걸이 9평 [냉난방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉난방', '벽걸이 9평 [냉난방] SET', 'AR60F09C13W', 1455000, 32, 982700, '신형/ 리모컨포함', 13);

-- 14. 벽걸이 11평 [냉난방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉난방', '벽걸이 11평 [냉난방] SET', 'AR60F11C13W', 1633000, 32, 1102800, '신형/ 리모컨포함', 14);

-- 15. 벽걸이 13평 [냉난방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉난방', '벽걸이 13평 [냉난방] SET', 'AR60F13C13W', 1733000, 33, 1169700, '신형/ 리모컨포함', 15);

-- 16. 벽걸이 16평 [냉난방] SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('벽걸이형', '냉난방', '벽걸이 16평 [냉난방] SET', 'AR60F16C14W', 1983000, 32, 1339600, '신형/ 리모컨포함', 16);

-- 17. 홈멀티[17평]유풍-베이지 SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('투인원', '냉방', '홈멀티[17평]유풍-베이지 SET', 'AF60F17D11BR', 1980000, 29, 1399800, '화이트/그레이', 17);

-- 18. 스탠드[17평]유풍-베이지 SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('FAC', '냉방', '스탠드[17평]유풍-베이지 SET', 'AF60F17D11B', 1680000, 26, 1249400, '신형/ 리모컨포함', 18);

-- 19. 홈멀티[17평]무풍-베이지 SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('투인원', '냉방', '홈멀티[17평]무풍-베이지 SET', 'AF70F17D11BR', 2500000, 32, 1695100, '화이트/그레이', 19);

-- 20. 스탠드[17평]무풍-베이지 SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('FAC', '냉방', '스탠드[17평]무풍-베이지 SET', 'AF70F17D11B', 2200000, 32, 1492200, '신형/ 리모컨포함', 20);

-- 21. 홈멀티[19평]유풍-베이지 SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('투인원', '냉방', '홈멀티[19평]유풍-베이지 SET', 'AF60F19D11BR', 2180000, 29, 1541000, '화이트/그레이', 21);

-- 22. 스탠드[19평]유풍-베이지 SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('FAC', '냉방', '스탠드[19평]유풍-베이지 SET', 'AF60F19D11B', 1880000, 29, 1328600, '신형/ 리모컨포함', 22);

-- 23. 홈멀티[19평]무풍-베이지 SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('투인원', '냉방', '홈멀티[19평]무풍-베이지 SET', 'AF70F19D11BR', 2780000, 32, 1885200, '화이트/그레이', 23);

-- 24. 스탠드[19평]무풍-베이지 SET
INSERT INTO product_sets (category, cooling_type, set_name, set_model, factory_price, dc_rate, sale_price, note, sort_order)
VALUES ('FAC', '냉방', '스탠드[19평]무풍-베이지 SET', 'AF70F19D11B', 2480000, 32, 1681300, '신형/ 리모컨포함', 24);

-- ============================================
-- 구성품 데이터 INSERT
-- ============================================

-- 1. AR06D1150HZ 구성품
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 6평 [냉방] 실내기', 'AR06D1150HZN', 271000, 33, 181566, FALSE, 1 FROM product_sets WHERE set_model = 'AR06D1150HZ';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 6평 [냉방] 실외기', 'AR06D1150HAX', 332000, 33, 222434, FALSE, 2 FROM product_sets WHERE set_model = 'AR06D1150HZ';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 6평~10평', 'FRC-1438NB2', 55000, 30, 38500, TRUE, 3 FROM product_sets WHERE set_model = 'AR06D1150HZ';

-- 2. AR13D9150HZ 구성품
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 13평 [냉방] 실내기', 'AR13D9150HZN', 613000, 32, 419160, FALSE, 1 FROM product_sets WHERE set_model = 'AR13D9150HZ';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 13평 [냉방] 실외기', 'AR13D9150HDX', 810000, 41, 479140, FALSE, 2 FROM product_sets WHERE set_model = 'AR13D9150HZ';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉전 11평~13평', 'FRC-1412NA2', 77000, 30, 53900, TRUE, 3 FROM product_sets WHERE set_model = 'AR13D9150HZ';

-- 3. AR60F07D12W 구성품
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 7평 [냉방] 실내기', 'AR60F07D12WNKO', 362000, 33, 244278, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F07D12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 7평 [냉방] 실외기', 'AR60F07D12WXKO', 515000, 33, 347522, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F07D12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F07D12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉전 6평~10평', 'FRC-1438NA2', 55000, 30, 38500, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F07D12W';

-- 4. AR60F07D11W 구성품
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 7평 [냉방]-1등급 실내기', 'AR60F07D11WNKO', 387000, 33, 261041, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F07D11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 7평 [냉방]-1등급 실외기', 'AR60F07D11WXKO', 610001, 33, 411459, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F07D11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F07D11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉전 6평~10평', 'FRC-1438NA2', 55000, 30, 38500, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F07D11W';

-- 5. AR60F09D11W 구성품
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 9평 [냉방] 실내기', 'AR60F09D11WNKO', 467000, 33, 314482, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F09D11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 9평 [냉방] 실외기', 'AR60F09D11WXKO', 680000, 33, 457918, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F09D11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F09D11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉전 6평~10평', 'FRC-1438NA2', 55000, 30, 38500, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F09D11W';

-- 6. AR50F10D13H 구성품
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 10평 [냉방] 실내기', 'AR50F10D13HNKO', 324001, 33, 217971, FALSE, 1 FROM product_sets WHERE set_model = 'AR50F10D13H';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 10평 [냉방] 실외기', 'AR50F10D13HXKO', 465000, 33, 312829, FALSE, 2 FROM product_sets WHERE set_model = 'AR50F10D13H';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-NK3F', 36000, 36, 23000, FALSE, 3 FROM product_sets WHERE set_model = 'AR50F10D13H';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉전 6평~10평', 'FRC-1438NA2', 55000, 30, 38500, TRUE, 4 FROM product_sets WHERE set_model = 'AR50F10D13H';

-- 7. AR60F11D11W 구성품
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 11평 [냉방] 실내기', 'AR60F11D11WNKO', 485000, 33, 326291, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F11D11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 11평 [냉방] 실외기', 'AR60F11D11WXKO', 690000, 33, 464209, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F11D11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F11D11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉전 11평~13평', 'FRC-1412NA2', 77000, 30, 53900, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F11D11W';

-- 8. AR60F13D12W 구성품
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 13평 [냉방] 실내기', 'AR60F13D12WNKO', 565000, 33, 379844, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F13D12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 13평 [냉방] 실외기', 'AR60F13D12WXKO', 810000, 33, 544556, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F13D12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F13D12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉전 11평~13평', 'FRC-1412NA2', 77000, 30, 53900, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F13D12W';

-- 9. AR60F15D12W 구성품
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 15평 [냉방] 실내기', 'AR60F15D12WNKO', 605000, 33, 407052, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F15D12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 15평 [냉방] 실외기', 'AR60F15D12WXKO', 870000, 33, 585348, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F15D12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F15D12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉전 15평', 'FRC-1458XA2', 77000, 30, 53900, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F15D12W';

-- 10. AR60F07C11W 구성품 (벽걸이 7평 무풍 냉난방)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 7평 [냉난방] 실내기', 'AR60F07C11WNKO', 465000, 32, 314733, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F07C11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 7평 [냉난방] 실외기', 'AR60F07C11WXKO', 1120000, 32, 758067, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F07C11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F07C11W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉난방 7평~11평 ver1', 'FRH-1412NA3', 77000, 30, 53900, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F07C11W';

-- 11. AR60F07C12W 구성품 (벽걸이 7평 냉난방)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 7평 [냉난방] 실내기', 'AR60F07C12WNKO', 457001, 32, 309375, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F07C12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 7평 [냉난방] 실외기', 'AR60F07C12WXKO', 850000, 32, 575425, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F07C12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F07C12W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉난방 7평~11평', 'FRH-1438NH3', 55000, 30, 38500, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F07C12W';

-- 12. AR60F07C14W 구성품 (벽걸이 7평 냉난방 3등급)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 7평 [냉난방] SET 3등급 실내기', 'AR60F07C14WNKO', 407000, 32, 275593, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F07C14W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 7평 [냉난방] SET 3등급 실외기', 'AR60F07C14WXKO', 800000, 32, 541707, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F07C14W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F07C14W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉난방 7평~11평', 'FRH-1438NH3', 55000, 30, 38500, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F07C14W';

-- 13. AR60F09C13W 구성품 (벽걸이 9평 냉난방)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 9평 [냉난방] SET 실내기', 'AR60F09C13WNKO', 497000, 32, 336526, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F09C13W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 9평 [냉난방] SET 실외기', 'AR60F09C13WXKO', 910000, 32, 616174, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F09C13W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F09C13W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉난방 7평~11평', 'FRH-1438NH3', 55000, 30, 38500, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F09C13W';

-- 14. AR60F11C13W 구성품 (벽걸이 11평 냉난방)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 11평 [냉난방] SET 실내기', 'AR60F11C13WNKO', 565000, 32, 382418, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F11C13W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 11평 [냉난방] SET 실외기', 'AR60F11C13WXKO', 1020000, 32, 690382, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F11C13W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F11C13W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉난방 7평 11평 ver.1', 'FRH-1412NA3', 77000, 30, 53900, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F11C13W';

-- 15. AR60F13C13W 구성품 (벽걸이 13평 냉난방)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 13평 [냉난방] 실내기', 'AR60F13C13WNKO', 479001, 32, 323986, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F13C13W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 13평 [냉난방] 실외기', 'AR60F13C13WXKO', 1206000, 32, 815714, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F13C13W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F13C13W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉난방 13~16평', 'FRH-1412XA3', 77000, 30, 53900, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F13C13W';

-- 16. AR60F16C14W 구성품 (벽걸이 16평 냉난방)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 16평 [냉난방] 실내기', 'AR60F16C14WNKO', 699001, 32, 473080, FALSE, 1 FROM product_sets WHERE set_model = 'AR60F16C14W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '벽걸이 16평 [냉난방] 실외기', 'AR60F16C14WXKO', 1236000, 32, 836520, FALSE, 2 FROM product_sets WHERE set_model = 'AR60F16C14W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AR60F16C14W';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '자재박스 냉난방 13~16평', 'FRH-1412XA3', 77000, 30, 53900, TRUE, 4 FROM product_sets WHERE set_model = 'AR60F16C14W';

-- 17. AF60F17D11BR 구성품 (홈멀티 17평 유풍)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 홈멀티 17평 유풍-베이지 실내기 스탠드', 'AF60F17D11BN', 884000, 28, 638158, FALSE, 1 FROM product_sets WHERE set_model = 'AF60F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 홈멀티 17평 유풍-베이지 실외기', 'AF60F17D1QBX', 760000, 28, 548642, FALSE, 2 FROM product_sets WHERE set_model = 'AF60F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 실내기 6평 벽걸이', 'AR60F06D1A0Q', 252000, 37, 160000, FALSE, 3 FROM product_sets WHERE set_model = 'AF60F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '구형 무선리모컨', 'AFR-QC3F', 36000, 36, 23000, FALSE, 4 FROM product_sets WHERE set_model = 'AF60F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 5 FROM product_sets WHERE set_model = 'AF60F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 자재박스 17평', 'FPC-1412YAF2', 143000, 30, 100100, TRUE, 6 FROM product_sets WHERE set_model = 'AF60F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '홈멀티 벽걸이용 자재박스', 'FRC-1438XAF2', 77000, 30, 53900, TRUE, 7 FROM product_sets WHERE set_model = 'AF60F17D11BR';

-- 18. AF60F17D11B 구성품 (스탠드 17평 유풍)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 17평 유풍-베이지 실내기', 'AF60F17D11BN', 884000, 25, 659451, FALSE, 1 FROM product_sets WHERE set_model = 'AF60F17D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 17평 유풍-베이지 실외기', 'AF60F17D1QBX', 760000, 25, 566949, FALSE, 2 FROM product_sets WHERE set_model = 'AF60F17D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '구형 무선리모컨', 'AFR-QC3F', 36000, 36, 23000, FALSE, 3 FROM product_sets WHERE set_model = 'AF60F17D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 자재박스 17평', 'FPC-1412YAF2', 143000, 30, 100100, TRUE, 4 FROM product_sets WHERE set_model = 'AF60F17D11B';

-- 19. AF70F17D11BR 구성품 (홈멀티 17평 무풍)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 홈멀티 17평 무풍-베이지 실내기 스탠드', 'AF70F17D11BN', 1116000, 31, 764968, FALSE, 1 FROM product_sets WHERE set_model = 'AF70F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 홈멀티 17평 무풍-베이지 실외기', 'AF70F17D1QBX', 1036000, 31, 710132, FALSE, 2 FROM product_sets WHERE set_model = 'AF70F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 실내기 6평 벽걸이', 'AR60F06D1A0Q', 252000, 37, 160000, FALSE, 3 FROM product_sets WHERE set_model = 'AF70F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨_클래식', 'AFR-BC3F', 48000, 38, 30000, FALSE, 4 FROM product_sets WHERE set_model = 'AF70F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 5 FROM product_sets WHERE set_model = 'AF70F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 자재박스 17평', 'FPC-1412YAF2', 143000, 30, 100100, TRUE, 6 FROM product_sets WHERE set_model = 'AF70F17D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '홈멀티 벽걸이용 자재박스', 'FRC-1438XAF2', 77000, 30, 53900, TRUE, 7 FROM product_sets WHERE set_model = 'AF70F17D11BR';

-- 20. AF70F17D11B 구성품 (스탠드 17평 무풍)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 17평 무풍-베이지 실내기', 'AF70F17D11BN', 1116001, 32, 758175, FALSE, 1 FROM product_sets WHERE set_model = 'AF70F17D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 17평 무풍-베이지 실외기', 'AF70F17D1QBX', 1036000, 32, 703825, FALSE, 2 FROM product_sets WHERE set_model = 'AF70F17D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨_클래식', 'AFR-BC3F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AF70F17D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 자재박스 17평', 'FPC-1412YAF2', 143000, 30, 100100, TRUE, 4 FROM product_sets WHERE set_model = 'AF70F17D11B';

-- 21. AF60F19D11BR 구성품 (홈멀티 19평 유풍)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 홈멀티 19평 유풍-베이지 실내기 스탠드', 'AF60F19D11BN', 1084001, 28, 780668, FALSE, 1 FROM product_sets WHERE set_model = 'AF60F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 홈멀티 19평 유풍-베이지 실외기', 'AF60F19D1PBX', 760000, 28, 547332, FALSE, 2 FROM product_sets WHERE set_model = 'AF60F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 실내기 6평 벽걸이', 'AR60F06D1A0Q', 252000, 37, 160000, FALSE, 3 FROM product_sets WHERE set_model = 'AF60F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '구형 무선리모컨', 'AFR-QC3F', 36000, 36, 23000, FALSE, 4 FROM product_sets WHERE set_model = 'AF60F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 5 FROM product_sets WHERE set_model = 'AF60F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 자재박스 19평', 'FPC-1458YAF2', 143000, 30, 100100, TRUE, 6 FROM product_sets WHERE set_model = 'AF60F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '홈멀티 벽걸이용 자재박스', 'FRC-1438XAF2', 77000, 30, 53900, TRUE, 7 FROM product_sets WHERE set_model = 'AF60F19D11BR';

-- 22. AF60F19D11B 구성품 (스탠드 19평 유풍)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 19평 유풍-베이지 실내기', 'AF60F19D11BN', 1084001, 29, 767500, FALSE, 1 FROM product_sets WHERE set_model = 'AF60F19D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 19평 유풍-베이지 실외기', 'AF60F19D1PBX', 760000, 29, 538100, FALSE, 2 FROM product_sets WHERE set_model = 'AF60F19D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 52, 23000, FALSE, 3 FROM product_sets WHERE set_model = 'AF60F19D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 자재박스 19평', 'FPC-1458YAF2', 143000, 30, 100100, TRUE, 4 FROM product_sets WHERE set_model = 'AF60F19D11B';

-- 23. AF70F19D11BR 구성품 (홈멀티 19평 무풍)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 홈멀티 19평 무풍-베이지실내기 스탠드', 'AF70F19D11BN', 1396000, 32, 955847, FALSE, 1 FROM product_sets WHERE set_model = 'AF70F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 홈멀티 19평 무풍-베이지 실외기', 'AF70F17D1QBX', 1036000, 32, 709353, FALSE, 2 FROM product_sets WHERE set_model = 'AF70F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '투인원 실내기 6평 벽걸이', 'AR60F06D1A0Q', 252000, 37, 160000, FALSE, 3 FROM product_sets WHERE set_model = 'AF70F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨_클래식', 'AFR-BC3F', 48000, 38, 30000, FALSE, 4 FROM product_sets WHERE set_model = 'AF70F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨', 'ARR-WK8F', 48000, 38, 30000, FALSE, 5 FROM product_sets WHERE set_model = 'AF70F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 자재박스 19평', 'FPC-1458YAF2', 143000, 30, 100100, TRUE, 6 FROM product_sets WHERE set_model = 'AF70F19D11BR';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '홈멀티 벽걸이용 자재박스', 'FRC-1438XAF2', 77000, 30, 53900, TRUE, 7 FROM product_sets WHERE set_model = 'AF70F19D11BR';

-- 24. AF70F19D11B 구성품 (스탠드 19평 무풍)
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 19평 무풍-베이지 실내기', 'AF70F19D11BN', 1396000, 32, 947868, FALSE, 1 FROM product_sets WHERE set_model = 'AF70F19D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 19평 무풍-베이지 실외기', 'AF70F17D1QBX', 1036000, 32, 703432, FALSE, 2 FROM product_sets WHERE set_model = 'AF70F19D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '무선리모컨_클래식', 'AFR-BC3F', 48000, 38, 30000, FALSE, 3 FROM product_sets WHERE set_model = 'AF70F19D11B';
INSERT INTO products (set_id, part_name, model_name, factory_price, dc_rate, sale_price, is_material, sort_order)
SELECT id, '스탠드 자재박스 19평', 'FPC-1458YAF2', 143000, 30, 100100, TRUE, 4 FROM product_sets WHERE set_model = 'AF70F19D11B';

-- ============================================
-- 데이터 확인
-- ============================================
SELECT 'product_sets 개수: ' || COUNT(*) FROM product_sets;
SELECT 'products 개수: ' || COUNT(*) FROM products;
