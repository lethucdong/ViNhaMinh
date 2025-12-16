// dashboard/page.tsx (Hoặc DashboardPage.tsx)
"use client";
import MainLayout from '@/components/shared/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Cần đảm bảo đường dẫn này đúng
import { TransactionForm } from '@/components/forms/TransactionForm';

// Giữ nguyên các imports khác
import { MOCK_DATA, formatFullCurrency, formatCurrency } from '@/data/mock_data';
import { Wallet, Plus, TrendingUp, TrendingDown, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// === CÁC HÀM TÍNH TOÁN (Giữ nguyên) ===
const getTotalBalance = () => {
  if (!MOCK_DATA || !MOCK_DATA.wallets || !Array.isArray(MOCK_DATA.wallets)) return 0;
  return MOCK_DATA.wallets.reduce((sum, w) => sum + (typeof w.balance === 'number' ? w.balance : 0), 0);
};

const calculateTotal = (key: 'income' | 'expense') => {
  if (!MOCK_DATA || !MOCK_DATA.chart_data || !Array.isArray(MOCK_DATA.chart_data)) return 0;
  const totalInMillions = MOCK_DATA.chart_data.reduce((sum, d) => sum + (typeof d[key] === 'number' ? d[key] : 0), 0);
  return totalInMillions * 1000000;
};

const totalIncome = calculateTotal('income');
const totalExpense = calculateTotal('expense');

// Tooltip (Giữ nguyên)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    if (typeof formatFullCurrency !== 'function') return null;
    return (
      <div className="p-3 bg-background border rounded-lg shadow-2xl text-sm border-indigo-400 dark:border-indigo-600">
        <p className="font-bold">{`Tháng ${label}`}</p>
        {payload.map((entry: any, index: number) => {
          const fullAmount = entry.value * 1000000;
          return (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatFullCurrency(fullAmount)}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

// Hàm format tiền tệ gọn gàng cho Card tóm tắt (Giữ nguyên)
const formatSummaryCurrency = (amount: number) => {
  if (Math.abs(amount) >= 1_000_000_000) {
    const value = amount / 1_000_000_000;
    return `${value.toFixed(1)} Tỷ VNĐ`;
  }
  return formatFullCurrency(amount);
};


// === COMPONENT CHÍNH: DashboardPage ===

export default function DashboardPage() {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const router = useRouter();

  const totalBalance = getTotalBalance();
  const wallets = (MOCK_DATA && MOCK_DATA.wallets) || [];
  const topWallets = wallets.sort((a, b) => (b.balance || 0) - (a.balance || 0)).slice(0, 3);

  const handleWalletClick = (walletId: string) => {
    router.push(`/wallets/${walletId}`);
  };

  const handleManageAllWallets = () => {
    router.push('/wallets');
  };

  const handleSaveTransaction = (data: any) => {
    console.log("Lưu Giao Dịch Thực Tế (API Placeholder):", data);
    // TODO: Gọi API để lưu giao dịch và refresh dữ liệu Dashboard
  };

  return (
    <MainLayout>

      {/* NÚT THÊM GIAO DỊCH CỐ ĐỊNH */}
      <div
        className="fixed bottom-[100px] right-4 z-[10] md:top-[95px] md:right-6 md:z-[50] h-fit">
        <div className="inline-block animate-pulse-heart">
          <Button
            onClick={() => setIsTransactionFormOpen(true)}
            size="lg"
            className="text-white font-bold rounded-xl shadow-2xl shadow-indigo-600/70 dark:shadow-indigo-900/50 px-6 py-3 hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-glow cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-3" /> Thêm Giao Dịch Nhanh
          </Button>
        </div>
      </div>


      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400">
            Tổng quan tài chính
          </h1>
        </div>

        {/* Row 1: Tổng số dư và Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Tổng tài sản */}
          <Card className="col-span-1 lg:col-span-2 bg-indigo-700 text-white dark:bg-indigo-900 shadow-2xl shadow-indigo-600/40 dark:shadow-indigo-900/50 transition-all duration-300 rounded-xl hover:shadow-indigo-600/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium opacity-90">TỔNG TÀI SẢN HIỆN TẠI</CardTitle>
              <Wallet className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-extrabold tracking-wide mt-2">{formatSummaryCurrency(totalBalance)}</div>
              <p className="text-sm opacity-80 mt-2 flex items-center">
                <Clock className='w-3 h-3 mr-1' /> Cập nhật: {new Date().toLocaleDateString('vi-VN')}
              </p>
            </CardContent>
          </Card>

          {/* Card Tổng Thu (Màu Xanh Lá) */}
          <Card className="col-span-1 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" /> TỔNG THU
              </CardTitle>
              <ArrowUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatSummaryCurrency(totalIncome)}</div>
            </CardContent>
          </Card>

          {/* Card Tổng Chi (Màu Đỏ) */}
          <Card className="col-span-1 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-red-600 dark:text-red-400 flex items-center">
                <TrendingDown className="h-4 w-4 mr-2" /> TỔNG CHI
              </CardTitle>
              <ArrowDown className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatSummaryCurrency(totalExpense)}</div>
            </CardContent>
          </Card>
        </div>
        {/* End Row 1 */}


        {/* Biểu đồ và Ví nổi bật */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Biểu đồ */}
          <Card className="col-span-1 lg:col-span-2 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className='text-2xl font-semibold'>Phân tích Dòng Tiền</CardTitle>
              <p className='text-sm text-muted-foreground'>Đơn vị tính: Triệu VND (Đơn vị trên trục Y được rút gọn)</p>
            </CardHeader>
            <CardContent className="h-[350px] p-2 sm:p-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_DATA?.chart_data || []} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="opacity-50" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip content={CustomTooltip} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                  <Bar dataKey="income" name="Thu Nhập" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="Chi Tiêu" fill="#F87171" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Ví Hoạt Động (Đã thêm hover action) */}
          <Card className="col-span-1 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Ví Hoạt Động</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topWallets.map((wallet) => (
                <div
                  key={wallet.id}
                  onClick={() => handleWalletClick(`${wallet.id}`)}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/70 
                                               bg-secondary/30 hover:bg-secondary/80 transition-all duration-300 cursor-pointer 
                                               transform hover:scale-[1.03] shadow-sm active:scale-[0.98]">
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-6 h-6 text-indigo-500" />
                    <div>
                      <p className="font-semibold text-lg">{wallet.name}</p>
                      <p className={`text-xs ${wallet.is_shared ? 'text-teal-500' : 'text-muted-foreground'}`}>
                        {wallet.is_shared ? 'Ví Cộng Tác' : 'Ví Cá Nhân'}
                      </p>
                    </div>
                  </div>
                  <div className="text-base font-bold text-indigo-600 dark:text-indigo-400">{formatFullCurrency(wallet.balance)}</div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4 border-dashed hover:border-solid hover:bg-muted rounded-lg cursor-pointer "
                onClick={handleManageAllWallets}
              >
                <Plus className='w-4 h-4 mr-2' /> Quản lý Toàn Bộ Ví
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tích hợp TransactionForm đã được import */}
      <TransactionForm
        open={isTransactionFormOpen}
        onOpenChange={setIsTransactionFormOpen}
        onSave={handleSaveTransaction}
      />
    </MainLayout>
  );
}