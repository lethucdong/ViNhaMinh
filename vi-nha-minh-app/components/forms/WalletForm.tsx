// components/forms/WalletForm.tsx (Phiên bản đã cập nhật để hiển thị Member)
"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
    Wallet, Plus, Users, Edit, Banknote, X, Eye, User, CheckCircle
} from 'lucide-react';

// === MOCK DATA & TYPES ===
const MOCK_CURRENCIES = [
    { code: 'VND', name: 'Việt Nam Đồng' },
    { code: 'USD', name: 'Đô la Mỹ' },
    { code: 'EUR', name: 'Euro' },
];

const MOCK_MEMBERS_MAP: { [key: string]: string[] } = {
    'w3': ['user_a@mail.com', 'user_b@mail.com', 'you@mail.com'], // Ví Quỹ Chi tiêu Chung
    // Các ví khác mặc định chỉ có 1 thành viên (ví dụ: người dùng hiện tại)
};

const formatCurrency = (amount: number, currencyCode: string = 'VND'): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: currencyCode
    }).format(amount);
};

interface WalletFormData {
    id?: string;
    name: string;
    initial_balance: number;
    currency: string;
    is_shared: boolean;
    members?: string[]; // THÊM TRƯỜNG MEMBERS
}

interface WalletFormProps {
    walletData?: WalletFormData;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: WalletFormData) => void;
    isReadOnly?: boolean; 
}

// =======================================================
// === COMPONENT: WalletForm ===
// =======================================================

