
import React, { useState } from 'react';
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
  Search,
  UploadCloud,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
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
import { analyzeDocument } from '@/services/geminiService';

export function AppSidebar() {
  const location = useLocation();
  const [uploading, setUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    toast({
      title: "Processing document",
      description: "Please wait while we analyze your document...",
    });

    try {
      // Read the file as text
      const text = await readFileAsText(file);
      
      // Send to Gemini API for analysis
      const analysis = await analyzeDocument(text);
      
      setAnalysisResult(analysis);
      toast({
        title: "Analysis complete",
        description: "Your document has been analyzed successfully",
      });
    } catch (error) {
      console.error('Error processing document:', error);
      toast({
        title: "Error processing document",
        description: "There was a problem analyzing your document",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Function to read file content as text
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
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
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploading}
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
          {uploading && <div className="text-xs text-blue-500">Analyzing document...</div>}
          {analysisResult && (
            <div className="text-xs text-green-500 max-h-20 overflow-y-auto">
              Analysis complete. {analysisResult.substring(0, 100)}...
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
