// app/layout.tsx (Code đảm bảo font chữ được tải)
import type { Metadata } from "next";
import { Fuzzy_Bubbles  } from "next/font/google"; // Dùng Inter của Google
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fuzzy_bubbles = Fuzzy_Bubbles({
  weight: ["400", "700"],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-fuzzy-bubbles',
  display: 'optional',
})

export const metadata: Metadata = {
  title: "FinTrack - Quản lý Tài chính",
  description: "Ứng dụng quản lý tài chính cá nhân và cộng tác.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={` ${fuzzy_bubbles.variable}`}>
      <body
        className={`min-h-screen bg-background antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}