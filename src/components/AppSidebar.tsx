import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  BookText,
  Home,
  LogIn,
  Settings,
  Plus,
  Star,
  Tag,
  FileText,
  Search,
  UploadCloud,
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
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const [uploading, setUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Retrieve the API key from the environment variable
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

      const response = await axios.post('https://api.gemini.com/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${apiKey}`, // Use the API key from .env
        },
      });

      setAnalysisResult(response.data);
      console.log('Analysis Result:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

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
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Upload Document">
                  <label className="cursor-pointer transition-colors">
                    <UploadCloud className="text-gray-600" />
                    <span>Upload Document</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
          {uploading && <div className="text-xs text-blue-500">Uploading...</div>}
          {analysisResult && (
            <div className="text-xs text-green-500">
              Analysis Complete: {JSON.stringify(analysisResult)}
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
