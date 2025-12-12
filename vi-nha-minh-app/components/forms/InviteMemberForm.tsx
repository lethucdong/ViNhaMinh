// components/forms/InviteMemberForm.tsx
"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Mail, Lock } from 'lucide-react';
import { useState } from 'react';

// Ví dụ về Form mời thành viên sử dụng Sheet
export function InviteMemberForm({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('MEMBER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Mời ${email} với vai trò ${role}`);
    // Logic gọi API ở đây...
    onOpenChange(false); // Đóng sheet sau khi gửi
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className='sm:max-w-md p-6'>
        <SheetHeader>
          <SheetTitle className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
            <UserPlus className='inline-block w-6 h-6 mr-2' /> Mời Thành Viên Mới
          </SheetTitle>
          <SheetDescription className='mt-2'>
            Gửi lời mời tham gia Ví Chung (Ví dụ: "Quỹ Sinh Hoạt") qua email.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="invite-email">Địa chỉ Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="invite-email" type="email" placeholder="Nhập email thành viên" className="pl-10" required
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Vai trò</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Quản trị viên (ADMIN)</SelectItem>
                <SelectItem value="MEMBER">Thành viên (MEMBER)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full mt-4 bg-primary hover:bg-indigo-700 transition-all duration-300">
            Gửi Lời Mời
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

// **Cách sử dụng:**
// Trong WalletsPage.tsx:
// import { InviteMemberForm } from '@/components/forms/InviteMemberForm';
// const [isInviteOpen, setIsInviteOpen] = useState(false);
// <Button onClick={() => setIsInviteOpen(true)}>Mời Thành Viên</Button>
// <InviteMemberForm open={isInviteOpen} onOpenChange={setIsInviteOpen} />