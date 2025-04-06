
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PdfUploader from '@/components/PdfUploader';
import PdfChat from '@/components/PdfChat';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';

const Index = () => {
  const [pdfContent, setPdfContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const handlePdfUpload = (content: string, name: string) => {
    setPdfContent(content);
    setFileName(name);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-gradient-to-br from-indigo-50 to-gray-100">
          <div className="relative p-4 md:p-6">
            <div className="absolute top-4 left-4">
              <SidebarTrigger />
            </div>
            
            <div className="w-full max-w-5xl mx-auto mt-12">
              <Card className="border-gray-200 shadow-lg mb-6">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center text-indigo-800">
                    NoteMate PDF Analyzer
                  </CardTitle>
                  <CardDescription className="text-center text-gray-500">
                    Upload a PDF to analyze and chat with its contents using AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!pdfContent ? (
                    <div className="space-y-4">
                      <PdfUploader onPdfUpload={handlePdfUpload} />
                      <div className="text-center mt-4">
                        <div className="text-sm text-gray-500">
                          Already have an account? 
                          <Button variant="link" asChild className="px-2">
                            <Link to="/login">Sign in</Link>
                          </Button>
                          to access your saved documents
                        </div>
                      </div>
                    </div>
                  ) : (
                    <PdfChat pdfContent={pdfContent} fileName={fileName} />
                  )}
                </CardContent>
                <CardFooter className="flex flex-col text-center text-xs text-gray-500 border-t pt-4">
                  <p>Powered by Gemini AI and secure PDF processing</p>
                  <p>© 2025 NoteMate. All rights reserved.</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
