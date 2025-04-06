
import React from 'react';

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[15%] right-[25%] w-24 h-24 bg-finance-green opacity-5 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[45%] left-[15%] w-32 h-32 bg-finance-blue opacity-5 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[20%] right-[10%] w-20 h-20 bg-finance-green opacity-5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[25%] left-[25%] w-16 h-16 bg-finance-blue opacity-5 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-[30%] left-[30%] w-24 h-24 bg-finance-green opacity-5 rounded-full animate-float" style={{ animationDelay: '4s' }} />
    </div>
  );
};

export default FloatingElements;
