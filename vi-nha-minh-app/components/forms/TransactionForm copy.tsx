// components/forms/TransactionForm.tsx
"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Plus, DollarSign, Tag, Wallet, X
} from 'lucide-react';

// === MOCK DATA TẠM THỜI (Lưu ý: Bạn nên import dữ liệu thực tế) ===
const MOCK_DATA = {
  wallets: [
    { id: 'w1', name: 'Ví Tiền Mặt', balance: 5000000, is_shared: false },
    { id: 'w2', name: 'Thẻ Tín Dụng VISA', balance: 12500000, is_shared: false },
  ],
  categories: [
    { id: 'c1', name: 'Ăn uống', type: 'expense' },
    { id: 'c2', name: 'Lương', type: 'income' },
    { id: 'c3', name: 'Tiết kiệm', type: 'expense' },
    { id: 'c4', name: 'Đầu tư', type: 'income' },
  ]
};
// ===================================================================

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Tùy chọn: Thêm prop cho việc chỉnh sửa giao dịch cũ
  transactionData?: any;
  // Tùy chọn: Thêm hàm onSave để xử lý dữ liệu sau khi submit
  onSave?: (data: any) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  open,
  onOpenChange,
  transactionData,
  onSave
}) => {
  const isUpdateMode = !!transactionData;
  const wallets = MOCK_DATA.wallets;
  const categories = MOCK_DATA.categories;

  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // 'expense' | 'income'
  const [walletId, setWalletId] = useState(wallets[0]?.id || '');
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Lọc categories theo type
  const filteredCategories = categories.filter(c => c.type === type);

  // Đồng bộ dữ liệu khi mở form
  useEffect(() => {
    if (open) {
      if (transactionData) {
        // Chế độ chỉnh sửa
        setAmount(transactionData.amount?.toString() || '');
        setType(transactionData.type || 'expense');
        setWalletId(transactionData.walletId || wallets[0]?.id || '');
        setCategoryId(transactionData.categoryId || '');
      } else {
        // Chế độ thêm mới (Reset)
        setAmount('');
        setType('expense');
        setWalletId(wallets[0]?.id || '');

        // Cố gắng đặt category mặc định cho loại 'expense' (nếu có)
        const defaultCat = categories.find(c => c.type === 'expense');
        setCategoryId(defaultCat?.id || '');
      }
    }
  }, [open, transactionData, wallets, categories]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      id: transactionData?.id, // Có thể là null nếu tạo mới
      amount: parseFloat(amount),
      type,
      walletId,
      categoryId,
      date: new Date().toISOString().split('T')[0], // Dùng ngày hiện tại
    };

    // Giả lập API call
    setTimeout(() => {
      console.log(isUpdateMode ? 'Cập nhật Giao Dịch:' : 'Thêm Giao Dịch Mới:', data);
      onSave && onSave(data); // Gọi hàm onSave được truyền từ component cha
      setIsLoading(false);
      onOpenChange(false);
    }, 1000);
  };


  const title = isUpdateMode ? 'Cập nhật Giao Dịch' : 'Thêm Giao Dịch Mới';
  const actionButtonText = isUpdateMode ? 'Lưu Cập nhật' : 'Lưu Giao Dịch';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] 
                           border border-white/70 dark:border-white/30 
                           shadow-2xl shadow-indigo-500/70 dark:shadow-indigo-900/70 
                           ring-4 ring-white/30 dark:ring-white/10
                           transform scale-100 transition-all duration-500">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Plus className="w-6 h-6 mr-2 text-indigo-500" /> {title}
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin giao dịch Thu hoặc Chi.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Loại Giao Dịch (Thu/Chi) */}
          <div className="space-y-2">
            <Label htmlFor="type">Loại Giao Dịch</Label>
            <Select value={type} onValueChange={setType as Dispatch<SetStateAction<string>>}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Chọn loại..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">- Chi Tiêu</SelectItem>
                <SelectItem value="income">+ Thu Nhập</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Số Tiền */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center font-medium">
              <DollarSign className="w-4 h-4 mr-2 opacity-70" /> Số Tiền (VND) <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500000"
              required
              min="1000"
            />
          </div>

          {/* Ví (Wallet) */}
          <div className="space-y-2">
            <Label htmlFor="wallet" className="flex items-center font-medium">
              <Wallet className="w-4 h-4 mr-2 opacity-70" /> Ví
            </Label>
            <Select value={walletId} onValueChange={setWalletId as Dispatch<SetStateAction<string>>}>
              <SelectTrigger id="wallet">
                <SelectValue placeholder="Chọn ví..." />
              </SelectTrigger>
              <SelectContent>
                {wallets.map(w => (
                  <SelectItem key={w.id} value={w.id}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Danh mục (Category) */}
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center font-medium">
              <Tag className="w-4 h-4 mr-2 opacity-70" /> Danh mục
            </Label>
            <Select
              value={categoryId}
              onValueChange={setCategoryId as Dispatch<SetStateAction<string>>}
              disabled={filteredCategories.length === 0}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder={filteredCategories.length > 0 ? "Chọn danh mục..." : "Không có danh mục cho loại này"} />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="mr-2"
            >
              <X className="w-4 h-4 mr-2" /> Hủy
            </Button>
            <Button type="submit" disabled={isLoading || !amount || !walletId || !categoryId} className="bg-indigo-600 hover:bg-indigo-700">
              {isLoading ? 'Đang lưu...' : actionButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};