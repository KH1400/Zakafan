'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user || !token) {
      router.push(`/auth/signin?redirectTo=${pathname}`);
    }
  }, [user, token, pathname]);

  if (!user || !token) {
    return <div className="h-full">
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    </div>
  </div>; // یا لودر
  }

  return <>{children}</>;
}