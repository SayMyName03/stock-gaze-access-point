
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookText,
  Home,
  LogIn,
  Settings,
  Plus,
  Star,
  Tag,
  FileText,
  Search
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
  SidebarSeparator
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  
  // Menu items
  const mainItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "New Note",
      url: "/#new",
      icon: Plus,
    },
    {
      title: "Search Notes",
      url: "/#search",
      icon: Search,
    },
  ];

  const categoriesItems = [
    {
      title: "All Notes",
      url: "/#all",
      icon: FileText,
    },
    {
      title: "Favorites",
      url: "/#favorites",
      icon: Star,
    },
    {
      title: "Tags",
      url: "/#tags",
      icon: Tag,
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

  const isActive = (url: string) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

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
                  <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.url)}>
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
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoriesItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.url)}>
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
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.url)}>
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
            NoteMate AI Note Taking v1.0
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
