
"use client"

import * as React from "react";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sampleUsers = [
  {
    name: "علی رضایی",
    email: "ali.rezaei@example.com",
    role: "مدیر کل",
    status: "فعال",
    lastActive: "۳ ساعت پیش",
    avatar: "AR",
  },
  {
    name: "مریم احمدی",
    email: "maryam.ahmadi@example.com",
    role: "نویسنده",
    status: "فعال",
    lastActive: "دیروز",
    avatar: "MA",
  },
  {
    name: "حسین محمدی",
    email: "hossein.mohammadi@example.com",
    role: "ویرایشگر",
    status: "غیرفعال",
    lastActive: "۱ هفته پیش",
    avatar: "HM",
  },
  {
    name: "سارا کریمی",
    email: "sara.karimi@example.com",
    role: "نویسنده",
    status: "فعال",
    lastActive: "۲ ساعت پیش",
    avatar: "SK",
  },
  {
    name: "رضا قاسمی",
    email: "reza.ghasemi@example.com",
    role: "مشترک",
    status: "فعال",
    lastActive: "۵ دقیقه پیش",
    avatar: "RQ",
  },
];

export default function UsersPage() {
  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 bg-muted/40 font-persian" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle>مدیریت کاربران</CardTitle>
          <CardDescription>
            کاربران سایت را مشاهده، اضافه یا مدیریت کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="جستجوی کاربر..." className="pr-8" />
            </div>
            <Button className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                افزودن کاربر
              </span>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>کاربر</TableHead>
                <TableHead>نقش</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>آخرین فعالیت</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleUsers.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://placehold.co/40x40.png?text=${user.avatar}`} data-ai-hint="user avatar" />
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "فعال" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                        <DropdownMenuItem>ویرایش</DropdownMenuItem>
                        <DropdownMenuItem>تغییر نقش</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
