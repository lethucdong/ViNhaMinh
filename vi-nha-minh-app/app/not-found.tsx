"use client";

import Link from 'next/link';
import { Home, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    // Sử dụng flexbox để căn giữa nội dung trên toàn màn hình
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">

      <Frown className="w-20 h-20 text-indigo-600 dark:text-indigo-400 mb-6 animate-pulse" />

      {/* Mã Lỗi Lớn */}
      <h1 className="text-8xl font-extrabold tracking-widest text-indigo-700 dark:text-indigo-500 mb-4">
        404
      </h1>

      {/* Tiêu đề Lỗi */}
      <h2 className="text-3xl font-bold mb-4 tracking-tight">
        Không Tìm Thấy Trang
      </h2>

      {/* Mô tả Lỗi */}
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Rất tiếc, trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không có sẵn.
      </p>

      {/* Nút Quay Lại Trang Chủ */}
      <Link href="/dashboard" passHref>
        <Button
          size="lg"
          // Áp dụng style nút nổi bật (gradient, shadow) để đồng bộ
          className="cursor-pointer text-white font-bold rounded-xl shadow-lg shadow-indigo-600/50 dark:shadow-indigo-900/50 px-6 py-3 
                               hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
        >
          <Home className="w-5 h-5 mr-2" /> Quay Lại Trang Chủ
        </Button>
      </Link>
    </div>
  );
}