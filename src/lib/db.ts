// ============================================
// DB 헬퍼 함수 모음
// → Supabase에서 데이터를 가져오거나 수정하는 함수들
// → 비유: "웨이터" - 주방(DB)에 주문을 전달하고 음식을 가져옴
// ============================================

import { createClient } from "@/lib/supabase/client";

// ---------- 타입 정의 ----------

// SET 상품 (벽걸이 7평 [냉방] 같은 묶음)
export interface ProductSet {
  id: string;
  set_name: string;       // SET 이름
  set_model: string;      // SET 모델명
  category: string;       // 대분류 (벽걸이/홈멀티/스탠드/천장형/시스템)
  cooling_type: string;   // 냉방/냉난방
  capacity: string;       // 평수
  total_price: number;    // SET 출고가 합계
  note: string | null;    // 비고
  sort_order: number;     // 정렬 순서
  created_at: string;
  // products 조인 시 포함
  products?: Product[];
}

// 개별 부품 (실내기, 실외기, 리모컨 등)
export interface Product {
  id: string;
  set_id: string;         // 어떤 SET에 속하는지
  model_name: string;     // 모델명
  product_type: string;   // 실내기/실외기/리모컨/배관
  quantity: number;       // 수량
  base_price: number;     // 삼성 출고가
  sort_order: number;     // 정렬 순서
  created_at: string;
}

// 업체 정보
export interface Company {
  id: string;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  grade: string;
  address: string;
  created_at: string;
}

// ---------- SET 상품 관련 ----------

// SET 목록 조회 (부품 포함)
export async function getProductSets(): Promise<ProductSet[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product_sets")
    .select(`
      *,
      products (*)
    `)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("SET 목록 조회 실패:", error);
    return [];
  }

  // 각 SET의 부품도 sort_order로 정렬
  return (data || []).map((set) => ({
    ...set,
    products: (set.products || []).sort(
      (a: Product, b: Product) => a.sort_order - b.sort_order
    ),
  }));
}

// 특정 SET의 부품 목록 조회
export async function getProductsBySetId(setId: string): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("set_id", setId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("부품 목록 조회 실패:", error);
    return [];
  }

  return data || [];
}

// ---------- 부품 출고가 수정 ----------

// 부품 출고가 수정 + SET 합계 자동 재계산
export async function updateProductPrice(
  productId: string,
  newPrice: number
): Promise<boolean> {
  const supabase = createClient();

  // 1) 부품 출고가 수정
  const { error: updateError } = await supabase
    .from("products")
    .update({ base_price: newPrice })
    .eq("id", productId);

  if (updateError) {
    console.error("부품 출고가 수정 실패:", updateError);
    return false;
  }

  // 2) 해당 부품이 속한 SET의 id 조회
  const { data: product } = await supabase
    .from("products")
    .select("set_id")
    .eq("id", productId)
    .single();

  if (!product) return true; // 부품 수정은 성공했으니 true

  // 3) SET에 속한 모든 부품의 (출고가 × 수량) 합계 계산
  const { data: allProducts } = await supabase
    .from("products")
    .select("base_price, quantity")
    .eq("set_id", product.set_id);

  if (allProducts) {
    const totalPrice = allProducts.reduce(
      (sum, p) => sum + p.base_price * p.quantity,
      0
    );

    // 4) SET의 total_price 업데이트
    await supabase
      .from("product_sets")
      .update({ total_price: totalPrice })
      .eq("id", product.set_id);
  }

  return true;
}

// ---------- 업체 관련 ----------

// 업체 목록 조회
export async function getCompanies(): Promise<Company[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("업체 목록 조회 실패:", error);
    return [];
  }

  return data || [];
}
