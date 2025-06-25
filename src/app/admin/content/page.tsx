
"use client";

import * as React from "react";
import {
  File,
  PlusCircle,
  Search,
  Image as ImageIcon,
  Video,
  ListFilter,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const sampleContent = [
    { id: "CNT-001", title: "تحلیل برنامه موشکی ایران", type: "مقاله (HTML)", status: "منتشر شده", date: "۱۴۰۳/۰۴/۰۱" },
    { id: "CNT-002", title: "گالری تصاویر رزمایش ذوالفقار", type: "تصویر", status: "پیش‌نویس", date: "۱۴۰۳/۰۴/۰۵" },
    { id: "CNT-003", title: "مستند عملیات فتح‌المبین", type: "ویدیو", status: "منتشر شده", date: "۱۴۰۳/۰۳/۱۵" },
    { id: "CNT-004", title: "اینفوگرافیک توان پهپادی", type: "تصویر", status: "منتشر شده", date: "۱۴۰۳/۰۴/۱۰" },
    { id: "CNT-005", title: "بررسی نبردهای کلیدی", type: "مقاله (HTML)", status: "بازبینی", date: "۱۴۰۳/۰۴/۱۲" },
    { id: "CNT-006", title: "مصاحبه با کارشناس نظامی", type: "ویدیو", status: "منتشر شده", date: "۱403/02/20" },
];

export default function ContentPage() {
  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 bg-muted/40 font-persian" dir="rtl">
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">همه</TabsTrigger>
                    <TabsTrigger value="article">مقالات</TabsTrigger>
                    <TabsTrigger value="image">تصاویر</TabsTrigger>
                    <TabsTrigger value="video">ویدیوها</TabsTrigger>
                </TabsList>
                <div className="mr-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    فیلتر
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>فیلتر بر اساس وضعیت</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                منتشر شده
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>پیش‌نویس</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                بازبینی
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            خروجی
                        </span>
                    </Button>
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            افزودن محتوا
                        </span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <Card>
                    <CardHeader>
                        <CardTitle>مدیریت محتوا</CardTitle>
                        <CardDescription>
                            محتوای سایت را در اینجا مدیریت، ویرایش یا حذف کنید.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Icon</span>
                                    </TableHead>
                                    <TableHead>عنوان</TableHead>
                                    <TableHead>نوع</TableHead>
                                    <TableHead>وضعیت</TableHead>
                                    <TableHead>تاریخ ویرایش</TableHead>
                                    <TableHead>
                                        <span className="sr-only">عملیات</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sampleContent.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="hidden sm:table-cell">
                                            {item.type === 'مقاله (HTML)' && <File className="w-6 h-6 text-muted-foreground" />}
                                            {item.type === 'تصویر' && <ImageIcon className="w-6 h-6 text-muted-foreground" />}
                                            {item.type === 'ویدیو' && <Video className="w-6 h-6 text-muted-foreground" />}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {item.title}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{item.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={item.status === 'منتشر شده' ? 'default' : 'secondary'}>
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                                                    <DropdownMenuItem>ویرایش</DropdownMenuItem>
                                                    <DropdownMenuItem>حذف</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            نمایش <strong>۱-۶</strong> از <strong>۳۲</strong> محتوا
                        </div>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
