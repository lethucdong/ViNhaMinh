// components/shared/MobileSidebar.tsx
import Link from 'next/link';
import { Menu, LayoutDashboard, Wallet, Repeat2, PiggyBank, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Import thêm SheetHeader và SheetTitle
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const navItems = [
  { href: '/dashboard', label: 'Tổng Quan', icon: LayoutDashboard },
  { href: '/wallets', label: 'Quản Lý Ví', icon: Wallet },
  { href: '/transactions', label: 'Giao Dịch', icon: Repeat2 },
  { href: '/debt', label: 'Sổ Nợ', icon: PiggyBank },
];

const Navigation = () => (
  <nav className="flex flex-col space-y-2 mt-4">
    {navItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-primary/10 dark:hover:bg-primary/20"
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
      <SheetContent side="left" className="p-4 w-[250px] sm:w-[300px]">
        {/* THÊM SheetHeader và SheetTitle ĐỂ SỬA LỖI ACCESSIBILITY */}
        <SheetHeader>
          {/* SheetTitle là bắt buộc cho accessibility */}
          <SheetTitle className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 border-b pb-2">
            💰 FinTrack Menu
          </SheetTitle>
        </SheetHeader>
        {/* Chúng ta không cần SheetDescription vì nó là menu điều hướng,
                  nhưng việc có SheetTitle là đủ để đáp ứng yêu cầu của Radix UI.
                */}

        <Navigation />
      </SheetContent>
    </Sheet>
  );
}