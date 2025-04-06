
import React from 'react';
import { FileText } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-indigo-800">
      <FileText className="h-6 w-6" />
      <span className="font-bold text-xl tracking-tight">NoteMate</span>
    </div>
  );
};

export default Logo;
