
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import FloatingElements from '@/components/FloatingElements';

const Login = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <FloatingElements />
      
      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <Card className="border-gray-200 shadow-sm backdrop-blur-sm bg-white/95">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-indigo-700">
              Sign in to NoteMate
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter your credentials to access your notes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-col text-center text-xs text-gray-500 border-t pt-4">
            <p>Powered by AI-assisted note taking</p>
            <p>© 2025 NoteMate. All rights reserved.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
