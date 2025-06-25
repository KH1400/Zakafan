
import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div dir="rtl">
        <Sidebar side="right" collapsible="icon">
          <SidebarHeader>
            <h2 className="text-xl font-semibold p-2 group-data-[collapsible=icon]:hidden">
              پنل مدیریت
            </h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive
                  tooltip={{ children: "داشبورد", side: "left" }}
                >
                  <Link href="/admin">
                    <LayoutDashboard />
                    <span>داشبورد</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: "محتوا", side: "left" }}
                >
                  <Link href="/admin/content">
                    <FileText />
                    <span>مدیریت محتوا</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: "کاربران", side: "left" }}
                >
                  <Link href="/admin/users">
                    <Users />
                    <span>کاربران</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: "آمار", side: "left" }}
                >
                  <Link href="/admin/analytics">
                    <BarChart3 />
                    <span>آمار و تحلیل</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: "تنظیمات", side: "left" }}
                >
                  <Link href="/admin/settings">
                    <Settings />
                    <span>تنظیمات</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 p-2 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center"
                >
                  <Avatar className="size-6">
                    <AvatarImage
                      src="https://placehold.co/40x40.png"
                      alt="Admin User"
                      data-ai-hint="user avatar"
                    />
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-medium">کاربر ادمین</span>
                  </div>
                  <ChevronDown className="mr-auto size-4 group-data-[collapsible=icon]:hidden" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel>حساب کاربری من</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>پروفایل</DropdownMenuItem>
                <DropdownMenuItem>خروج</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
