
import React from 'react';
import { FileText } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-indigo-700">
      <div className="relative">
        <FileText className="h-6 w-6" />
        <div className="absolute -inset-1 rounded-full bg-indigo-100 opacity-30 -z-10"></div>
      </div>
      <span className="font-bold text-xl tracking-tight">NoteMate</span>
    </div>
  );
};

export default Logo;
