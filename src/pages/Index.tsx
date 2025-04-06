
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from '@/components/Logo';
import PdfUploader from '@/components/PdfUploader';
import PdfChat from '@/components/PdfChat';

const Index = () => {
  const [pdfContent, setPdfContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const handlePdfUpload = (content: string, name: string) => {
    setPdfContent(content);
    setFileName(name);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex flex-col items-center p-4 md:p-6">
      {/* Header with logo */}
      <div className="w-full max-w-5xl z-10">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
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
              <PdfUploader onPdfUpload={handlePdfUpload} />
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
  );
};

export default Index;
