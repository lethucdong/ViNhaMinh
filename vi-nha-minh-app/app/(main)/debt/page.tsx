"use client";

import MainLayout from '@/components/shared/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_DATA, formatFullCurrency } from '@/data/mock_data';
import { PiggyBank, HandCoins, ArrowLeftRight, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const getRemainingAmount = (debt: typeof MOCK_DATA.debt_records[0]) =>
  debt.principal_amount - debt.paid_amount;

const calculateDebtSummary = () => {
  const lent = MOCK_DATA.debt_records.filter(d => d.debt_type === 'LENT' && d.status === 'ACTIVE');
  const borrowed = MOCK_DATA.debt_records.filter(d => d.debt_type === 'BORROWED' && d.status === 'ACTIVE');

  const totalLent = lent.reduce((sum, d) => sum + getRemainingAmount(d), 0);
  const totalBorrowed = borrowed.reduce((sum, d) => sum + getRemainingAmount(d), 0);

  return { totalLent, totalBorrowed };
};

export default function DebtPage() {
  const { totalLent, totalBorrowed } = calculateDebtSummary();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <PiggyBank className="w-7 h-7" /> <span>Sổ Nợ & Khoản Vay</span>
          </h1>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-5 h-5 mr-2" /> Ghi Nhận Nợ Mới
          </Button>
        </div>

        {/* Tổng quan Nợ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-green-500 dark:bg-green-700 text-primary-foreground border-t-4 border-white/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-80 flex items-center space-x-2">
                <HandCoins className='w-4 h-4' /> <span>TÔI PHẢI THU (ĐANG CHO VAY)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatFullCurrency(totalLent)}</div>
              <p className="text-xs opacity-80 mt-1">Tổng tiền chờ người khác trả</p>
            </CardContent>
          </Card>

          <Card className="bg-red-500 dark:bg-red-700 text-primary-foreground border-t-4 border-white/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-80 flex items-center space-x-2">
                <ArrowLeftRight className='w-4 h-4' /> <span>TÔI PHẢI TRẢ (ĐANG ĐI VAY)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatFullCurrency(totalBorrowed)}</div>
              <p className="text-xs opacity-80 mt-1">Tổng nghĩa vụ cần thanh toán</p>
            </CardContent>
          </Card>
        </div>

        {/* Danh sách Khoản Nợ */}
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Danh Sách Khoản Nợ Đang Hoạt Động</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loại</TableHead>
                    <TableHead>Đối Tượng</TableHead>
                    <TableHead className='hidden sm:table-cell'>Số Tiền Gốc</TableHead>
                    <TableHead>Đã Trả</TableHead>
                    <TableHead className='text-right'>Còn Lại</TableHead>
                    <TableHead className="text-right w-[120px]">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_DATA.debt_records.filter(d => d.status === 'ACTIVE').map((debt) => (
                    <TableRow key={debt.id} className={debt.debt_type === 'BORROWED' ? 'bg-red-50/50 dark:bg-red-900/10' : ''}>
                      <TableCell className="font-medium">
                        <Badge variant={debt.debt_type === 'LENT' ? 'default' : 'destructive'} className='w-[80px] justify-center'>
                          {debt.debt_type === 'LENT' ? 'Cho Vay' : 'Đi Vay'}
                        </Badge>
                      </TableCell>
                      <TableCell>{debt.contact_name}</TableCell>
                      <TableCell className='hidden sm:table-cell text-muted-foreground'>{formatFullCurrency(debt.principal_amount)}</TableCell>
                      <TableCell className='text-green-500 dark:text-green-400'>{formatFullCurrency(debt.paid_amount)}</TableCell>
                      <TableCell className='font-bold text-right'>{formatFullCurrency(getRemainingAmount(debt))}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Chi tiết</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}