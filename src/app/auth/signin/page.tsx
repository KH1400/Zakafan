
"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const AuthIndex = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  // Redirect if already logged in
  if (user) {
    router.replace(redirectTo);;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password, "string", false);
      
      if (error) {
        toast({
          title: 'خطا در ورود',
          description: error.message === 'Invalid login credentials' 
            ? 'ایمیل یا رمز عبور اشتباه است' 
            : error.message,
          variant: 'error',
        });
      } else {
        toast({
          title: 'ورود موفق',
          description: 'خوش آمدید!',
          variant: 'success'
        });
        router.replace(redirectTo);
      }
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'مشکلی در ورود پیش آمد',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        toast({
          title: 'خطا در ثبت نام',
          description: error.message === 'User already registered' 
            ? 'این ایمیل قبلاً ثبت شده است' 
            : error.message,
          variant: 'error',
        });
      } else {
        toast({
          title: 'ثبت نام موفق',
          description: 'ایمیل تأیید برای شما ارسال شد',
          variant: 'success',
        });
      }
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'مشکلی در ثبت نام پیش آمد',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">ورود به حساب</CardTitle>
          <CardDescription className="text-center">
            برای ادامه وارد حساب خود شوید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              ورود با گوگل
            </Button> */}
            
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  یا
                </span>
              </div>
            </div> */}
          </div>

          <Tabs defaultValue="signin" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">ورود</TabsTrigger>
              <TabsTrigger value="signup">ثبت نام</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">ایمیل</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">رمز عبور</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'در حال ورود...' : 'ورود'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">ایمیل</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">رمز عبور</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'در حال ثبت نام...' : 'ثبت نام'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthIndex;