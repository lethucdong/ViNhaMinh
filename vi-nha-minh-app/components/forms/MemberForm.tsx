// components/forms/member-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 

// 1. Định nghĩa Schema (Zod)
const MemberSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
  role: z.enum(["OWNER", "ADMIN", "VIEWER"], {
    message: "Vui lòng chọn vai trò.", // ĐÃ SỬA
  }),
});

type MemberFormValues = z.infer<typeof MemberSchema>;

interface MemberFormProps {
  walletId: string; // ID ví để biết thêm vào ví nào
  initialData?: MemberFormValues;
  onSubmitAction: (data: MemberFormValues) => void;
}

export function MemberForm({ walletId, initialData, onSubmitAction }: MemberFormProps) {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(MemberSchema),
    defaultValues: initialData || { email: "", role: "VIEWER" },
  });

  const isUpdating = !!initialData;

  const onSubmit = (data: MemberFormValues) => {
    // Gửi cả ID ví và dữ liệu thành viên
    onSubmitAction({ ...data }); 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Email Thành viên */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ Email</FormLabel>
              <FormControl>
                {/* Chỉ cho phép chỉnh sửa Email khi tạo mới */}
                <Input placeholder="thanhvien@example.com" {...field} disabled={isUpdating} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vai trò */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vai trò</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò của thành viên" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="OWNER">Chủ sở hữu (Owner)</SelectItem>
                  <SelectItem value="ADMIN">Quản trị viên (Admin)</SelectItem>
                  <SelectItem value="VIEWER">Người xem (Viewer)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isUpdating ? "Cập nhật Vai trò" : "Thêm Thành viên"}
        </Button>
      </form>
    </Form>
  );
}