
import React from 'react';
import { FileText } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-indigo-800">
      <FileText className="h-8 w-8" />
      <span className="font-bold text-2xl tracking-tight">NoteMate</span>
    </div>
  );
};

export default Logo;
