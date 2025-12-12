"use client";
import MainLayout from '@/components/shared/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_DATA, formatFullCurrency } from '@/data/mock_data';
import { Wallet, Plus, Users, Settings, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Định nghĩa PageTitle Component để đảm bảo tính nhất quán
const PageTitle = ({ title }: { title: string }) => (
  // Sử dụng màu Indigo để nhất quán với màu nhấn của dashboard
  <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400">
    {title}
  </h1>
);

// Lọc và tính toán số liệu
const totalWalletsCount = MOCK_DATA?.wallets?.length || 0;
const sharedWalletsCount = MOCK_DATA?.wallets?.filter(w => w.is_shared)?.length || 0;

export default function WalletPage() {
  const router = useRouter();
  const [isAddWalletFormOpen, setIsAddWalletFormOpen] = useState(false);

  const wallets = (MOCK_DATA && MOCK_DATA.wallets) || [];

  const handleWalletClick = (walletId: string) => {
    router.push(`/dashboard/wallets/${walletId}`);
  };

  const handleAddWallet = () => {
    // Thay bằng logic mở form thêm ví của bạn
    console.log("Mở Form Thêm Ví Mới");
    setIsAddWalletFormOpen(true);
  };

  return (
    <MainLayout>
      <div
        className="fixed bottom-16 right-4 z-[10] md:top-[95px] md:right-6 md:z-[50] h-fit">
        <div className="inline-block animate-pulse-heart">
          <Button
            onClick={handleAddWallet}
            size="lg"
            // Giữ nguyên style gradient và animation tùy chỉnh của bạn
            className="text-white font-bold rounded-xl shadow-2xl shadow-indigo-600/70 dark:shadow-indigo-900/50 px-6 py-3 hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-glow cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-3" /> Thêm Ví Mới
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <PageTitle title="Quản lý Ví Cá Nhân" />

          {/* NÚT THÊM VÍ MỚI (ĐÃ CHUẨN HÓA VỚI NÚT GIAO DỊCH NHANH) */}
          {/* <Button
            onClick={handleAddWallet}
            // Áp dụng style giống hệt nút "Thêm Giao Dịch Nhanh" (trừ hiệu ứng pulsing)
            size="lg"
            className="bg-primary hover:bg-indigo-700 shadow-lg shadow-indigo-500/50 
                                  transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.98] 
                                  rounded-xl font-bold px-6 py-3">
            <Plus className="w-5 h-5 mr-3" /> Thêm Ví Mới
          </Button> */}
        </div>

        {/* ======================================================= */}
        {/* Row 1: Tổng quan về Ví (Giữ nguyên style Card nhất quán) */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card className="shadow-md rounded-xl border-t-4 border-indigo-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TỔNG SỐ VÍ</CardTitle>
              <Wallet className="h-5 w-5 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{totalWalletsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Đang hoạt động</p>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl border-t-4 border-teal-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VÍ CỘNG TÁC</CardTitle>
              <Users className="h-5 w-5 text-teal-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{sharedWalletsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Cần xem xét chia sẻ</p>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CÀI ĐẶT</CardTitle>
              <Settings className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="mt-2 w-full text-indigo-600 dark:text-indigo-400 border-indigo-300">
                Chi tiết Cấu hình <ArrowRight className='w-4 h-4 ml-2' />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================= */}
        {/* Danh sách Ví chi tiết (Giữ nguyên style nhất quán) */}
        {/* ======================================================= */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 pt-4 border-t border-border">Danh sách Ví</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => handleWalletClick(`${wallet.id}`)}
              className="p-5 rounded-xl border border-border/70 
                                       bg-card hover:bg-secondary/50 transition-all duration-300 cursor-pointer 
                                       transform hover:scale-[1.03] shadow-md hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-bold text-xl">{wallet.name}</p>
                  <p className={`text-sm ${wallet.is_shared ? 'text-teal-600' : 'text-indigo-600 dark:text-indigo-400'}`}>
                    {wallet.is_shared ? 'Ví Cộng Tác' : 'Ví Cá Nhân'}
                  </p>
                </div>
                <Wallet className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="text-3xl font-extrabold mt-4">
                {formatFullCurrency(wallet.balance)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <AddWalletForm open={isAddWalletFormOpen} onOpenChange={setIsAddWalletFormOpen} /> */}
    </MainLayout>
  );
}