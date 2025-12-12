// components/shared/Sidebar.tsx
import Link from 'next/link';
import { LayoutDashboard, Wallet, Repeat2, PiggyBank, Users, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/dashboard', label: 'Tổng Quan', icon: LayoutDashboard },
  { href: '/wallets', label: 'Quản Lý Ví', icon: Wallet },
  { href: '/transactions', label: 'Giao Dịch', icon: Repeat2 },
  { href: '/debt', label: 'Sổ Nợ', icon: PiggyBank },
  { href: '/groups', label: 'Ví Cộng Tác', icon: Users },
];

export function Sidebar() {
  return (
    // Sidebar cho màn hình Desktop
    <div className="hidden md:flex flex-col h-full border-r bg-card text-card-foreground p-6 w-64 fixed shadow-xl dark:shadow-none">
      <div className="text-3xl font-black mb-10 text-indigo-600 dark:text-indigo-400 flex items-center">
        <span className='mr-2'>💰</span> FinTrack
      </div>
      <nav className="flex flex-col space-y-2 flex-grow">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            // Thêm transition để animation mượt
            className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 
                                   text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/70 dark:hover:bg-indigo-900/40
                                   aria-[current=page]:bg-indigo-100 dark:aria-[current=page]:bg-indigo-900 
                                   aria-[current=page]:text-indigo-700 dark:aria-[current=page]:text-indigo-300 aria-[current=page]:font-bold"
            // Tạm thời sử dụng href làm indicator cho active state
            aria-current={item.href === '/dashboard' ? 'page' : undefined}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-semibold">{item.label}</span>
          </Link>
        ))}
      </nav>
      <Separator className='my-4' />
      {/* Cài đặt và Theme */}
      <Link
        href="/settings"
        className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-muted-foreground hover:text-primary hover:bg-secondary/70"
      >
        <Settings className="w-5 h-5" />
        <span className="font-semibold">Cài Đặt</span>
      </Link>
      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <span className='text-sm text-muted-foreground'>Chế độ</span>
        <ThemeToggle />
      </div>
    </div>
  );
}