
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import { FileText } from 'lucide-react';

const Login = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] -left-12 w-64 h-64 bg-indigo-100 rounded-full opacity-70 filter blur-xl"></div>
        <div className="absolute bottom-[30%] right-[10%] w-48 h-48 bg-blue-100 rounded-full opacity-70 filter blur-xl"></div>
        <div className="absolute top-[40%] right-[20%] w-36 h-36 bg-purple-100 rounded-full opacity-70 filter blur-xl"></div>
      </div>
      
      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-indigo-800">
              Sign in to NoteMate
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
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

export default Login;
