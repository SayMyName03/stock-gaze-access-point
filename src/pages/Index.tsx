
import React from 'react';
import { Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';
import NoteDashboard from '@/components/NoteDashboard';
import FloatingElements from '@/components/FloatingElements';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-gradient-to-br from-indigo-50 to-gray-100">
          <div className="relative p-4 md:p-6">
            <div className="absolute top-4 left-4">
              <SidebarTrigger />
            </div>
            
            <FloatingElements />
            
            <div className="w-full z-10 relative pt-10">
              <NoteDashboard />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
