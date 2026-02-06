// ============================================
// 더미 데이터 모음
// → 나중에 Supabase 연동하면 이 파일 대신 DB에서 가져옴
// → 지금은 화면 개발용으로 가짜 데이터 사용
// ============================================

// ---------- 타입 정의 ----------

// 업체(거래처) 정보
export interface Company {
  id: string;
  name: string;           // 업체명
  contactPerson: string;  // 담당자 이름
  phone: string;          // 연락처
  email: string;          // 이메일
  grade: "A" | "B" | "C"; // 등급
  address: string;        // 주소
  createdAt: string;      // 등록일
}

// 제품 정보 (삼성 에어컨/가전)
export interface Product {
  id: string;
  modelName: string;      // 모델명
  category: string;       // 카테고리 (에어컨, 냉난방기, 공기청정기 등)
  samsungPrice: number;   // 삼성 출고가 (원)
  dcRate: number;         // DC율 (%)
  purchasePrice: number;  // 매입가 = 출고가 × (1 - DC율)
}

// 장려금 설정 (전체 공통)
export interface IncentiveRates {
  sellIn: number;         // 셀인 장려금율 (%)
  sellOut: number;        // 셀아웃 장려금율 (%)
  quarterly: number;      // 분기 장려금율 (%)
  yearly: number;         // 년 장려금율 (%)
}

// 업체별 장려금 반영 비율
export interface CompanyIncentiveRate {
  companyId: string;
  companyName: string;
  sellInRate: number;     // 셀인 반영비율 (%) - 100이면 장려금 전액 반영
  sellOutRate: number;    // 셀아웃 반영비율 (%)
  quarterlyRate: number;  // 분기 반영비율 (%)
  yearlyRate: number;     // 년 반영비율 (%)
}

// 발주 정보
export interface Order {
  id: string;
  companyId: string;
  companyName: string;    // 업체명
  productId: string;
  productName: string;    // 제품 모델명
  quantity: number;       // 수량
  unitPrice: number;      // 단가
  totalPrice: number;     // 총액
  status: OrderStatus;    // 상태
  orderedAt: string;      // 발주일
  note: string;           // 비고
}

// 발주 상태 (순서대로 진행)
export type OrderStatus = "발주접수" | "확인" | "출고대기" | "출고완료" | "배송완료";

// 발주 상태 목록 (순서 중요)
export const ORDER_STATUS_LIST: OrderStatus[] = [
  "발주접수", "확인", "출고대기", "출고완료", "배송완료"
];

// 재고 정보
export interface Inventory {
  productId: string;
  productName: string;
  category: string;
  currentStock: number;   // 현재 재고
  minStock: number;       // 최소 유지 수량 (이 이하면 경고)
}

// 단가 공시 정보
export interface PublishedPrice {
  companyId: string;
  productId: string;
  calculatedPrice: number; // 자동 계산된 판매가
  adjustedPrice: number;   // 수동 조정된 판매가
  isPublished: boolean;    // 공시 여부
  publishedAt: string | null;
}


// ---------- 더미 데이터 ----------

// 업체 목록 (5개)
export const mockCompanies: Company[] = [
  {
    id: "comp-1",
    name: "한빛전자",
    contactPerson: "김철수",
    phone: "010-1234-5678",
    email: "kim@hanbit.com",
    grade: "A",
    address: "서울특별시 강남구 테헤란로 123",
    createdAt: "2024-01-15",
  },
  {
    id: "comp-2",
    name: "동양에어컨",
    contactPerson: "이영희",
    phone: "010-2345-6789",
    email: "lee@dongyang.com",
    grade: "A",
    address: "경기도 성남시 분당구 판교로 456",
    createdAt: "2024-02-01",
  },
  {
    id: "comp-3",
    name: "서울냉동",
    contactPerson: "박민수",
    phone: "010-3456-7890",
    email: "park@seoulcold.com",
    grade: "B",
    address: "서울특별시 영등포구 여의대로 789",
    createdAt: "2024-03-10",
  },
  {
    id: "comp-4",
    name: "대한공조",
    contactPerson: "최지영",
    phone: "010-4567-8901",
    email: "choi@daehanhvac.com",
    grade: "B",
    address: "인천광역시 연수구 인천타워대로 321",
    createdAt: "2024-04-20",
  },
  {
    id: "comp-5",
    name: "미래설비",
    contactPerson: "정수현",
    phone: "010-5678-9012",
    email: "jung@miraesetup.com",
    grade: "C",
    address: "경기도 수원시 영통구 광교로 654",
    createdAt: "2024-05-05",
  },
];

