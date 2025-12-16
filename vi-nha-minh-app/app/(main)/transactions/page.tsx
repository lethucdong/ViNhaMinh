// transactions/page.tsx (Phiên bản đã cập nhật và sửa lỗi)
"use client";

import MainLayout from '@/components/shared/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Repeat2, Plus, Filter, Calendar, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo } from 'react';
import { TransactionForm, TransactionFormData } from '@/components/forms/TransactionForm';

// === IMPORT ĐÃ THÊM ĐỂ KHẮC PHỤC LỖI SELECT VÀ SELECTTRIGGER ===
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
// ===============================================================

// === MOCK DATA TẠM THỜI (Tạo tại đây để trang hoạt động) ===
interface Wallet { id: number; name: string; }
interface Transaction extends TransactionFormData { id: number; }

const MOCK_WALLETS: Wallet[] = [
    { id: 1, name: 'Ví Tiền Mặt' },
    { id: 2, name: 'Thẻ Tín Dụng' },
    { id: 3, name: 'Quỹ Chi tiêu' },
];

let MOCK_TRANSACTIONS: Transaction[] = [
    { id: 101, amount: 50000, type: 'EXPENSE', category: 'Ăn uống', description: 'Bữa trưa văn phòng', date: '2025-12-15', wallet_id: 1 },
    { id: 102, amount: 20000000, type: 'INCOME', category: 'Lương', description: 'Lương tháng 12', date: '2025-12-14', wallet_id: 2 },
    { id: 103, amount: 35000, type: 'EXPENSE', category: 'Di chuyển', description: 'Tiền xăng xe', date: '2025-12-15', wallet_id: 1 },
    { id: 104, amount: 5000000, type: 'DEBT_REPAYMENT', category: 'Hoàn Nợ', description: 'Hoàn tiền nợ bạn A', date: '2025-12-13', wallet_id: 3 },
    { id: 105, amount: 150000, type: 'EXPENSE', category: 'Sức khỏe', description: 'Thuốc cảm cúm', date: '2025-12-12', wallet_id: 1 },
];

const getWalletName = (id: number) => MOCK_WALLETS.find(w => w.id === id)?.name || 'N/A';

const formatFullCurrency = (amount: number, currencyCode: string = 'VND'): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: currencyCode
    }).format(amount);
};
// ==========================================================

// Cải thiện màu sắc cho giao diện Dark/Light mode
const getTypeStyle = (type: string) => {
    switch (type) {
        case 'INCOME':
        case 'DEBT_REPAYMENT': return 'text-green-600 dark:text-green-400';
        case 'EXPENSE': return 'text-red-600 dark:text-red-400';
        default: return 'text-muted-foreground';
    }
};

// Hàm trả về Badge
const getTypeBadge = (type: string) => {
    switch (type) {
        case 'INCOME': return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-100 font-medium">Thu Nhập</Badge>;
        case 'EXPENSE': return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-100 font-medium">Chi Tiêu</Badge>;
        case 'DEBT_REPAYMENT': return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-100 font-medium">Hoàn Nợ</Badge>;
        default: return <Badge variant="secondary">{type}</Badge>;
    }
};

