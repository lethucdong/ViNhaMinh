"use client";

import MainLayout from '@/components/shared/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_DATA, formatFullCurrency } from '@/data/mock_data';
import { Repeat2, Plus, Filter, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const getWalletName = (id: number) => MOCK_DATA.wallets.find(w => w.id === id)?.name || 'N/A';

// Cải thiện màu sắc cho giao diện Dark/Light mode
const getTypeStyle = (type: string) => {
  switch (type) {
    case 'INCOME':
    case 'DEBT_REPAYMENT': return 'text-green-600 dark:text-green-400';
    case 'EXPENSE': return 'text-red-600 dark:text-red-400';
    default: return 'text-muted-foreground';
  }
};

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
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Repeat2 className="w-7 h-7 text-indigo-500" /> <span>Lịch Sử Giao Dịch</span>
          </h1>
          <Button className="bg-primary hover:bg-indigo-700 shadow-md">
            <Plus className="w-5 h-5 mr-2" /> Thêm Giao Dịch Mới
          </Button>
        </div>

        {/* Bộ lọc */}
        <Card className='p-4 shadow-sm rounded-xl'>
          <div className="flex flex-wrap gap-3 items-center">
            <Filter className="w-5 h-5 text-muted-foreground mr-2" />
            <Button variant="outline" size="sm" className='rounded-full'><Calendar className='w-4 h-4 mr-1' /> Hôm nay</Button>
            <Button variant="outline" size="sm" className='rounded-full'>Tháng 12</Button>
            <Button variant="secondary" size="sm" className='rounded-full'>Tất cả</Button>
            <Button variant="outline" size="sm">Lọc theo Ví</Button>
            <Button variant="outline" size="sm">Lọc theo Danh mục</Button>
            <Button variant="ghost" size="sm" className="ml-auto text-sm">Xóa Lọc</Button>
          </div>
        </Card>

        {/* Bảng Giao Dịch */}
        <Card className='shadow-xl rounded-xl'>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className='bg-muted/50'>
                  <TableRow className='hover:bg-muted/50'>
                    <TableHead className='w-[100px]'>Ngày</TableHead>
                    <TableHead>Mô tả & Danh mục</TableHead>
                    <TableHead className='hidden sm:table-cell'>Ví Nguồn</TableHead>
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
                          <span className='sm:hidden'> • {getWalletName(tx.wallet_id)}</span>
                        </p>
                      </TableCell>
                      <TableCell className='hidden sm:table-cell text-muted-foreground'>{getWalletName(tx.wallet_id)}</TableCell>
                      <TableCell>{getTypeBadge(tx.type)}</TableCell>
                      <TableCell className={`text-right font-bold text-base ${getTypeStyle(tx.type)}`}>
                        {(tx.type === 'EXPENSE' ? '-' : '+')} {formatFullCurrency(tx.amount)}
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