// 제품 목록 (10개) - 삼성 에어컨/가전
export const mockProducts: Product[] = [
  {
    id: "prod-1",
    modelName: "AR07T9170HZQ",
    category: "벽걸이 에어컨",
    samsungPrice: 850000,
    dcRate: 35,
    purchasePrice: 552500,  // 850000 × 0.65
  },
  {
    id: "prod-2",
    modelName: "AF17T6474EZS",
    category: "스탠드 에어컨",
    samsungPrice: 2100000,
    dcRate: 30,
    purchasePrice: 1470000,
  },
  {
    id: "prod-3",
    modelName: "AP110RAPPBH1S",
    category: "천장형 에어컨",
    samsungPrice: 1850000,
    dcRate: 32,
    purchasePrice: 1258000,
  },
  {
    id: "prod-4",
    modelName: "AC120TNHPKG",
    category: "시스템 에어컨",
    samsungPrice: 3200000,
    dcRate: 28,
    purchasePrice: 2304000,
  },
  {
    id: "prod-5",
    modelName: "AJ050TXJ2KH",
    category: "멀티 에어컨",
    samsungPrice: 1600000,
    dcRate: 33,
    purchasePrice: 1072000,
  },
  {
    id: "prod-6",
    modelName: "AP145RAPPBH1S",
    category: "천장형 에어컨",
    samsungPrice: 2400000,
    dcRate: 30,
    purchasePrice: 1680000,
  },
  {
    id: "prod-7",
    modelName: "AR12T9170HZQ",
    category: "벽걸이 에어컨",
    samsungPrice: 1050000,
    dcRate: 34,
    purchasePrice: 693000,
  },
  {
    id: "prod-8",
    modelName: "AC070TNHPKG",
    category: "시스템 에어컨",
    samsungPrice: 2800000,
    dcRate: 29,
    purchasePrice: 1988000,
  },
  {
    id: "prod-9",
    modelName: "AX060A9081WBD",
    category: "공기청정기",
    samsungPrice: 680000,
    dcRate: 25,
    purchasePrice: 510000,
  },
  {
    id: "prod-10",
    modelName: "DV16T8740BV",
    category: "건조기",
    samsungPrice: 1350000,
    dcRate: 22,
    purchasePrice: 1053000,
  },
];

// 장려금 기본 설정 (전체 공통)
export const mockIncentiveRates: IncentiveRates = {
  sellIn: 3.0,      // 셀인 장려금 3%
  sellOut: 2.5,     // 셀아웃 장려금 2.5%
  quarterly: 1.5,   // 분기 장려금 1.5%
  yearly: 1.0,      // 년 장려금 1%
};

// 업체별 장려금 반영 비율
// → A등급: 100% 반영, B등급: 70~80%, C등급: 50%
export const mockCompanyIncentiveRates: CompanyIncentiveRate[] = [
  {
    companyId: "comp-1",
    companyName: "한빛전자",
    sellInRate: 100,
    sellOutRate: 100,
    quarterlyRate: 100,
    yearlyRate: 100,
  },
  {
    companyId: "comp-2",
    companyName: "동양에어컨",
    sellInRate: 100,
    sellOutRate: 100,
    quarterlyRate: 100,
    yearlyRate: 100,
  },
  {
    companyId: "comp-3",
    companyName: "서울냉동",
    sellInRate: 80,
    sellOutRate: 70,
    quarterlyRate: 80,
    yearlyRate: 70,
  },
  {
    companyId: "comp-4",
    companyName: "대한공조",
    sellInRate: 70,
    sellOutRate: 70,
    quarterlyRate: 70,
    yearlyRate: 70,
  },
  {
    companyId: "comp-5",
    companyName: "미래설비",
    sellInRate: 50,
    sellOutRate: 50,
    quarterlyRate: 50,
    yearlyRate: 50,
  },
];

