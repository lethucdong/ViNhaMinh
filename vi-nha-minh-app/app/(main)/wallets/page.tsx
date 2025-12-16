// wallet/page.tsx (Hoặc WalletPage.tsx)
"use client";
import MainLayout from '@/components/shared/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Wallet, Plus, Users, Settings, Edit, Trash2, Banknote, Clock
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { WalletForm } from '@/components/forms/WalletForm';

// === MOCK DATA & UTILS ===
const MOCK_DATA = {
  wallets: [
    { id: 'w1', name: 'Ví Tiền Mặt', balance: 5000000, is_shared: false, currency: 'VND' },
    { id: 'w2', name: 'Thẻ Tín Dụng VISA', balance: 12500000, is_shared: false, currency: 'VND' },
    { id: 'w3', name: 'Quỹ Chi tiêu Chung', balance: 8000000, is_shared: true, currency: 'VND' },
    { id: 'w4', name: 'Ví Tiết Kiệm USD', balance: 2500, is_shared: false, currency: 'USD' },
  ]
};

const formatFullCurrency = (amount: number, currencyCode: string = 'VND'): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
};

const PageTitle = ({ title }: { title: string }) => (
  <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400">
    {title}
  </h1>
);

const totalWalletsCount = MOCK_DATA?.wallets?.length || 0;
const sharedWalletsCount = MOCK_DATA?.wallets?.filter(w => w.is_shared)?.length || 0;
const personalWalletsCount = totalWalletsCount - sharedWalletsCount;
// Giả định mọi ví đều tính theo VND cho tổng tài sản
const totalBalance = MOCK_DATA?.wallets?.reduce((sum, w) => {
  if (w.currency === 'USD') return sum + (w.balance * 25000)
  return sum + (w.balance || 0)
}, 0) || 0;
const lastUpdatedWallet = MOCK_DATA?.wallets?.[0]?.name || 'N/A';

// =======================================================
// === COMPONENT CHÍNH: WalletPage ===
// =======================================================

