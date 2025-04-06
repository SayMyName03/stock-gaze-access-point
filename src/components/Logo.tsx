
import React from 'react';
import { TrendingUp } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-finance-blue">
      <TrendingUp className="h-8 w-8" />
      <span className="font-bold text-2xl tracking-tight">StockSage</span>
    </div>
  );
};

export default Logo;