// 발주 목록 (5건)
export const mockOrders: Order[] = [
  {
    id: "ord-1",
    companyId: "comp-1",
    companyName: "한빛전자",
    productId: "prod-1",
    productName: "AR07T9170HZQ",
    quantity: 10,
    unitPrice: 520000,
    totalPrice: 5200000,
    status: "배송완료",
    orderedAt: "2025-01-10",
    note: "1월 납품 건",
  },
  {
    id: "ord-2",
    companyId: "comp-2",
    companyName: "동양에어컨",
    productId: "prod-3",
    productName: "AP110RAPPBH1S",
    quantity: 5,
    unitPrice: 1190000,
    totalPrice: 5950000,
    status: "출고완료",
    orderedAt: "2025-01-15",
    note: "강남 현장 납품",
  },
  {
    id: "ord-3",
    companyId: "comp-3",
    companyName: "서울냉동",
    productId: "prod-4",
    productName: "AC120TNHPKG",
    quantity: 3,
    unitPrice: 2200000,
    totalPrice: 6600000,
    status: "출고대기",
    orderedAt: "2025-01-20",
    note: "시스템 에어컨 설치 건",
  },
  {
    id: "ord-4",
    companyId: "comp-1",
    companyName: "한빛전자",
    productId: "prod-2",
    productName: "AF17T6474EZS",
    quantity: 8,
    unitPrice: 1400000,
    totalPrice: 11200000,
    status: "확인",
    orderedAt: "2025-01-25",
    note: "아파트 단지 납품",
  },
  {
    id: "ord-5",
    companyId: "comp-4",
    companyName: "대한공조",
    productId: "prod-6",
    productName: "AP145RAPPBH1S",
    quantity: 4,
    unitPrice: 1600000,
    totalPrice: 6400000,
    status: "발주접수",
    orderedAt: "2025-01-28",
    note: "오피스빌딩 천장형",
  },
];

// 재고 목록
export const mockInventory: Inventory[] = [
  { productId: "prod-1", productName: "AR07T9170HZQ", category: "벽걸이 에어컨", currentStock: 25, minStock: 10 },
  { productId: "prod-2", productName: "AF17T6474EZS", category: "스탠드 에어컨", currentStock: 12, minStock: 5 },
  { productId: "prod-3", productName: "AP110RAPPBH1S", category: "천장형 에어컨", currentStock: 8, minStock: 5 },
  { productId: "prod-4", productName: "AC120TNHPKG", category: "시스템 에어컨", currentStock: 3, minStock: 5 },
  { productId: "prod-5", productName: "AJ050TXJ2KH", category: "멀티 에어컨", currentStock: 15, minStock: 5 },
  { productId: "prod-6", productName: "AP145RAPPBH1S", category: "천장형 에어컨", currentStock: 6, minStock: 5 },
  { productId: "prod-7", productName: "AR12T9170HZQ", category: "벽걸이 에어컨", currentStock: 20, minStock: 10 },
  { productId: "prod-8", productName: "AC070TNHPKG", category: "시스템 에어컨", currentStock: 4, minStock: 3 },
  { productId: "prod-9", productName: "AX060A9081WBD", category: "공기청정기", currentStock: 30, minStock: 10 },
  { productId: "prod-10", productName: "DV16T8740BV", category: "건조기", currentStock: 18, minStock: 8 },
];

// ---------- 유틸리티 함수 ----------

// 숫자를 한국 원화 형식으로 변환 (예: 1,234,567원)
export function formatPrice(price: number): string {
  return price.toLocaleString("ko-KR") + "원";
}

// 숫자를 천 단위 콤마 형식으로 변환 (예: 1,234,567)
export function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}
