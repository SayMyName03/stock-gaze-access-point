
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from '@/components/LoginForm';
import StockChartPattern from '@/components/StockChartPattern';
import FloatingElements from '@/components/FloatingElements';
import Logo from '@/components/Logo';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-finance-light to-gray-100 flex items-center justify-center p-4 md:p-6">
      {/* Background decorations */}
      <StockChartPattern />
      <FloatingElements />
      
      <div className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        {/* Login Card */}
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-finance-blue">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-col text-center text-xs text-gray-500 border-t pt-4">
            <p>Secure login protected by 256-bit encryption</p>
            <p>© 2025 StockSage. All rights reserved.</p>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? <a href="#" className="text-finance-green hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
