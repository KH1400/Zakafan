'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../lib/language-context';
import Loading from './fourfold/loading';

type role = 'admin' | 'user';
interface ProtectedRouteProps {
  children: React.ReactNode;
  accessRoles?: role[],
  isLoading?: boolean
}

const notAccess = {
  en: "You Do Not Have Permission to Access This Page",
  fa: "شما مجوز دسترسی به این صفحه را ندارید",
  ar: "ليست لديك صلاحية الوصول إلى هذه الصفحة",
  he: "אין לך הרשאה לגשת לעמוד זה"
};

export default function ProtectedRoute({ children, accessRoles = ['user'], isLoading = false }: ProtectedRouteProps) {
  const { user, token, loading } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !token)) {
      setIsRedirecting(true);
      router.push(`/auth/signin?redirectTo=${pathname}`);
    }
  }, [loading, user, token, pathname, router]);

  if (loading || isRedirecting) {
    return (
      null
    );
  }

  if (!user || !token) {
    return null;
  }

  // بررسی دسترسی کاربر
  if (!accessRoles.includes(user.roles[0] as role)) {
    return (
      <div className="h-full">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-64">
            <p>{notAccess[language]}</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}