// components/forms/wallet-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Cần cài đặt Textarea
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Cần cài đặt Select

// Cài đặt các component cần thiết:
// npx shadcn-ui@latest add textarea select

// 1. Định nghĩa Schema (Zod)
const WalletSchema = z.object({
  name: z.string().min(3, {
    message: "Tên Ví phải có ít nhất 3 ký tự.",
  }),
  description: z.string().optional(),
  currency: z.enum(["VND", "USD", "EUR"], {
    message: "Vui lòng chọn loại tiền tệ.", // ĐÃ SỬA
  }),
});

type WalletFormValues = z.infer<typeof WalletSchema>;

interface WalletFormProps {
  initialData?: WalletFormValues;
  onSubmitAction: (data: WalletFormValues) => void;
}

export function WalletForm({ initialData, onSubmitAction }: WalletFormProps) {
  const form = useForm<WalletFormValues>({
    resolver: zodResolver(WalletSchema),
    defaultValues: initialData || { name: "", description: "", currency: "VND" },
  });

  const isUpdating = !!initialData;

  const onSubmit = (data: WalletFormValues) => {
    onSubmitAction(data);
    // Thường reset form sau khi tạo mới thành công: form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Tên Ví */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Ví</FormLabel>
              <FormControl>
                <Input placeholder="Ví chi tiêu cá nhân" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Loại Tiền tệ */}
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiền tệ</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại tiền tệ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="VND">VNĐ - Việt Nam Đồng</SelectItem>
                  <SelectItem value="USD">USD - Đô la Mỹ</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mô tả */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả (Tùy chọn)</FormLabel>
              <FormControl>
                <Textarea placeholder="Mục đích sử dụng của ví..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isUpdating ? "Lưu Ví" : "Tạo Ví mới"}
        </Button>
      </form>
    </Form>
  );
}