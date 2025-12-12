// components/shared/Header.tsx
import { User, Bell, LogOut, Settings, BarChart3, ChevronDown, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

// Dữ liệu giả lập thông báo
const mockNotifications = [
    { id: 1, message: "Giao dịch Chi Tiêu 500k đã được ghi nhận.", time: "5 phút trước" },
    { id: 2, message: "Bình Trần đã thêm bạn vào Ví Quỹ Chung.", time: "1 giờ trước" },
];

export function Header() {
    return (
        <header className="sticky top-0 z-20 w-full bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4 hidden md:flex justify-end items-center space-x-4">
            
            {/* 1. Notifications */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative transition-all duration-300 hover:bg-secondary/70">
                        <Bell className="h-5 w-5" />
                        {mockNotifications.length > 0 && (
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background animate-pulse" />
                        )}
                        <span className="sr-only">Thông báo</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-2 shadow-xl rounded-xl" align="end" forceMount>
                    <DropdownMenuLabel className="font-bold text-lg text-indigo-600 dark:text-indigo-400">Thông báo ({mockNotifications.length})</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {mockNotifications.length > 0 ? (
                        mockNotifications.map(notification => (
                            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer hover:bg-secondary/70 rounded-lg transition-colors duration-200">
                                <p className="font-medium text-sm">{notification.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <DropdownMenuItem className='text-muted-foreground justify-center'>Không có thông báo mới.</DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='justify-center text-sm text-indigo-600 dark:text-indigo-400 font-medium'>
                        Xem tất cả
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* 2. User Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 transition-all duration-300 hover:bg-secondary/70 rounded-lg px-3">
                        <User className="h-5 w-5 text-indigo-500" />
                        <span className="font-semibold hidden sm:inline">An Nguyễn</span>
                        <ChevronDown className='w-4 h-4 text-muted-foreground'/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-2 shadow-xl rounded-xl" align="end" forceMount>
                    <DropdownMenuLabel className="font-bold text-base">Tài khoản của tôi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href="/dashboard">
                            <DropdownMenuItem className='cursor-pointer flex items-center'><BarChart3 className="mr-2 h-4 w-4" /> Dashboard</DropdownMenuItem>
                        </Link>
                        <Link href="/settings">
                            <DropdownMenuItem className='cursor-pointer flex items-center'><Settings className="mr-2 h-4 w-4" /> Cài đặt</DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <Link href="/login"> {/* Thực tế sẽ là /api/auth/logout */}
                        <DropdownMenuItem className="text-red-500 dark:text-red-400 cursor-pointer flex items-center">
                            <LogOut className="mr-2 h-4 w-4" /> Đăng Xuất
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}