"use client";
import MainLayout from '@/components/shared/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { MOCK_DATA, formatFullCurrency } from '@/data/mock_data';
import { 
    Wallet, Settings, Lock, Users, PiggyBank, Edit, Trash2, Banknote, Clock, 
    ChevronRight, ChevronLeft, AlertTriangle, CheckCircle, Plus, X
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

// === MOCK DATA VÀ TYPES ĐÃ SỬA LỖI ID ===

// Định nghĩa kiểu dữ liệu cho Wallet gốc từ MOCK_DATA (Giả định)
interface BaseWalletType {
    id: number; // MOCK_DATA gốc dùng number
    name: string;
    balance: number;
    is_shared: boolean;
    owner_id: number;
}

// Định nghĩa kiểu dữ liệu cho Wallet sau khi bổ sung Settings (Dùng string cho ID để nhất quán với URL)
interface WalletType extends Omit<BaseWalletType, 'id'> {
    id: string; // Đã sửa: ID là string
    status: 'active' | 'archived'; 
    limit_amount?: number; 
    limit_period?: 'monthly' | 'weekly' | 'yearly'; // Thêm 'yearly'
    default_category_id?: string; 
    collaborators?: { name: string; email: string; role: 'owner' | 'editor' | 'viewer' }[];
}

// MOCK Categories (Giữ nguyên)
const MOCK_CATEGORIES = [
    { id: 'CF001', name: 'Chi phí cố định' },
    { id: 'CT002', name: 'Chi tiêu thường ngày' },
    { id: 'DT003', name: 'Đầu tư' },
];

// Tạo MOCK_WALLETS_WITH_SETTINGS (Đã sửa lỗi ID: convert to string)
const MOCK_WALLETS_WITH_SETTINGS: WalletType[] = MOCK_DATA.wallets.map(w => ({
    ...w,
    id: w.id.toString(), // SỬA LỖI 1: Convert number ID sang string
    status: w.id.toString() === '1' ? 'archived' : 'active', // Giả định ID 1 là archived
    limit_amount: w.id.toString() === '2' ? 5000000 : undefined, 
    limit_period: w.id.toString() === '2' ? 'monthly' : undefined,
    default_category_id: w.id.toString() === '3' ? 'CF001' : undefined, 
    collaborators: w.is_shared ? [
        { name: 'Alice', email: 'alice@mock.com', role: 'owner' },
        { name: 'Bob', email: 'bob@mock.com', role: 'viewer' },
    ] : [],
}));

// Định nghĩa PageTitle Component (Giữ nguyên)
const PageTitle = ({ title }: { title: string }) => (
    <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400">
        {title}
    </h1>
);

// =========================================================================
// H. COMPONENT: Form Cấu hình Hạn mức Chi tiêu
// =========================================================================
const SpendingLimitForm = ({ wallet }: { wallet: WalletType }) => {
    const [isLimitEnabled, setIsLimitEnabled] = useState(!!wallet.limit_amount);
    const [limitAmount, setLimitAmount] = useState(wallet.limit_amount?.toString() || '');
    // Định nghĩa kiểu dữ liệu rõ ràng cho state chu kỳ
    const [limitPeriod, setLimitPeriod] = useState<'monthly' | 'weekly' | 'yearly'>(wallet.limit_period || 'monthly');

    const handleSave = () => {
        console.log(`Lưu Hạn mức cho Ví ${wallet.name}: ${isLimitEnabled ? limitAmount : 'Disabled'}`);
        // Logic gọi API lưu hạn mức...
    };
    
    // Hàm xử lý onValueChange đã sửa lỗi 2
    const handlePeriodChange = (value: string) => {
        // Ép kiểu giá trị string sang kiểu union ('monthly' | 'weekly' | 'yearly')
        setLimitPeriod(value as 'monthly' | 'weekly' | 'yearly');
    };

    return (
        <Card className="shadow-lg border-l-4 border-l-red-500">
            <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                    <PiggyBank className="w-5 h-5 mr-2" /> Hạn mức Chi tiêu
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor={`limit-switch-${wallet.id}`}>Kích hoạt Hạn mức</Label>
                    <Switch 
                        id={`limit-switch-${wallet.id}`} 
                        checked={isLimitEnabled} 
                        onCheckedChange={setIsLimitEnabled} 
                    />
                </div>

                {isLimitEnabled && (
                    <div className="space-y-3 pt-2">
                        <Label>Số tiền Hạn mức (VNĐ)</Label>
                        <Input 
                            type="number" 
                            placeholder="5,000,000" 
                            value={limitAmount}
                            onChange={(e) => setLimitAmount(e.target.value)}
                        />
                        <Label>Chu kỳ</Label>
                        <Select value={limitPeriod} onValueChange={handlePeriodChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn chu kỳ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="monthly">Hàng tháng</SelectItem>
                                <SelectItem value="weekly">Hàng tuần</SelectItem>
                                <SelectItem value="yearly">Hàng năm</SelectItem>
                            </SelectContent>
                        </Select>
                        
                        <Button onClick={handleSave} className="w-full mt-4 bg-red-600 hover:bg-red-700">
                            Lưu Hạn mức
                        </Button>
                    </div>
                )}
                {!isLimitEnabled && (
                     <p className="text-sm text-muted-foreground pt-2 flex items-center">
                        <AlertTriangle className='w-4 h-4 mr-1 text-yellow-500'/> Hạn mức giúp bạn kiểm soát chi tiêu tốt hơn.
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

// =========================================================================
// H. COMPONENT: Form Quyền Cộng tác (Giữ nguyên)
// =========================================================================
const SharedPermissionsForm = ({ wallet }: { wallet: WalletType }) => {
    
    const [collaborators, setCollaborators] = useState(wallet.collaborators || []);

    const handleAddCollaborator = () => {
        const newCollaborator = { name: 'New User', email: `user${Date.now()}@mock.com`, role: 'viewer' as const };
        setCollaborators([...collaborators, newCollaborator]);
    };

    const handleRemoveCollaborator = (email: string) => {
        setCollaborators(collaborators.filter(c => c.email !== email));
    };

    const handleUpdateRole = (email: string, newRole: 'owner' | 'editor' | 'viewer') => {
        setCollaborators(collaborators.map(c => 
            c.email === email ? { ...c, role: newRole } : c
        ));
    };

    return (
        <Card className="shadow-lg border-l-4 border-l-teal-500">
            <CardHeader>
                <CardTitle className="flex items-center text-teal-600">
                    <Users className="w-5 h-5 mr-2" /> Quyền Cộng tác
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Danh sách người được chia sẻ ví này:</p>
                
                <div className="space-y-2">
                    {collaborators.map((collab) => (
                        <div key={collab.email} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">{collab.name}</span>
                                <span className="text-xs text-muted-foreground">{collab.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Select 
                                    value={collab.role} 
                                    onValueChange={(newRole) => handleUpdateRole(collab.email, newRole as 'owner' | 'editor' | 'viewer')}
                                >
                                    <SelectTrigger className="w-[100px] text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="owner">Chủ sở hữu</SelectItem>
                                        <SelectItem value="editor">Chỉnh sửa</SelectItem>
                                        <SelectItem value="viewer">Chỉ xem</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleRemoveCollaborator(collab.email)}
                                    className="text-red-500 hover:bg-red-50"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <Button onClick={handleAddCollaborator} variant="outline" className="w-full mt-2">
                    <Plus className="w-4 h-4 mr-2" /> Thêm Cộng tác viên
                </Button>
                <Button className="w-full mt-2 bg-teal-600 hover:bg-teal-700">Lưu Phân quyền</Button>
            </CardContent>
        </Card>
    );
};


// =========================================================================
// MAIN PAGE COMPONENT
// =========================================================================
export default function WalletSettingsPage() {
    const router = useRouter();
    
    // Sử dụng Mock Data đã bổ sung
    const wallets = MOCK_WALLETS_WITH_SETTINGS;
    
    // Đã sửa lỗi 2: Khởi tạo selectedWalletId an toàn
    const initialWalletId = wallets.length > 0 ? wallets[0].id : '';
    const [selectedWalletId, setSelectedWalletId] = useState<string>(initialWalletId);

    const selectedWallet = useMemo(() => {
        return wallets.find(w => w.id === selectedWalletId) || wallets[0];
    }, [selectedWalletId, wallets]);


    // ... (Các hàm xử lý khác giữ nguyên)
    const handleGeneralSave = (wallet: WalletType) => {
        console.log(`Lưu Cấu hình Cơ bản cho Ví ${wallet.name}`);
    };

    const handleCategoryChange = (walletId: string, categoryId: string) => {
        console.log(`Lưu Danh mục mặc định ${categoryId} cho Ví ID: ${walletId}`);
    };

    const handleDeleteWallet = (walletId: string, walletName: string) => {
        if (confirm(`Bạn có chắc chắn muốn XÓA VĨNH VIỄN ví "${walletName}" không? Thao tác này không thể hoàn tác.`)) {
            console.log(`Đã thực hiện xóa ví ID: ${walletId}`);
            router.push('/wallets'); 
        }
    };


    if (!selectedWalletId || !selectedWallet) {
        return (
             <MainLayout>
                <div className="flex justify-center items-center h-[50vh] text-center">
                    <p className="text-xl text-muted-foreground">Không có ví nào để cấu hình. Vui lòng thêm ví mới.</p>
                </div>
            </MainLayout>
        );
    }
    
    return (
        <MainLayout>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <PageTitle title="Cài đặt Chi tiết Ví" />
                    <Button variant="outline" onClick={() => router.push('/wallets')}>
                        <ChevronLeft className="w-4 h-4 mr-2" /> Quay lại Dashboard
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* CỘT 1: THANH ĐIỀU HƯỚNG VÍ */}
                    <div className="lg:col-span-1 space-y-3">
                        <h3 className="text-xl font-semibold border-b pb-2">Chọn Ví để Cấu hình</h3>
                        {wallets.map((wallet) => (
                            <Button
                                key={wallet.id}
                                variant={selectedWalletId === wallet.id ? "default" : "ghost"}
                                className={`w-full justify-start ${selectedWalletId === wallet.id ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md' : 'text-foreground'}`}
                                onClick={() => setSelectedWalletId(wallet.id)}
                            >
                                <Wallet className="w-4 h-4 mr-3" />
                                {wallet.name}
                                {wallet.status === 'archived' && <span className="ml-2 text-xs opacity-70">(Lưu trữ)</span>}
                            </Button>
                        ))}
                    </div>

                    {/* CỘT 2-4: CHI TIẾT CÀI ĐẶT (Giữ nguyên) */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="shadow-xl border-t-4 border-t-indigo-500">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center text-indigo-700">
                                    <Settings className="w-6 h-6 mr-2" /> Cấu hình Ví: {selectedWallet.name}
                                </CardTitle>
                                <div className="flex items-center mt-2 text-sm">
                                    <Banknote className='w-4 h-4 mr-1 text-green-600' /> 
                                    Số dư: <span className="font-bold ml-1 text-green-600">{formatFullCurrency(selectedWallet.balance)}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* PHẦN 1: CẤU HÌNH CƠ BẢN */}
                                <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                                    <h4 className="font-semibold flex items-center"><Edit className='w-4 h-4 mr-2'/> Thông tin Cơ bản</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="wallet-name">Tên Ví</Label>
                                            <Input id="wallet-name" defaultValue={selectedWallet.name} />
                                        </div>
                                        <div>
                                            <Label htmlFor="wallet-status">Trạng thái</Label>
                                            <Select defaultValue={selectedWallet.status}>
                                                <SelectTrigger id="wallet-status">
                                                    <SelectValue placeholder="Chọn trạng thái" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Hoạt động</SelectItem>
                                                    <SelectItem value="archived">Lưu trữ (Không hoạt động)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <Button onClick={() => handleGeneralSave(selectedWallet)} className='mt-2'>Lưu Cấu hình Cơ bản</Button>
                                </div>

                                {/* PHẦN 2: TÍNH NĂNG KỶ LUẬT (HẠN MỨC) */}
                                <SpendingLimitForm wallet={selectedWallet} />
                                
                                {/* PHẦN 3: TÍNH NĂNG TỰ ĐỘNG HÓA (DANH MỤC MẶC ĐỊNH) */}
                                <Card className="shadow-lg border-l-4 border-l-blue-500">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-blue-600">
                                            <Clock className="w-5 h-5 mr-2" /> Tự động hóa Giao dịch
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Label>Danh mục Mặc định cho giao dịch mới từ Ví này</Label>
                                        <Select 
                                            defaultValue={selectedWallet.default_category_id}
                                            onValueChange={(id) => handleCategoryChange(selectedWallet.id, id)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Chọn Danh mục mặc định" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">Không đặt (Mặc định)</SelectItem>
                                                {MOCK_CATEGORIES.map(cat => (
                                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-sm text-muted-foreground pt-1">
                                            <CheckCircle className='w-4 h-4 mr-1 inline text-green-500'/> 
                                            Giúp việc ghi chép nhanh chóng và nhất quán hơn.
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* PHẦN 4: QUẢN LÝ CỘNG TÁC (CHỈ HIỂN THỊ NẾU LÀ VÍ CHUNG) */}
                                {selectedWallet.is_shared && (
                                    <SharedPermissionsForm wallet={selectedWallet} />
                                )}

                                {/* PHẦN 5: XÓA VÍ NGUY HIỂM */}
                                <div className="pt-6 border-t border-red-200">
                                    <h4 className="text-lg font-bold text-red-600 flex items-center">
                                        <Lock className='w-5 h-5 mr-2'/> Vùng Nguy Hiểm
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Thao tác này sẽ xóa vĩnh viễn ví và tất cả giao dịch liên quan.
                                    </p>
                                    <Button 
                                        variant="destructive" 
                                        className="mt-3"
                                        onClick={() => handleDeleteWallet(selectedWallet.id, selectedWallet.name)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" /> Xóa Ví Vĩnh Viễn
                                    </Button>
                                </div>
                                
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}