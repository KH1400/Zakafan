
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Users, Download, FileText, Calendar as CalendarIcon } from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";

const chartData = [
  { month: "فروردین", thisMonth: 186, lastMonth: 80 },
  { month: "اردیبهشت", thisMonth: 305, lastMonth: 200 },
  { month: "خرداد", thisMonth: 237, lastMonth: 120 },
  { month: "تیر", thisMonth: 73, lastMonth: 190 },
  { month: "مرداد", thisMonth: 209, lastMonth: 130 },
  { month: "شهریور", thisMonth: 214, lastMonth: 140 },
];

const chartConfig = {
  thisMonth: {
    label: "این ماه",
    color: "hsl(var(--primary))",
  },
  lastMonth: {
    label: "ماه گذشته",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

const recentActivities = [
    { user: "علی رضایی", avatar: "AR", activity: "یک ویدیو جدید بارگذاری کرد", date: "۲ ساعت پیش" },
    { user: "مریم احمدی", avatar: "MA", activity: "محتوای 'برنامه موشکی' را ویرایش کرد", date: "۵ ساعت پیش" },
    { user: "حسین محمدی", avatar: "HM", activity: "یک تصویر جدید به گالری اضافه کرد", date: "دیروز" },
    { user: "سارا کریمی", avatar: "SK", activity: "یک مقاله HTML جدید منتشر کرد", date: "۲ روز پیش" },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 bg-muted/40 font-persian" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">داشبورد</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="ml-2 h-4 w-4" />
              <span>محدوده زمانی</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مجموع بازدیدها</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۱۲,۳۴۵</div>
            <p className="text-xs text-muted-foreground">+۲۰.۱٪ نسبت به ماه گذشته</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کاربران آنلاین</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۷۳</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مجموع دانلودها</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۴,۵۶۷</div>
            <p className="text-xs text-muted-foreground">+۱۲.۵٪ نسبت به ماه گذشته</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">محتوای جدید</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+۵</div>
            <p className="text-xs text-muted-foreground">در این هفته</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>تحلیل بازدیدکنندگان</CardTitle>
            <CardDescription>نمودار بازدیدکنندگان در ۶ ماه اخیر.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  dataKey="thisMonth"
                  type="monotone"
                  stroke="var(--color-thisMonth)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="lastMonth"
                  type="monotone"
                  stroke="var(--color-lastMonth)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>فعالیت‌های اخیر</CardTitle>
            <CardDescription>آخرین کارهایی که توسط مدیران انجام شده است.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>کاربر</TableHead>
                  <TableHead>فعالیت</TableHead>
                  <TableHead>تاریخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                    <TableRow key={index}>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://placehold.co/40x40.png?text=${activity.avatar}`} data-ai-hint="user avatar" />
                                <AvatarFallback>{activity.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{activity.user}</span>
                        </div>
                    </TableCell>
                    <TableCell>{activity.activity}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{activity.date}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
