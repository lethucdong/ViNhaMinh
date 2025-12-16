"use client";

import MainLayout from '@/components/shared/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_DATA, formatFullCurrency } from '@/data/mock_data';
import { Repeat2, Plus, Filter, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Hàm lấy tên Ví
const getWalletName = (id: number) => MOCK_DATA.wallets.find(w => w.id === id)?.name || 'N/A';

// Cải thiện màu sắc cho giao diện Dark/Light mode (Giữ nguyên)
const getTypeStyle = (type: string) => {
  switch (type) {
    case 'INCOME':
    case 'DEBT_REPAYMENT': return 'text-green-600 dark:text-green-400';
    case 'EXPENSE': return 'text-red-600 dark:text-red-400';
    default: return 'text-muted-foreground';
  }
};

// Hàm trả về Badge (Giữ nguyên)
const getTypeBadge = (type: string) => {
  switch (type) {
    case 'INCOME': return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-100 font-medium">Thu Nhập</Badge>;
    case 'EXPENSE': return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-100 font-medium">Chi Tiêu</Badge>;
    case 'DEBT_REPAYMENT': return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-100 font-medium">Hoàn Nợ</Badge>;
    default: return <Badge variant="secondary">{type}</Badge>;
  }
};

export default function TransactionsPage() {
  const sortedTransactions = MOCK_DATA.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <MainLayout>
      <div
        className="fixed bottom-[100px] right-4 z-[10] md:top-[95px] md:right-6 md:z-[50] h-fit">
        <div className="inline-block animate-pulse-heart">
          <Button
            // onClick={() => setIsTransactionFormOpen(true)}
            size="lg"
            // Giữ nguyên style gradient và animation tùy chỉnh của bạn
            className="text-white font-bold rounded-xl shadow-2xl shadow-indigo-600/70 dark:shadow-indigo-900/50 px-6 py-3 hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-glow cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-3" /> Thêm Giao Dịch Mới
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between items-center">

          {/* CHUẨN HÓA TIÊU ĐỀ H1 (4XL, EXTRABOLD, INDIGO) */}
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center space-x-3 text-indigo-700 dark:text-indigo-400">
            <Repeat2 className="w-7 h-7" /> <span>Lịch Sử Giao Dịch</span>
          </h1>
        </div>

        {/* Bộ lọc */}
        <Card className='p-4 shadow-sm rounded-xl border border-border/70'>
          <div className="flex flex-wrap gap-3 items-center">
            <Filter className="w-5 h-5 text-indigo-500 mr-2" />

            {/* Các nút lọc được làm gọn gàng hơn */}
            <Button variant="outline" size="sm" className='rounded-full text-indigo-600 dark:text-indigo-400 border-indigo-300 hover:bg-indigo-50/50'>
              <Calendar className='w-4 h-4 mr-1' /> Hôm nay
            </Button>
            <Button variant="outline" size="sm" className='rounded-full'>Tháng 12</Button>
            <Button variant="secondary" size="sm" className='rounded-full'>Tất cả</Button>

            <Button variant="outline" size="sm">Lọc theo Ví</Button>
            <Button variant="outline" size="sm">Lọc theo Danh mục</Button>

            <Button variant="ghost" size="sm" className="ml-auto text-sm text-muted-foreground hover:text-red-500">Xóa Lọc</Button>
          </div>
        </Card>

        {/* Bảng Giao Dịch */}
        {/* Bảng Giao Dịch */}
<Card className='shadow-xl rounded-xl'>
  <CardContent className="p-0">

    {/* DESKTOP TABLE */}
    <div className="hidden sm:block overflow-x-auto">
      <Table>
        <TableHeader className='bg-muted/50'>
          <TableRow className='hover:bg-muted/50'>
            <TableHead className='w-[100px]'>Ngày</TableHead>
            <TableHead>Mô tả & Danh mục</TableHead>
            <TableHead>Ví Nguồn</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead className="text-right">Số Tiền</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedTransactions.map((tx) => (
            <TableRow key={tx.id} className="hover:bg-secondary/50 transition-colors cursor-pointer">
              <TableCell className='text-sm font-semibold'>{tx.date.substring(5)}</TableCell>

              <TableCell className="font-medium">
                {tx.description}
                <p className='text-xs text-muted-foreground mt-1'>
                  {tx.category}
                </p>
              </TableCell>

              <TableCell className='text-muted-foreground'>{getWalletName(tx.wallet_id)}</TableCell>

              <TableCell>{getTypeBadge(tx.type)}</TableCell>

              <TableCell className={`text-right font-bold text-base ${getTypeStyle(tx.type)}`}>
                {(tx.type === 'EXPENSE' ? '-' : '+')} {formatFullCurrency(tx.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* MOBILE LIST VIEW */}
    <div className="sm:hidden space-y-3 p-3">
      {sortedTransactions.map((tx) => (
        <div
          key={tx.id}
          className="p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition cursor-pointer"
        >
          {/* Row 1 */}
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">{tx.date}</p>
            <p className={`text-right font-bold ${getTypeStyle(tx.type)}`}>
              {(tx.type === 'EXPENSE' ? '-' : '+')} {formatFullCurrency(tx.amount)}
            </p>
          </div>

          {/* Row 2 */}
          <p className="text-base font-semibold mt-1">{tx.description}</p>

          {/* Row 3 */}
          <p className="text-xs text-muted-foreground mt-1">
            {tx.category} • {getWalletName(tx.wallet_id)}
          </p>

          {/* Row 4 */}
          <div className="mt-2">
            {getTypeBadge(tx.type)}
          </div>
        </div>
      ))}
    </div>

  </CardContent>
</Card>

      </div>
    </MainLayout>
  );
}