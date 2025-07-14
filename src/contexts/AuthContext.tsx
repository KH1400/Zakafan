"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiPostRefreshToken, apiPostSignin, apiPostSignup, baseUrl } from '../lib/api';

interface User {
  id: string;
  email: string;
  name?: string;
  // سایر فیلدهای کاربر که از API می‌آید
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string, captcha_token: string, remember_me?: boolean) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// تابع برای استخراج اطلاعات کاربر از JWT
const extractUserFromToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.user_id || payload.sub,
      email: payload.email,
      name: payload.name || payload.username,
      // سایر فیلدهای موجود در JWT
    };
  } catch (error) {
    console.error('خطا در استخراج اطلاعات کاربر از token:', error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // بررسی وجود token در localStorage هنگام بارگذاری
    const savedToken = localStorage.getItem('auth_token');
    const savedRefreshToken = localStorage.getItem('refresh_token');
    const savedUser = localStorage.getItem('auth_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setRefreshTokenValue(savedRefreshToken);
      setUser(JSON.parse(savedUser));
    } else if (savedToken) {
      // اگر user در localStorage نباشد، از token استخراج کنید
      const userData = extractUserFromToken(savedToken);
      if (userData) {
        setToken(savedToken);
        setRefreshTokenValue(savedRefreshToken);
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string, captcha_token: string = "string", remember_me: boolean = false) => {
    try {
      const response= await apiPostSignin({email, password, captcha_token, remember_me});

      const data: {
        access: string,
        access_exp: string,
        refresh: string,
        refresh_exp: string
      } | {message: string} = await response.json();

      if ('message' in data) {
        return { error: data.message || 'خطا در ورود' };
      }

      const { access: authToken, refresh: refreshToken } = data;
      
      // اینجا فرض می‌کنیم از JWT اطلاعات کاربر را استخراج می‌کنیم
      const userData = extractUserFromToken(authToken);
      
      setToken(authToken);
      setRefreshTokenValue(refreshToken);
      setUser(userData);
      
      // ذخیره در localStorage
      localStorage.setItem('auth_token', authToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('auth_user', JSON.stringify(userData));

      return { error: null };
    } catch (error) {
      return { error: 'خطا در برقراری ارتباط با سرور' };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const response= await apiPostSignup({email, password});

      const data: {message: string} = await response.json();

      if (!response.ok) {
        return { error: data.message || 'خطا در ثبت نام' };
      }

      return { error: null };
    } catch (error) {
      return { error: 'خطا در برقراری ارتباط با سرور' };
    }
  };

  const refreshToken = async () => {
    try {
      if (!refreshTokenValue) {
        return { error: 'Refresh token موجود نیست' };
      }

      const response = await apiPostRefreshToken({refresh: refreshTokenValue})

      const data: {
        access: string,
        access_exp: string
      } | { message: string} = await response.json();

      if ('message' in data) {
        // اگر refresh token منقضی شده باشد، کاربر را logout کنید
        if (response.status === 401) {
          await signOut();
          return { error: 'نشست شما منقضی شده است. لطفاً دوباره وارد شوید' };
        }
        return { error: data.message || 'خطا در بروزرسانی توکن' };
      }

      const { access: newToken } = data;
      
      console.log('Refresh Token:', newToken);
      setToken(newToken);
      
      // بروزرسانی localStorage
      localStorage.setItem('auth_token', newToken);

      return { error: null };
    } catch (error) {
      return { error: 'خطا در برقراری ارتباط با سرور' };
    }
  };

  const signOut = async () => {
      // پاک کردن state و localStorage
      setUser(null);
      setToken(null);
      setRefreshTokenValue(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('auth_user');
  };

  const value = {
    user,
    token,
    loading,
    signIn,
    signUp,
    signOut,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook برای مدیریت خودکار refresh token
export const useAutoRefreshToken = () => {
  const { token, refreshToken } = useAuth();

  useEffect(() => {
    if (!token) return;

    // تابع برای بررسی انقضا token
    const checkTokenExpiry = () => {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        console.log('Refresh Token:', tokenData);
        // اگر token در عرض 5 دقیقه منقضی می‌شود، refresh کن
        if (tokenData.exp && tokenData.exp - currentTime < 300) {
          refreshToken();
        }
      } catch (error) {
        console.error('خطا در بررسی انقضای token:', error);
      }
    };

    // بررسی هر 4 دقیقه
    const interval = setInterval(checkTokenExpiry, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token, refreshToken]);
};

// Hook برای fetch با مدیریت خودکار refresh token
export const useAuthenticatedFetch = () => {
  const { token, refreshToken } = useAuth();

  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const makeRequest = async (authToken: string) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
    };

    if (!token) {
      throw new Error('کاربر وارد نشده است');
    }

    let response = await makeRequest(token);

    // اگر 401 دریافت کردیم، سعی کنیم token را refresh کنیم
    if (response.status === 401) {
      const { error } = await refreshToken();
      if (!error) {
        // دوباره درخواست را با token جدید بفرستیم
        const newToken = localStorage.getItem('auth_token');
        if (newToken) {
          response = await makeRequest(newToken);
        }
      }
    }

    return response;
  };

  return authenticatedFetch;
};