export default function WalletPage() {
  const router = useRouter();

  const [isAddWalletFormOpen, setIsAddWalletFormOpen] = useState(false);
  const [isEditWalletFormOpen, setIsEditWalletFormOpen] = useState(false);
  const [isViewWalletFormOpen, setIsViewWalletFormOpen] = useState(false); // STATE MỚI CHO READONLY

  const [editingWalletData, setEditingWalletData] = useState<any | undefined>(undefined);

  const wallets = (MOCK_DATA && MOCK_DATA.wallets) || [];

  // Cập nhật hàm này để mở form chỉ đọc khi click vào ví
  const handleWalletClick = (walletId: string) => {
    const walletToView = wallets.find(w => w.id === walletId);

    if (walletToView) {
      const dataForForm = {
        id: walletToView.id,
        name: walletToView.name,
        initial_balance: walletToView.balance,
        currency: walletToView.currency,
        is_shared: walletToView.is_shared,
      };
      setEditingWalletData(dataForForm);
      setIsViewWalletFormOpen(true); // Mở form chỉ đọc
    }
  };

  const handleSaveWallet = (data: any) => {
    console.log("Dữ liệu cần lưu/cập nhật thực tế:", data);
    // TODO: Logic gọi API
  };

  const handleAddWallet = () => {
    setEditingWalletData(undefined);
    setIsAddWalletFormOpen(true);
  };

  const handleEdit = (walletId: string) => (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên handleWalletClick

    const walletToEdit = wallets.find(w => w.id === walletId);

    if (walletToEdit) {
      const dataForForm = {
        id: walletToEdit.id,
        name: walletToEdit.name,
        initial_balance: walletToEdit.balance,
        currency: walletToEdit.currency,
        is_shared: walletToEdit.is_shared,
      };
      setEditingWalletData(dataForForm);
      setIsEditWalletFormOpen(true);
    }
  };

  const handleDelete = (walletId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Bạn có chắc chắn muốn xóa ví ${wallets.find(w => w.id === walletId)?.name} không?`)) {
      console.log(`Xóa ví ID: ${walletId} (API Placeholder)`);
    }
  };

  return (
    <MainLayout>

      {/* NÚT THÊM VÍ MỚI CỐ ĐỊNH */}
      <div
        className="fixed bottom-[100px] right-4 z-[10] md:top-[95px] md:right-6 md:z-[50] h-fit">
        <div className="inline-block animate-pulse-heart">
          <Button
            onClick={handleAddWallet}
            size="lg"
            className="text-white font-bold rounded-xl shadow-2xl shadow-indigo-600/70 dark:shadow-indigo-900/50 px-6 py-3 hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-glow cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-3" /> Thêm Ví Mới
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <PageTitle title="Quản lý Ví" />
        </div>

        {/* Row 1: Tổng quan về Ví (2 Card Chính) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CARD 1 (2 CỘT): TỔNG SỐ DƯ */}
          <Card className="col-span-1 lg:col-span-2 shadow-xl rounded-xl bg-indigo-700 text-white dark:bg-indigo-900 shadow-indigo-600/40 dark:shadow-indigo-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium opacity-90">TỔNG TÀI SẢN HIỆN TẠI (Ước tính VND)</CardTitle>
              <Banknote className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-extrabold tracking-wide mt-2">
                {formatFullCurrency(totalBalance)}
              </div>
              <p className="text-sm opacity-80 mt-2 flex items-center">
                <Wallet className='w-4 h-4 mr-1' /> Quản lý qua **{totalWalletsCount}** ví
              </p>
            </CardContent>
          </Card>

          {/* CARD 2 (1 CỘT): CHI TIẾT VÍ & HÀNH ĐỘNG */}
          <Card className="shadow-xl rounded-xl p-5">
            <CardHeader className="pb-3 px-0">
              <CardTitle className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400">
                <Settings className='w-5 h-5 mr-2' /> Chi tiết & Cấu hình
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-0">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center"><Wallet className='w-4 h-4 mr-2' /> Ví Cá nhân:</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{personalWalletsCount}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center"><Users className='w-4 h-4 mr-2' /> Ví Cộng tác:</span>
                <span className="font-semibold text-teal-600">{sharedWalletsCount}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t pt-3">
                <span className="text-muted-foreground flex items-center"><Clock className='w-4 h-4 mr-2' /> Cập nhật gần nhất:</span>
                <span className="font-semibold">{lastUpdatedWallet}</span>
              </div>

              {/* Nút Hành động */}
              <Button
                variant="default"
                className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"
                onClick={() => router.push('/settings/wallets')}
              >
                <Settings className='w-4 h-4 mr-2' /> Quản lý chi tiết Ví
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Danh sách Ví chi tiết */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 pt-4 border-t border-border">Danh sách Ví Chi tiết</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              // Gán sự kiện handleWalletClick để mở form chỉ đọc
              onClick={() => handleWalletClick(`${wallet.id}`)}
              className="flex flex-col justify-between p-5 rounded-xl border border-border/70 
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

              <div className="sm:text-3xl md:text-2xl font-extrabold mt-4 mb-3">
                {formatFullCurrency(wallet.balance, wallet.currency)}
              </div>

              {/* HÀNH ĐỘNG CRUD */}
              <div className="flex justify-end space-x-2 mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleEdit(`${wallet.id}`)}
                  className="text-gray-600 hover:text-indigo-600 border-gray-300"
                  aria-label={`Sửa ví ${wallet.name}`}
                >
                  <Edit className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDelete(`${wallet.id}`)}
                  className="text-gray-600 hover:text-red-600 border-gray-300"
                  aria-label={`Xóa ví ${wallet.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Thêm Ví Mới */}
      <WalletForm
        open={isAddWalletFormOpen}
        onOpenChange={setIsAddWalletFormOpen}
        onSave={handleSaveWallet}
        walletData={undefined}
        isReadOnly={false}
      />

      {/* Form Sửa Ví */}
      <WalletForm
        open={isEditWalletFormOpen}
        onOpenChange={setIsEditWalletFormOpen}
        onSave={handleSaveWallet}
        walletData={editingWalletData}
        isReadOnly={false}
      />

      {/* FORM XEM CHI TIẾT (READONLY) - Được kích hoạt khi click vào thẻ ví */}
      <WalletForm
        open={isViewWalletFormOpen}
        onOpenChange={setIsViewWalletFormOpen}
        onSave={handleSaveWallet}
        walletData={editingWalletData}
        isReadOnly={true} // BẬT CHẾ ĐỘ CHỈ ĐỌC
      />

    </MainLayout>
  );
}