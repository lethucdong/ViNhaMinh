// components/forms/TransactionForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, DollarSign, Tag, Repeat2, X } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { MOCK_DATA } from '@/data/mock_data';

// === TYPES ===
export interface TransactionFormData {
    id?: number;
    amount: number;
    type: 'EXPENSE' | 'INCOME' | 'DEBT_REPAYMENT';
    category: string;
    description: string;
    date: string; // YYYY-MM-DD
    wallet_id: number;
}

interface TransactionFormProps {
    transactionData?: TransactionFormData; // Dữ liệu nếu là chế độ Sửa
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: TransactionFormData) => void;
    onDelete?: (id: number) => void;
}

// === MOCK DATA FOR FORM ===
const TRANSACTION_TYPES = [
    { value: 'EXPENSE', label: 'Chi Tiêu' },
    { value: 'INCOME', label: 'Thu Nhập' },
    { value: 'DEBT_REPAYMENT', label: 'Hoàn Nợ' },
];

const MOCK_CATEGORIES = ['Ăn uống', 'Di chuyển', 'Lương', 'Đầu tư', 'Sức khỏe', 'Khác'];
const MOCK_WALLETS = MOCK_DATA.wallets;


export const TransactionForm: React.FC<TransactionFormProps> = ({
    transactionData,
    open,
    onOpenChange,
    onSave,
    onDelete,
}) => {
    const isUpdateMode = !!transactionData?.id;

    const [amount, setAmount] = useState(transactionData?.amount.toString() || '');
    const [type, setType] = useState<TransactionFormData['type']>(transactionData?.type || 'EXPENSE');
    const [category, setCategory] = useState(transactionData?.category || MOCK_CATEGORIES[0]);
    const [description, setDescription] = useState(transactionData?.description || '');
    const [date, setDate] = useState<Date | undefined>(transactionData?.date ? new Date(transactionData.date) : new Date());
    const [walletId, setWalletId] = useState(transactionData?.wallet_id.toString() || MOCK_WALLETS[0].id.toString());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setAmount(transactionData?.amount.toString() || '');
            setType(transactionData?.type || 'EXPENSE');
            setCategory(transactionData?.category || MOCK_CATEGORIES[0]);
            setDescription(transactionData?.description || '');
            setDate(transactionData?.date ? new Date(transactionData.date) : new Date());
            setWalletId(transactionData?.wallet_id.toString() || MOCK_WALLETS[0].id.toString());
        }
    }, [transactionData, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!date || !amount) return;

        setIsLoading(true);

        const data: TransactionFormData = {
            id: transactionData?.id,
            amount: parseFloat(amount),
            type,
            category,
            description,
            date: format(date, 'yyyy-MM-dd'),
            wallet_id: parseInt(walletId),
        };

        // Giả lập API call
        setTimeout(() => {
            onSave(data);
            setIsLoading(false);
            onOpenChange(false);
        }, 800);
    };

    const handleDelete = () => {
        if (transactionData?.id && onDelete && confirm("Bạn có chắc chắn muốn xóa giao dịch này?")) {
            onDelete(transactionData.id);
            onOpenChange(false);
        }
    };

    const dialogTitle = isUpdateMode ? 'Chỉnh Sửa Giao Dịch' : 'Thêm Giao Dịch Mới';
    const accentColor = type === 'INCOME' ? 'text-green-500' : (type === 'EXPENSE' ? 'text-red-500' : 'text-blue-500');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-bold flex items-center ${accentColor}`}>
                        <Repeat2 className="w-6 h-6 mr-2" /> {dialogTitle}
                    </DialogTitle>
                    <DialogDescription>
                        {isUpdateMode ? 'Cập nhật thông tin giao dịch' : 'Ghi lại thu nhập, chi tiêu hoặc hoàn nợ.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Loại Giao dịch */}
                    <div className="space-y-2">
                        <Label htmlFor="type" className="font-medium">Loại Giao Dịch</Label>
                        <Select
                            value={type}
                            onValueChange={(value) => setType(value as TransactionFormData['type'])}
                        >
                            <SelectTrigger id="type" className='capitalize font-medium'>
                                <SelectValue placeholder="Chọn loại giao dịch" />
                            </SelectTrigger>
                            <SelectContent>
                                {TRANSACTION_TYPES.map(t => (
                                    <SelectItem key={t.value} value={t.value}>
                                        {t.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Số tiền */}
                    <div className="space-y-2">
                        <Label htmlFor="amount" className="font-medium flex items-center">
                            <DollarSign className="w-4 h-4 mr-1 opacity-70" /> Số Tiền
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="100000"
                            required
                            min="1"
                            className="text-2xl font-bold text-right"
                        />
                    </div>
                    
                    {/* Ngày và Ví */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Ngày */}
                        <div className="space-y-2">
                            <Label htmlFor="date" className="font-medium">Ngày</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Chọn ngày</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        
                        {/* Ví */}
                        <div className="space-y-2">
                            <Label htmlFor="wallet">Ví</Label>
                            <Select
                                value={walletId}
                                onValueChange={setWalletId}
                            >
                                <SelectTrigger id="wallet">
                                    <SelectValue placeholder="Chọn Ví" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MOCK_WALLETS.map(w => (
                                        <SelectItem key={w.id} value={w.id.toString()}>
                                            {w.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Danh mục */}
                    <div className="space-y-2">
                        <Label htmlFor="category" className="font-medium flex items-center">
                            <Tag className="w-4 h-4 mr-1 opacity-70" /> Danh Mục
                        </Label>
                        <Select
                            value={category}
                            onValueChange={setCategory}
                        >
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Chọn Danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                                {MOCK_CATEGORIES.map(c => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Mô tả */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="font-medium">Mô Tả</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Mua sắm tại siêu thị..."
                        />
                    </div>
                
                    <DialogFooter className="pt-4 flex flex-col sm:flex-row sm:justify-between">
                        {isUpdateMode && onDelete && (
                            <Button 
                                type="button" 
                                variant="destructive" 
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="order-2 sm:order-1 mt-2 sm:mt-0"
                            >
                                Xóa
                            </Button>
                        )}
                        <div className="flex space-x-2 order-1 sm:order-2 w-full sm:w-auto">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                                className="flex-1"
                            >
                                Hủy
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={isLoading || !amount || !date || !walletId}
                                className={`flex-1 ${type === 'INCOME' ? 'bg-green-600 hover:bg-green-700' : (type === 'EXPENSE' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700')}`}
                            >
                                {isLoading ? 'Đang lưu...' : (isUpdateMode ? 'Lưu Cập Nhật' : 'Thêm Giao Dịch')}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};