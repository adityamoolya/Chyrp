'use client';
import {
  Home,
  PenSquare,
  Tags,
  LayoutGrid,
  Settings,
  User,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from './ui/separator';

const menuItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/write', label: 'Write', icon: PenSquare },
  { href: '/dashboard/tags', label: 'Tags', icon: Tags },
  { href: '/dashboard/categories', label: 'Categories', icon: LayoutGrid },
];

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                as={Link}
                href={item.href}
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="gap-4">
        <Separator />
         <div className="flex items-center gap-3 px-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://picsum.photos/id/1027/100/100" alt="User avatar" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium text-sidebar-foreground">Alice</span>
                <span className="text-xs text-sidebar-foreground/70">Admin</span>
            </div>
         </div>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
