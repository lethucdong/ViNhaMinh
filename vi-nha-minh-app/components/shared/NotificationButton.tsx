// components/shared/NotificationButton.tsx

"use client";

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

// Dữ liệu mẫu (mock data) được tích hợp trong component
const mockNotifications = [
  { id: 1, message: "Giao dịch Chi Tiêu 500k đã được ghi nhận.", time: "5 phút trước" },
  { id: 2, message: "Bình Trần đã thêm bạn vào Ví Quỹ Chung.", time: "1 giờ trước" },
  { id: 3, message: "Lương tháng đã được ghi nhận vào Ví Ngân Hàng.", time: "Hôm qua" },
];

const NotificationButton: React.FC = () => {
  const unreadCount = mockNotifications.length;

  // Hàm giả định xử lý khi click vào "Xem tất cả" hoặc một thông báo
  const handleViewAll = () => {
    // Thay thế bằng logic điều hướng tới trang /dashboard/notifications
    console.log("Điều hướng tới trang Thông báo chi tiết");
  };

  const handleNotificationClick = (id: number) => {
    // Thay thế bằng logic điều hướng tới giao dịch/ví liên quan
    console.log(`Xem chi tiết thông báo ID: ${id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="
                        relative 
                        transition-all 
                        duration-300 
                        hover:bg-secondary/70 
                        rounded-full 
                        // Thêm màu nhấn Indigo cho icon để nhất quán với Header
                        text-indigo-600 dark:text-indigo-400
                    "
          aria-label={`Thông báo, ${unreadCount} chưa đọc`}
        >
          <Bell className="h-5 w-5" />

          {/* Hiển thị vòng tròn thông báo nếu có thông báo mới */}
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background animate-pulse" />
          )}
          <span className="sr-only">Thông báo</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 p-2 shadow-2xl rounded-xl border border-indigo-200 dark:border-indigo-900"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-bold text-lg text-indigo-700 dark:text-indigo-400">
          Thông báo ({unreadCount})
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className='max-h-80 overflow-y-auto'>
          {unreadCount > 0 ? (
            mockNotifications.map(notification => (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className="flex flex-col items-start p-3 cursor-pointer hover:bg-secondary/70 rounded-lg transition-colors duration-200"
              >
                <p className="font-medium text-sm">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled className='text-muted-foreground justify-center'>
              Không có thông báo mới.
            </DropdownMenuItem>
          )}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleViewAll}
          className='justify-center text-sm text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer'
        >
          Xem tất cả
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationButton;