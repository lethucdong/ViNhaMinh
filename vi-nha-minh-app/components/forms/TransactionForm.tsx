// components/forms/TransactionForm.tsx
"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_DATA } from '@/data/mock_data';
import { DollarSign, Tag, Calendar, Wallet } from 'lucide-react';
import { useState } from 'react';

// Ví dụ về Form Thêm Giao Dịch sử dụng Sheet
export function TransactionForm({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [type, setType] = useState('EXPENSE');
  const [amount, setAmount] = useState('');
  const [walletId, setWalletId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Thêm giao dịch: ${type} - ${amount} vào Ví ${walletId}`);
    // Logic gọi API CRUD ở đây...
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className='sm:max-w-md p-6'>
        <SheetHeader>
          <SheetTitle className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
            <DollarSign className='inline-block w-6 h-6 mr-2' /> Thêm Giao Dịch Mới
          </SheetTitle>
          <SheetDescription className='mt-2'>
            Ghi nhận một khoản thu hoặc chi tiêu mới vào ví.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">

          <div className="grid gap-2">
            <Label htmlFor="type">Loại Giao Dịch</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type" className="w-full border-2 focus:ring-indigo-500">
                <SelectValue placeholder="Chọn loại giao dịch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXPENSE" className='text-red-500'>Chi Tiêu (-)</SelectItem>
                <SelectItem value="INCOME" className='text-green-500'>Thu Nhập (+)</SelectItem>
                <SelectItem value="TRANSFER">Chuyển Khoản</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">Số Tiền</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="amount" type="number" placeholder="0" className="pl-10 text-lg font-bold" required
                value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="wallet">Ví</Label>
            <Select value={walletId} onValueChange={setWalletId}>
              <SelectTrigger id="wallet" className="w-full">
                <SelectValue placeholder="Chọn ví ghi nhận" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_DATA.wallets.map(w => (
                  <SelectItem key={w.id} value={String(w.id)}>{w.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Mô tả</Label>
            <Input id="description" placeholder="Mua sắm, Lương,..." />
          </div>

          <Button type="submit" className={`w-full mt-4 ${type === 'EXPENSE' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'} transition-all duration-300`}>
            {type === 'EXPENSE' ? 'LƯU CHI TIÊU' : 'LƯU THU NHẬP'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}