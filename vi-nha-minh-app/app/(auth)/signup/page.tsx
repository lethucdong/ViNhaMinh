// app/(auth)/signup/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { User, Mail, Lock, LogIn } from 'lucide-react';

export default function SignupPage() {
  return (
    <Card className='shadow-2xl rounded-xl border-t-4 border-indigo-500'>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Tạo Tài Khoản</CardTitle>
        <CardDescription>
          Bắt đầu quản lý tài chính thông minh ngay hôm nay!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Tên của bạn</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="name" type="text" placeholder="Nguyễn Văn A" className="pl-10" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="example@email.com" className="pl-10" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" className="pl-10" required />
            </div>
          </div>
          {/* SỬ DỤNG bg-primary MỚI */}
          <Button type="submit" className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.01]">
            <LogIn className='w-5 h-5 mr-2' /> Đăng Ký
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Đã có tài khoản?{' '}
            <Link href="/login" className="underline text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium">
              Đăng nhập
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}