
import React from 'react';

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[15%] right-[25%] w-16 h-16 bg-indigo-300 opacity-10 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[45%] left-[15%] w-24 h-24 bg-indigo-400 opacity-10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[20%] right-[10%] w-12 h-12 bg-indigo-500 opacity-10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[25%] left-[25%] w-10 h-10 bg-indigo-600 opacity-10 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-[30%] left-[30%] w-16 h-16 bg-indigo-700 opacity-10 rounded-full animate-float" style={{ animationDelay: '4s' }} />
    </div>
  );
};

export default FloatingElements;
