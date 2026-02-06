// ============================================
// 업체(거래처) 관리 페이지
// → 업체 목록 조회, 추가, 수정 기능
// → 더미 데이터로 동작 (나중에 Supabase 연결)
// ============================================

"use client";

import { useState } from "react";
import {
  mockCompanies,
  type Company,
} from "@/data/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 등급별 뱃지 색상
function gradeBadge(grade: Company["grade"]) {
  switch (grade) {
    case "A":
      return <Badge className="bg-green-600">A등급</Badge>;
    case "B":
      return <Badge className="bg-blue-600">B등급</Badge>;
    case "C":
      return <Badge variant="secondary">C등급</Badge>;
  }
}

// 빈 업체 폼 데이터 (새 업체 추가할 때 사용)
const emptyCompany: Omit<Company, "id" | "createdAt"> = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  grade: "C",
  address: "",
};

export default function CompaniesPage() {
  // 업체 목록 (더미 데이터로 시작, 추가/수정하면 여기서 변경)
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);

  // 다이얼로그 열림/닫힘 상태
  const [dialogOpen, setDialogOpen] = useState(false);

  // 수정 중인 업체 (null이면 새 업체 추가 모드)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  // 폼 입력 데이터
  const [formData, setFormData] = useState(emptyCompany);

  // "업체 추가" 버튼 클릭
  function handleAdd() {
    setEditingCompany(null);
    setFormData(emptyCompany);
    setDialogOpen(true);
  }

  // "수정" 버튼 클릭
  function handleEdit(company: Company) {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      contactPerson: company.contactPerson,
      phone: company.phone,
      email: company.email,
      grade: company.grade,
      address: company.address,
    });
    setDialogOpen(true);
  }

  // "삭제" 버튼 클릭
  function handleDelete(companyId: string) {
    if (confirm("정말 삭제하시겠습니까?")) {
      setCompanies(companies.filter((c) => c.id !== companyId));
    }
  }

  // 다이얼로그에서 "저장" 클릭
  function handleSave() {
    if (editingCompany) {
      // 수정 모드: 기존 업체 정보 업데이트
      setCompanies(
        companies.map((c) =>
          c.id === editingCompany.id
            ? { ...c, ...formData }
            : c
        )
      );
    } else {
      // 추가 모드: 새 업체 생성
      const newCompany: Company = {
        ...formData,
        id: `comp-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCompanies([...companies, newCompany]);
    }
    setDialogOpen(false);
  }

  return (
    <div>
      {/* 페이지 제목 + 추가 버튼 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">업체 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">
            거래처 등록, 수정, 등급 관리
          </p>
        </div>
        <Button onClick={handleAdd}>+ 업체 추가</Button>
      </div>

      {/* 업체 목록 테이블 */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>업체명</TableHead>
              <TableHead>담당자</TableHead>
              <TableHead>연락처</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>등급</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.contactPerson}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{gradeBadge(company.grade)}</TableCell>
                <TableCell>{company.createdAt}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(company)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(company.id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 업체 추가/수정 다이얼로그 (팝업) */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>
              {editingCompany ? "업체 수정" : "업체 추가"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* 업체명 */}
            <div className="grid gap-2">
              <Label htmlFor="name">업체명</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="예: 한빛전자"
              />
            </div>

            {/* 담당자 */}
            <div className="grid gap-2">
              <Label htmlFor="contactPerson">담당자</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) =>
                  setFormData({ ...formData, contactPerson: e.target.value })
                }
                placeholder="예: 김철수"
              />
            </div>

            {/* 연락처 */}
            <div className="grid gap-2">
              <Label htmlFor="phone">연락처</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="예: 010-1234-5678"
              />
            </div>

            {/* 이메일 */}
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="예: kim@company.com"
              />
            </div>

            {/* 주소 */}
            <div className="grid gap-2">
              <Label htmlFor="address">주소</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="예: 서울시 강남구..."
              />
            </div>

            {/* 등급 */}
            <div className="grid gap-2">
              <Label>등급</Label>
              <Select
                value={formData.grade}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    grade: value as Company["grade"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A등급 (최우대)</SelectItem>
                  <SelectItem value="B">B등급 (우대)</SelectItem>
                  <SelectItem value="C">C등급 (일반)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSave}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
