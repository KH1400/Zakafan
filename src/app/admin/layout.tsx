"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  ExternalLink,
  Group,
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
  SidebarSeparator,
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
import { useLanguage } from "../../lib/language-context";
import { useAuth } from "../../contexts/AuthContext";

const menuItems = [
    // { href: '/admin', label: 'داشبورد', icon: LayoutDashboard },
    { href: '/admin/dynographs', label: 'داینوگراف', icon: FileText },
    { href: '/admin/categories', label: 'مدیریت دسته', icon: Group },
    // { href: '/admin/users', label: 'کاربران', icon: Users },
    // { href: '/admin/analytics', label: 'آمار و تحلیل', icon: BarChart3 },
    // { href: '/admin/settings', label: 'تنظیمات', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const {language, selectedLang} = useLanguage();
  const {user, signOut} = useAuth();
  return (
    <SidebarProvider dir={'rtl'}>
      <Sidebar dir="rtl" collapsible="icon">
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
                      tooltip={{ children: "مشاهده سایت", side: "right" }}
                  >
                      <Link href="/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink />
                          <span>مشاهده سایت</span>
                      </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator className="my-1" />
              {menuItems.map((item) => {
                  const Icon = item.icon;
                  // The dashboard link is active only on exact match.
                  // Other links are active if the path starts with their href.
                  const isActive = item.href === '/admin' 
                      ? pathname === item.href 
                      : pathname.startsWith(item.href);

                  return (
                      <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton
                              asChild
                              isActive={isActive}
                              tooltip={{ children: item.label, side: "left" }}
                          >
                              <Link href={item.href}>
                                  <Icon />
                                  <span>{item.label}</span>
                              </Link>
                          </SidebarMenuButton>
                      </SidebarMenuItem>
                  );
              })}
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
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <ChevronDown className="mr-auto size-4 group-data-[collapsible=icon]:hidden" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="font-persian w-56">
              <DropdownMenuLabel>حساب کاربری من</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className=" cursor-pointer">پروفایل</DropdownMenuItem>
              <DropdownMenuItem className=" cursor-pointer" onClick={signOut}>خروج</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
