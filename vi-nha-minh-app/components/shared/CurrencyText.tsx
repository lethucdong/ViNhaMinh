"use client";

import { cn } from "@/lib/utils";

interface CurrencyTextProps {
  value: number;
  className?: string;
  maxWidth?: string; // tailwind max-w
  clamp?: string;    // font-size clamp
  title?: boolean;   // show tooltip native
}

export default function CurrencyText({
  value,
  className = "",
  maxWidth = "max-w-full",
  clamp = "clamp(0.9rem,2.5vw,1.25rem)",
  title = true,
}: CurrencyTextProps) {
  return (
    <span
      title={title ? value.toLocaleString("vi-VN") + " VNĐ" : undefined}
      className={cn(
        "block font-extrabold whitespace-nowrap overflow-hidden text-ellipsis",
        maxWidth,
        `text-[${clamp}]`,
        className
      )}
    >
      {value.toLocaleString("vi-VN")} VNĐ
    </span>
  );
}
