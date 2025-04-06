
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Home,
  LogIn,
  Settings,
  Upload,
  Star,
  History
} from 'lucide-react';
import Logo from './Logo';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  // Menu items
  const mainItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Upload PDF",
      url: "/#upload",
      icon: Upload,
    },
    {
      title: "Recent PDFs",
      url: "/#recent",
      icon: History,
    },
    {
      title: "Saved Notes",
      url: "/#saved",
      icon: Star,
    },
  ];

  const accountItems = [
    {
      title: "Login",
      url: "/login",
      icon: LogIn,
    },
    {
      title: "Settings",
      url: "/#settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-3">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url} className="transition-colors">
                      <item.icon className="text-gray-600" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url} className="transition-colors">
                      <item.icon className="text-gray-600" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="px-3 py-2">
          <div className="text-xs text-gray-500">
            NoteMate PDF Analyzer v1.0
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
