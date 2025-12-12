"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"; // Đảm bảo đã import
import { Button } from "@/components/ui/button"; // Đảm bảo đã import

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  // KHAI BÁO STATE ĐỂ XÁC NHẬN COMPONENT ĐÃ MOUNT (CHẠY TRÊN CLIENT)
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Chỉ chạy trên Client, sau lần render đầu tiên (hydration)
    setMounted(true);
  }, []);

  // Nếu chưa mount (đang SSR hoặc Hydrating), render null để tránh xung đột
  if (!mounted) {
    // Trả về một phần tử chiếm không gian để tránh nhảy layout (ví dụ: Button trống)
    return (
      <Button variant="ghost" size="icon" disabled className="w-9 h-9">
        {/* Có thể trả về một placeholder nếu cần */}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}