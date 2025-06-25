
"use client";

import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const audienceData = [
  { date: "۱ تیر", users: 23, sessions: 45 },
  { date: "۲ تیر", users: 28, sessions: 52 },
  { date: "۳ تیر", users: 25, sessions: 48 },
  { date: "۴ تیر", users: 35, sessions: 65 },
  { date: "۵ تیر", users: 45, sessions: 82 },
  { date: "۶ تیر", users: 42, sessions: 78 },
  { date: "۷ تیر", users: 55, sessions: 95 },
];

const countryData = [
  { name: "ایران", value: 400 },
  { name: "عراق", value: 300 },
  { name: "آلمان", value: 200 },
  { name: "آمریکا", value: 150 },
  { name: "افغانستان", value: 100 },
];

const trafficSourceData = [
  { name: "مستقیم", value: 45, fill: "hsl(var(--primary))" },
  { name: "گوگل", value: 35, fill: "hsl(var(--chart-2))" },
  { name: "شبکه‌های اجتماعی", value: 15, fill: "hsl(var(--chart-3))" },
  { name: "سایر", value: 5, fill: "hsl(var(--muted-foreground))" },
];

const popularPagesData = [
    { page: "/services/missile-program", views: "۲,۴۵۰", unique: "۱,۸۰۰", avgTime: "۰۴:۱۲" },
    { page: "/achievements/liberation-of-khorramshahr", views: "۱,۸۹۰", unique: "۱,۲۰۰", avgTime: "۰۳:۳۰" },
    { page: "/projects/timeline", views: "۱,۲۰۰", unique: "۹۵۰", avgTime: "۰۵:۴۵" },
    { page: "/contact/faqs", views: "۹۸۰", unique: "۸۰۰", avgTime: "۰۲:۱۰" },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 bg-muted/40 font-persian" dir="rtl">
       <Tabs defaultValue="audience">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="audience">مخاطبان</TabsTrigger>
          <TabsTrigger value="traffic">منابع ترافیک</TabsTrigger>
          <TabsTrigger value="content">محتوا</TabsTrigger>
        </TabsList>
        <TabsContent value="audience" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>فعالیت کاربران</CardTitle>
                <CardDescription>نمودار کاربران و بازدیدها در ۷ روز گذشته.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={audienceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip contentStyle={{ fontFamily: 'inherit', direction: 'rtl' }} />
                    <Legend />
                    <Line type="monotone" dataKey="users" name="کاربران" stroke="hsl(var(--primary))" />
                    <Line type="monotone" dataKey="sessions" name="بازدیدها" stroke="hsl(var(--chart-2))" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>بازدید بر اساس کشور</CardTitle>
                <CardDescription>۵ کشور برتر بازدید کننده.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                   <BarChart data={countryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip contentStyle={{ fontFamily: 'inherit', direction: 'rtl' }} />
                      <Bar dataKey="value" name="تعداد بازدید" fill="hsl(var(--primary))" />
                   </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="traffic" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>منابع ترافیک</CardTitle>
                <CardDescription>نمودار توزیع منابع ورودی کاربران.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={trafficSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label />
                        <Tooltip contentStyle={{ fontFamily: 'inherit', direction: 'rtl' }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
             <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>صفحات پربازدید</CardTitle>
                <CardDescription>محبوب‌ترین صفحات سایت بر اساس بازدید.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>صفحه</TableHead>
                            <TableHead>تعداد بازدید</TableHead>
                            <TableHead>بازدید یکتا</TableHead>
                            <TableHead>میانگین زمان</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {popularPagesData.map((item) => (
                           <TableRow key={item.page}>
                               <TableCell className="font-medium text-left" dir="ltr">{item.page}</TableCell>
                               <TableCell>{item.views}</TableCell>
                               <TableCell>{item.unique}</TableCell>
                               <TableCell>{item.avgTime}</TableCell>
                           </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
         <TabsContent value="content" className="mt-4">
          <Card>
              <CardHeader>
                <CardTitle>تحلیل محتوا</CardTitle>
                <CardDescription>آمار مربوط به عملکرد محتواهای مختلف سایت.</CardDescription>
              </CardHeader>
              <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>صفحه</TableHead>
                            <TableHead>تعداد بازدید</TableHead>
                            <TableHead>بازدید یکتا</TableHead>
                            <TableHead>میانگین زمان</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {popularPagesData.map((item) => (
                           <TableRow key={item.page}>
                               <TableCell className="font-medium text-left" dir="ltr">{item.page}</TableCell>
                               <TableCell>{item.views}</TableCell>
                               <TableCell>{item.unique}</TableCell>
                               <TableCell>{item.avgTime}</TableCell>
                           </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
