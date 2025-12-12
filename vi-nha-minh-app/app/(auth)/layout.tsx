// app/(auth)/layout.tsx
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}