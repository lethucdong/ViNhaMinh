// app/(auth)/login/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { LogIn, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  return (
    <Card className='shadow-2xl rounded-xl border-t-4 border-indigo-500'>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Đăng Nhập</CardTitle>
        <CardDescription>
          Chào mừng trở lại! Hãy nhập thông tin của bạn.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="example@email.com" className="pl-10" required />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mật khẩu</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" className="pl-10" required />
            </div>
          </div>
          {/* SỬ DỤNG bg-primary MỚI */}
          <Button type="submit" className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.01]">
            <LogIn className='w-5 h-5 mr-2' /> Đăng Nhập
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Chưa có tài khoản?{' '}
            <Link href="/signup" className="underline text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium">
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}