// === COMPONENT CHÍNH: TransactionsPage ===
export default function TransactionsPage() {
    const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);

    // State Lọc
    const [filterType, setFilterType] = useState<'ALL' | Transaction['type']>('ALL');
    const [filterWallet, setFilterWallet] = useState<number | 'ALL'>('ALL');

    // === CHỨC NĂNG CRUD ===
    const handleSaveTransaction = (data: TransactionFormData) => {
        if (data.id) {
            // CẬP NHẬT
            setTransactions(prev => prev.map(tx => tx.id === data.id ? { ...tx, ...data } as Transaction : tx));
        } else {
            // THÊM MỚI (ĐÃ SỬA LỖI 'prev')
            setTransactions(prev => {
                const newId = Math.max(...prev.map(t => t.id), 0) + 1;
                const newTx: Transaction = { ...data, id: newId };
                return [newTx, ...prev];
            });
        }
        setEditingTransaction(undefined); // Reset
    };

    const handleDeleteTransaction = (id: number) => {
        setTransactions(prev => prev.filter(tx => tx.id !== id));
    };

    const handleEditTransaction = (tx: Transaction) => (e?: React.MouseEvent) => {
        e?.stopPropagation(); // Ngăn chặn sự kiện lan truyền
        setEditingTransaction(tx);
        setIsFormOpen(true);
    };

    const handleNewTransaction = () => {
        setEditingTransaction(undefined);
        setIsFormOpen(true);
    };
    
    // Mở form edit khi click vào hàng (trừ khi click nút edit/delete)
    const handleRowClick = (tx: Transaction) => () => {
         setEditingTransaction(tx);
         setIsFormOpen(true);
    }

    // === LOGIC LỌC ===
    const filteredAndSortedTransactions = useMemo(() => {
        let filtered = transactions;

        // 1. Lọc theo Loại
        if (filterType !== 'ALL') {
            filtered = filtered.filter(tx => tx.type === filterType);
        }

        // 2. Lọc theo Ví
        if (filterWallet !== 'ALL') {
            filtered = filtered.filter(tx => tx.wallet_id === filterWallet);
        }

        // 3. Sắp xếp theo ngày mới nhất
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, filterType, filterWallet]);


    return (
        <MainLayout>
            {/* NÚT THÊM GIAO DỊCH MỚI CỐ ĐỊNH */}
            <div
                className="fixed bottom-[100px] right-4 z-[10] md:top-[95px] md:right-6 md:z-[50] h-fit">
                <div className="inline-block animate-pulse-heart">
                    <Button
                        onClick={handleNewTransaction} // Gán hàm mở form
                        size="lg"
                        className="text-white font-bold rounded-xl shadow-2xl shadow-indigo-600/70 dark:shadow-indigo-900/50 px-6 py-3 hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-glow cursor-pointer"
                    >
                        <Plus className="w-5 h-5 mr-3" /> Thêm Giao Dịch Mới
                    </Button>
                </div>
            </div>

            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-extrabold tracking-tight flex items-center space-x-3 text-indigo-700 dark:text-indigo-400">
                        <Repeat2 className="w-7 h-7" /> <span>Lịch Sử Giao Dịch</span>
                    </h1>
                </div>

                {/* Bộ lọc đã cải tiến */}
                <Card className='p-4 shadow-sm rounded-xl border border-border/70'>
                    <div className="flex flex-wrap gap-3 items-center">
                        <Filter className="w-5 h-5 text-indigo-500 mr-2" />

                        {/* LỌC THEO LOẠI */}
                        <Button
                            variant={filterType === 'ALL' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterType('ALL')}
                            className={filterType === 'ALL' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : ''}
                        >
                            Tất cả
                        </Button>
                        {['INCOME', 'EXPENSE', 'DEBT_REPAYMENT'].map(type => (
                            <Button 
                                key={type}
                                variant={filterType === type ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterType(type as Transaction['type'])}
                                className={filterType === type ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : ''}
                            >
                                {getTypeBadge(type)}
                            </Button>
                        ))}
                        
                        {/* LỌC THEO VÍ (Select) */}
                        <Select 
                            value={filterWallet.toString()} 
                            onValueChange={(value) => setFilterWallet(value === 'ALL' ? 'ALL' : parseInt(value))}
                        >
                            <SelectTrigger className="w-[180px] rounded-full">
                                <SelectValue placeholder="Lọc theo Ví" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">Tất cả Ví</SelectItem>
                                {MOCK_WALLETS.map(w => (
                                    <SelectItem key={w.id} value={w.id.toString()}>
                                        {w.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Các nút lọc giữ nguyên */}
                        <Button variant="outline" size="sm" className='rounded-full'>
                             <Calendar className='w-4 h-4 mr-1' /> Tháng này
                        </Button>
                        <Button variant="outline" size="sm">Lọc theo Danh mục</Button>

                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="ml-auto text-sm text-muted-foreground hover:text-red-500"
                            onClick={() => { setFilterType('ALL'); setFilterWallet('ALL'); }}
                        >
                            Xóa Lọc
                        </Button>
                    </div>
                </Card>

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
                                        <TableHead className="w-[100px] text-center">Hành Động</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredAndSortedTransactions.map((tx) => (
                                        <TableRow 
                                            key={tx.id} 
                                            className="hover:bg-secondary/50 transition-colors cursor-pointer"
                                            onClick={handleRowClick(tx)} // Click hàng để mở Edit Form
                                        >
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

                                            <TableCell className="text-center space-x-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={handleEditTransaction(tx)}
                                                >
                                                    <Edit className="w-4 h-4 text-indigo-500" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={(e) => { 
                                                        e.stopPropagation(); 
                                                        handleDeleteTransaction(tx.id); 
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* MOBILE LIST VIEW */}
                        <div className="sm:hidden space-y-3 p-3">
                            {filteredAndSortedTransactions.map((tx) => (
                                <div
                                    key={tx.id}
                                    className="p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition cursor-pointer"
                                    onClick={handleRowClick(tx)} // Click mobile item để mở Edit Form
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
                                    <div className="mt-2 flex justify-between items-center">
                                        {getTypeBadge(tx.type)}
                                        <div className='flex space-x-2'>
                                             <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={handleEditTransaction(tx)}
                                            >
                                                <Edit className="w-4 h-4 text-indigo-500" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </CardContent>
                </Card>

            </div>

            {/* FORM GIAO DỊCH */}
            <TransactionForm
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSave={handleSaveTransaction}
                onDelete={handleDeleteTransaction}
                transactionData={editingTransaction}
            />
        </MainLayout>
    );
}