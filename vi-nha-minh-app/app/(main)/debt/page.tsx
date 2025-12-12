"use client";

import MainLayout from '@/components/shared/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_DATA, formatFullCurrency } from '@/data/mock_data';
import { PiggyBank, HandCoins, ArrowLeftRight, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Hàm tính số tiền còn lại (Giữ nguyên)
const getRemainingAmount = (debt: typeof MOCK_DATA.debt_records[0]) =>
  debt.principal_amount - debt.paid_amount;

// Hàm tính tổng quan nợ (Giữ nguyên)
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
      <div
        className="fixed bottom-16 right-4 z-[10] md:top-[95px] md:right-6 md:z-[50] h-fit">
        <div className="inline-block animate-pulse-heart">
          <Button
            // onClick={() => setIsTransactionFormOpen(true)}
            size="lg"
            // Giữ nguyên style gradient và animation tùy chỉnh của bạn
            className="text-white font-bold rounded-xl shadow-2xl shadow-indigo-600/70 dark:shadow-indigo-900/50 px-6 py-3 hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-glow cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-3" /> Ghi Nhận Nợ Mới
          </Button>
        </div>
      </div>
      <div className="space-y-8">
        <div className="flex justify-between items-center">

          {/* CHUẨN HÓA TIÊU ĐỀ H1 (4XL, EXTRABOLD, INDIGO) */}
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center space-x-3 text-indigo-700 dark:text-indigo-400">
            <PiggyBank className="w-7 h-7" /> <span>Sổ Nợ & Khoản Vay</span>
          </h1>
        </div>

        {/* Tổng quan Nợ (Giữ màu xanh/đỏ đặc trưng nhưng thêm style nhất quán) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD PHẢI THU (LENT) - MÀU XANH LÁ */}
          <Card className="bg-green-600 dark:bg-green-800 text-white shadow-xl shadow-green-500/40 
                                      transition-all duration-300 hover:shadow-green-500/60 rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium opacity-90 flex items-center space-x-2">
                <HandCoins className='w-5 h-5' /> <span>TÔI PHẢI THU (ĐANG CHO VAY)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold">{formatFullCurrency(totalLent)}</div>
              <p className="text-sm opacity-90 mt-1">Tổng tiền chờ người khác trả</p>
            </CardContent>
          </Card>

          {/* CARD PHẢI TRẢ (BORROWED) - MÀU ĐỎ */}
          <Card className="bg-red-600 dark:bg-red-800 text-white shadow-xl shadow-red-500/40 
                                      transition-all duration-300 hover:shadow-red-500/60 rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium opacity-90 flex items-center space-x-2">
                <ArrowLeftRight className='w-5 h-5' /> <span>TÔI PHẢI TRẢ (ĐANG ĐI VAY)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold">{formatFullCurrency(totalBorrowed)}</div>
              <p className="text-sm opacity-90 mt-1">Tổng nghĩa vụ cần thanh toán</p>
            </CardContent>
          </Card>
        </div>

        {/* Danh sách Khoản Nợ */}
        {/* Danh sách Khoản Nợ */}
        <Card className='shadow-xl rounded-xl'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold'>Danh Sách Khoản Nợ Đang Hoạt Động</CardTitle>
          </CardHeader>

          <CardContent className='p-0'>

            {/* DESKTOP TABLE VIEW */}
            <div className="hidden sm:block overflow-x-auto">
              <Table>
                <TableHeader className='bg-muted/50'>
                  <TableRow className='hover:bg-muted/50'>
                    <TableHead className='w-[80px]'>Loại</TableHead>
                    <TableHead>Đối Tượng</TableHead>
                    <TableHead>Số Tiền Gốc</TableHead>
                    <TableHead>Đã Trả</TableHead>
                    <TableHead className='text-right'>Còn Lại</TableHead>
                    <TableHead className="text-right w-[120px]">Hành động</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {MOCK_DATA.debt_records
                    .filter(d => d.status === 'ACTIVE')
                    .map((debt) => (
                      <TableRow
                        key={debt.id}
                        className={`hover:bg-secondary/50 transition-colors cursor-pointer 
                            ${debt.debt_type === 'BORROWED' ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}
                      >
                        <TableCell className="font-medium">
                          <Badge
                            className={`w-[80px] justify-center font-semibold text-white 
                      ${debt.debt_type === 'LENT' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {debt.debt_type === 'LENT' ? 'Cho Vay' : 'Đi Vay'}
                          </Badge>
                        </TableCell>

                        <TableCell className='font-medium'>{debt.contact_name}</TableCell>

                        <TableCell className='text-muted-foreground'>
                          {formatFullCurrency(debt.principal_amount)}
                        </TableCell>

                        <TableCell className='text-green-600 dark:text-green-400 font-medium'>
                          {formatFullCurrency(debt.paid_amount)}
                        </TableCell>

                        <TableCell className={`font-bold text-right 
                  ${debt.debt_type === 'BORROWED' ? 'text-red-600 dark:text-red-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                          {formatFullCurrency(getRemainingAmount(debt))}
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className='text-indigo-600 border-indigo-300 hover:bg-indigo-50/50'
                          >
                            Chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="sm:hidden space-y-3 p-3">
              {MOCK_DATA.debt_records
                .filter(d => d.status === 'ACTIVE')
                .map((debt) => (
                  <div
                    key={debt.id}
                    className={`p-4 rounded-xl border shadow-sm bg-card hover:shadow-md transition 
                        ${debt.debt_type === 'BORROWED' ? 'border-red-300/60 dark:border-red-800/40' : 'border-green-300/60 dark:border-green-800/40'}`}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <Badge
                        className={`text-white px-3 py-1 
                  ${debt.debt_type === 'LENT' ? 'bg-green-500' : 'bg-red-500'}`}
                      >
                        {debt.debt_type === 'LENT' ? 'Cho Vay' : 'Đi Vay'}
                      </Badge>

                      <span className="text-xs text-muted-foreground">
                        #{debt.id}
                      </span>
                    </div>

                    {/* Name */}
                    <p className="text-lg font-semibold mt-2">{debt.contact_name}</p>

                    {/* Numbers */}
                    <div className="mt-2 text-sm space-y-1">
                      <p className="flex justify-between">
                        <span>Số tiền gốc:</span>
                        <span className="font-medium text-muted-foreground">
                          {formatFullCurrency(debt.principal_amount)}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Đã trả:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {formatFullCurrency(debt.paid_amount)}
                        </span>
                      </p>
                      <p className="flex justify-between text-base font-bold">
                        <span>Còn lại:</span>
                        <span className={`${debt.debt_type === 'BORROWED'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-indigo-600 dark:text-indigo-400'
                          }`}>
                          {formatFullCurrency(getRemainingAmount(debt))}
                        </span>
                      </p>
                    </div>

                    {/* Action */}
                    <Button
                      variant="outline"
                      className="w-full mt-3 text-indigo-600 border-indigo-300 hover:bg-indigo-50/50"
                    >
                      Chi tiết
                    </Button>
                  </div>
                ))}
            </div>

          </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}