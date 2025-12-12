// components/shared/MobileSidebar.tsx
import Link from 'next/link';
import { Menu, LayoutDashboard, Wallet, Repeat2, PiggyBank, Users, Settings, LogOut, User, LucideProps } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'; // Cần import React và các kiểu liên quan

// Định nghĩa Interface chung cho tất cả các mục điều hướng
interface NavItem {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  // Thêm các thuộc tính tùy chọn, chỉ tồn tại trên action items
  isAction?: boolean; // Tùy chọn
  onClick?: () => void; // Tùy chọn
}

// --- DANH SÁCH ĐIỀU HƯỚNG CHÍNH ---
// Sử dụng kiểu NavItem[]
const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Tổng Quan', icon: LayoutDashboard },
  { href: '/wallets', label: 'Quản Lý Ví', icon: Wallet },
  { href: '/transactions', label: 'Giao Dịch', icon: Repeat2 },
  { href: '/debt', label: 'Sổ Nợ', icon: PiggyBank },
  { href: '/groups', label: 'Quản Lý Nhóm', icon: Users },
];

// --- DANH SÁCH HÀNH ĐỘNG PHỤ/CÀI ĐẶT ---
// Sử dụng kiểu NavItem[]
const actionItems: NavItem[] = [
  { href: '/profile', label: 'Hồ Sơ (Profile)', icon: User },
  { href: '/settings', label: 'Cài Đặt', icon: Settings },
  // Mục Đăng Xuất với thuộc tính cụ thể
  {
    href: '#',
    label: 'Đăng Xuất',
    icon: LogOut,
    isAction: true,
    onClick: () => console.log('Handling Logout...')
  },
];

// Component Điều hướng
// Bây giờ, `items` có kiểu NavItem[], nơi TypeScript biết `isAction` và `onClick` là tùy chọn.
const Navigation = ({ items }: { items: NavItem[] }) => (
  <nav className="flex flex-col space-y-1">
    {items.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        // TypeScript hiện cho phép truy cập item.onClick/isAction vì chúng được khai báo là tùy chọn (?) trong interface
        onClick={item.onClick}
        className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-colors 
                    hover:bg-indigo-100 dark:hover:bg-indigo-900/40
                    ${item.isAction ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-foreground'}
                `}
      >
        <item.icon className="w-5 h-5" />
        <span className="font-medium">{item.label}</span>
      </Link>
    ))}
  </nav>
);

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Mở menu điều hướng">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="p-4 w-[250px] sm:w-[300px] flex flex-col justify-between"
      >
        {/* PHẦN TRÊN: TIÊU ĐỀ & ĐIỀU HƯỚNG CHÍNH */}
        <div>
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 border-b pb-2">
              💰 FinTrack Menu
            </SheetTitle>
          </SheetHeader>

          {/* Danh sách Điều hướng Chính */}
          <div className='mt-4'>
            <Navigation items={navItems} />
          </div>
        </div>

        {/* PHẦN DƯỚI: HÀNH ĐỘNG PHỤ & LOGOUT */}
        <div className="mb-4">
          <Separator className="my-4 bg-muted/50" />
          <Navigation items={actionItems} />
        </div>

      </SheetContent>
    </Sheet>
  );
}