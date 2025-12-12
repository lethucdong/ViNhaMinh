// components/shared/MainLayout.tsx
import { Sidebar } from './Sidebar';
import { MobileSidebar } from './MobileSidebar';
import { ThemeToggle } from './ThemeToggle';
import { Header } from './Header'; // Import Header mới

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 md:ml-64">

        {/* Desktop Header (Notification & User Menu) */}
        <Header />

        {/* Mobile Header (Cho màn hình nhỏ) */}
        <header className="md:hidden sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4 flex justify-between items-center">
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">💰 FinTrack</div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <MobileSidebar />
          </div>
        </header>

        {/* Nội dung chính của trang */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}