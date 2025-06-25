
"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 bg-muted/40 font-persian" dir="rtl">
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">عمومی</TabsTrigger>
          <TabsTrigger value="appearance">ظاهر</TabsTrigger>
          <TabsTrigger value="access">دسترسی</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات عمومی</CardTitle>
              <CardDescription>
                تنظیمات اصلی و کلی سایت را در اینجا مدیریت کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">نام سایت</Label>
                <Input id="site-name" defaultValue="War Dynograph" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">تگ‌لاین سایت</Label>
                <Input id="tagline" defaultValue="The Dynographic Reference for the Iran-Israel War" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>ذخیره تغییرات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
            <Card>
                <CardHeader>
                    <CardTitle>ظاهر سایت</CardTitle>
                    <CardDescription>
                        پوسته‌ها، بنرها و سایر عناصر بصری سایت را سفارشی‌سازی کنید.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>پوسته (Theme)</Label>
                        <RadioGroup defaultValue="dark" className="flex gap-4">
                            <Label className="flex items-center gap-2 cursor-pointer">
                                <RadioGroupItem value="dark" />
                                تاریک
                            </Label>
                             <Label className="flex items-center gap-2 cursor-pointer">
                                <RadioGroupItem value="light" />
                                روشن
                            </Label>
                        </RadioGroup>
                    </div>
                    <div className="space-y-4">
                        <Label>بنرهای صفحه اصلی</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                                <Image src="https://i.postimg.cc/bw1xjb39/Gemini-Generated-Image-b3uzh6b3uzh6b3uz.png" width={200} height={120} alt="Banner 1" className="rounded-md object-cover aspect-video" data-ai-hint="holographic missile" />
                                <span className="text-sm font-medium">قدرت نظامی</span>
                                <Button variant="outline" size="sm">تغییر تصویر</Button>
                            </div>
                             <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                                <Image src="https://i.postimg.cc/sfBdTRXx/Gemini-Generated-Image-l1uliil1uliil1ul.png" width={200} height={120} alt="Banner 2" className="rounded-md object-cover aspect-video" data-ai-hint="holographic chart" />
                                <span className="text-sm font-medium">آمار جنگ</span>
                                <Button variant="outline" size="sm">تغییر تصویر</Button>
                            </div>
                             <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                                <Image src="https://i.postimg.cc/9f1bdv2B/Gemini-Generated-Image-a1tcj2a1tcj2a1tc.png" width={200} height={120} alt="Banner 3" className="rounded-md object-cover aspect-video" data-ai-hint="missile silo" />
                                <span className="text-sm font-medium">دستاوردها</span>
                                <Button variant="outline" size="sm">تغییر تصویر</Button>
                            </div>
                             <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                                <Image src="https://i.postimg.cc/XqBg0qC2/Gemini-Generated-Image-qlk5zkqlk5zkqlk5.png" width={200} height={120} alt="Banner 4" className="rounded-md object-cover aspect-video" data-ai-hint="question mark neon" />
                                <span className="text-sm font-medium">پاسخ به شبهات</span>
                                <Button variant="outline" size="sm">تغییر تصویر</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button>ذخیره تغییرات</Button>
                </CardFooter>
            </Card>
        </TabsContent>
         <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>کنترل دسترسی</CardTitle>
              <CardDescription>
                مدیریت نحوه‌ی ثبت‌نام و دسترسی کاربران به سایت.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="allow-registration" className="font-medium">فعال‌سازی ثبت‌نام عمومی</Label>
                  <p className="text-xs text-muted-foreground">به کاربران اجازه می‌دهد تا خودشان در سایت ثبت‌نام کنند.</p>
                </div>
                <Switch id="allow-registration" defaultChecked />
              </div>
               <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="require-approval" className="font-medium">نیاز به تایید مدیر</Label>
                  <p className="text-xs text-muted-foreground">کاربران جدید برای فعال شدن حساب، نیاز به تایید مدیر دارند.</p>
                </div>
                <Switch id="require-approval" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>ذخیره تغییرات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