export const WalletForm: React.FC<WalletFormProps> = ({
    walletData,
    open,
    onOpenChange,
    onSave,
    isReadOnly = false,
}) => {

    const isUpdateMode = !!walletData && !isReadOnly;

    const [name, setName] = useState(walletData?.name || '');
    const [initialBalance, setInitialBalance] = useState(walletData?.initial_balance?.toString() || '0');
    const [currency, setCurrency] = useState(walletData?.currency || 'VND');
    const [isShared, setIsShared] = useState(walletData?.is_shared || false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Lấy danh sách thành viên từ walletData hoặc mock data
    const currentMembers = walletData?.members || (walletData?.id ? MOCK_MEMBERS_MAP[walletData.id] || ['you@mail.com'] : ['you@mail.com']);

    useEffect(() => {
        if (open) {
            setName(walletData?.name || '');
            setInitialBalance(walletData?.initial_balance?.toString() || '0');
            setCurrency(walletData?.currency || 'VND');
            setIsShared(walletData?.is_shared || false);
        }
    }, [walletData, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isReadOnly) return; 

        setIsLoading(true);

        const data: WalletFormData = {
            id: walletData?.id,
            name,
            initial_balance: parseFloat(initialBalance),
            currency,
            is_shared: isShared,
            // Giả lập lưu thành viên hiện tại (chỉ là placeholder)
            members: currentMembers 
        };

        // Giả lập API call
        setTimeout(() => {
            onSave(data);
            setIsLoading(false);
            onOpenChange(false);
        }, 800);
    };

    const title = isReadOnly
        ? `Chi Tiết Ví: ${walletData?.name}`
        : (isUpdateMode ? `Cập nhật Ví: ${walletData?.name}` : 'Tạo Ví Mới');

    const icon = isReadOnly
        ? <Eye className="w-6 h-6 mr-2 text-blue-500" />
        : (isUpdateMode ? <Edit className="w-6 h-6 mr-2 text-indigo-500" /> : <Plus className="w-6 h-6 mr-2 text-green-500" />);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[425px]
                           border border-white/50 dark:border-white/10
                           shadow-2xl shadow-indigo-500/50 dark:shadow-indigo-900/70
                           ring-4 ring-white/30 dark:ring-white/10
                           transform scale-100 transition-all duration-500"
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                        {icon} {title}
                    </DialogTitle>
                    <DialogDescription>
                        {isReadOnly
                            ? "Đây là thông tin chi tiết về ví. Sử dụng nút Sửa (Edit) trên trang Quản lý Ví để thay đổi."
                            : (isUpdateMode ? "Thay đổi thông tin cơ bản của ví này." : "Điền thông tin để tạo ví quản lý tài chính mới.")
                        }
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tên Ví */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center font-medium">
                            <Wallet className="w-4 h-4 mr-2 opacity-70" /> Tên Ví {!isReadOnly && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ví Tiền Mặt / Thẻ Tín Dụng"
                            required
                            disabled={isReadOnly}
                        />
                    </div>

                    {/* Số dư Ban đầu */}
                    <div className="space-y-2">
                        <Label htmlFor="balance" className="flex items-center font-medium">
                            <Banknote className="w-4 h-4 mr-2 opacity-70" /> Số dư Ban đầu
                        </Label>
                        <Input
                            id="balance"
                            type="text"
                            value={isReadOnly ? formatCurrency(parseFloat(initialBalance) || 0, currency) : initialBalance}
                            onChange={(e) => {
                                if (!isReadOnly) setInitialBalance(e.target.value)
                            }}
                            placeholder="0"
                            min="0"
                            disabled={isReadOnly}
                            className={isReadOnly ? 'text-right font-bold text-lg' : ''}
                        />
                    </div>

                    {/* Tiền tệ */}
                    <div className="space-y-2">
                        <Label htmlFor="currency">Tiền tệ</Label>
                        <Select
                            value={currency}
                            onValueChange={setCurrency as Dispatch<SetStateAction<string>>}
                            disabled={isReadOnly}
                        >
                            <SelectTrigger id="currency">
                                <SelectValue placeholder="Chọn loại tiền tệ" />
                            </SelectTrigger>
                            <SelectContent>
                                {MOCK_CURRENCIES.map(c => (
                                    <SelectItem key={c.code} value={c.code}>
                                        {c.code} - {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Ví Cộng tác (Chia sẻ) */}
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="space-y-1">
                            <Label htmlFor="is-shared" className="flex items-center font-medium">
                                <Users className="w-4 h-4 mr-2 text-teal-600" /> Ví Cộng tác
                            </Label>
                            <p className="text-xs text-muted-foreground">
                                Cho phép chia sẻ ví này và quản lý chung với người khác.
                            </p>
                        </div>
                        <Switch
                            id="is-shared"
                            checked={isShared}
                            onCheckedChange={setIsShared}
                            disabled={isReadOnly}
                        />
                    </div>
                    
                    {/* HIỂN THỊ DANH SÁCH THÀNH VIÊN */}
                    {isShared && (
                        <div className="space-y-3 p-3 border rounded-lg border-dashed">
                            <Label className="flex items-center font-bold text-lg text-teal-600 dark:text-teal-400">
                                <User className="w-5 h-5 mr-2" /> Thành viên ({currentMembers.length})
                            </Label>
                            
                            <ul className="space-y-1 max-h-[150px] overflow-y-auto">
                                {currentMembers.map((member, index) => (
                                    <li key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                                        {member}
                                        {member === 'you@mail.com' && <span className="ml-2 text-xs font-semibold text-indigo-500">(Bạn)</span>}
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Nếu không phải ReadOnly, cho phép thêm thành viên (Placeholder) */}
                            {!isReadOnly && (
                                <Button size="sm" variant="outline" className="mt-2 w-full">
                                    <Plus className="w-4 h-4 mr-2" /> Thêm thành viên mới (Email)
                                </Button>
                            )}
                        </div>
                    )}

                    <DialogFooter className="pt-4">
                        {/* ẨN NÚT LƯU KHI CHỈ ĐỌC */}
                        {!isReadOnly && (
                            <>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    disabled={isLoading}
                                    className="mr-2"
                                >
                                    <X className="w-4 h-4 mr-2" /> Hủy
                                </Button>
                                <Button type="submit" disabled={isLoading || !name} className={isUpdateMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-green-600 hover:bg-green-700'}>
                                    {isLoading ? 'Đang xử lý...' : (isUpdateMode ? 'Lưu Cập nhật' : 'Tạo Ví')}
                                </Button>
                            </>
                        )}

                        {/* HIỂN THỊ NÚT ĐÓNG KHI CHỈ ĐỌC */}
                        {isReadOnly && (
                            <Button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                                <X className="w-4 h-4 mr-2" /> Đóng
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export { MOCK_CURRENCIES };