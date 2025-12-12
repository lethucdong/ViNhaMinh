// app/(main)/settings/page.tsx
import MainLayout from '@/components/shared/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Settings, User, Lock, DollarSign, LogOut } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
          <Settings className="w-8 h-8" /> <span>Cài Đặt Ứng Dụng</span>
        </h1>
        <p className="text-muted-foreground">Quản lý tài khoản, thông báo và tùy chọn ứng dụng của bạn.</p>

        <Separator />

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-fit">
            <TabsTrigger value="account" className='flex items-center space-x-2'><User className='w-4 h-4' /> Tài khoản</TabsTrigger>
            <TabsTrigger value="security" className='flex items-center space-x-2'><Lock className='w-4 h-4' /> Bảo mật</TabsTrigger>
            <TabsTrigger value="app-config" className='flex items-center space-x-2'><DollarSign className='w-4 h-4' /> Cấu hình App</TabsTrigger>
          </TabsList>

          {/* Tab 1: Tài khoản */}
          <TabsContent value="account" className='mt-6'>
            <Card className='rounded-xl shadow-lg'>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>Cập nhật tên và địa chỉ email của bạn.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên hiển thị</Label>
                  <Input id="name" defaultValue="An Nguyễn" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="annguyen@example.com" readOnly className='bg-muted/50 cursor-not-allowed' />
                </div>
                {/* SỬ DỤNG bg-primary MỚI */}
                <Button className='bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300'>Lưu Thay Đổi</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Bảo mật */}
          <TabsContent value="security" className='mt-6'>
            <Card className='rounded-xl shadow-lg'>
              <CardHeader>
                <CardTitle>Thay đổi mật khẩu</CardTitle>
                <CardDescription>Đảm bảo mật khẩu của bạn là duy nhất và mạnh.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <Input id="new-password" type="password" />
                </div>
                {/* SỬ DỤNG màu destructive */}
                <Button variant="destructive" className='bg-destructive hover:bg-destructive/90 transition-all duration-300'>Đổi Mật Khẩu</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Cấu hình App */}
          <TabsContent value="app-config" className='mt-6'>
            <Card className='rounded-xl shadow-lg'>
              <CardHeader>
                <CardTitle>Tùy chọn ứng dụng</CardTitle>
                <CardDescription>Thiết lập định dạng hiển thị và thông báo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">

                <div className='flex items-center justify-between'>
                  <Label>Đơn vị tiền tệ mặc định</Label>
                  <Input className='w-[100px] text-center font-bold' defaultValue='VND' />
                </div>

                <div className='flex items-center justify-between'>
                  <Label>Hiển thị số dư chung trên Dashboard</Label>
                  <Switch defaultChecked />
                </div>

                <div className='flex items-center justify-between'>
                  <Label>Cho phép thông báo đẩy (Push Notifications)</Label>
                  <Switch />
                </div>

                <Button variant='secondary' className='w-full'><LogOut className='w-4 h-4 mr-2' /> Đăng Xuất tất cả thiết bị</Button>

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}