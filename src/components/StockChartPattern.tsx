
import React from 'react';

const StockChartPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
      <div className="absolute left-0 right-0 h-px bg-finance-blue/20" style={{ top: '15%' }} />
      <div className="absolute left-0 right-0 h-px bg-finance-blue/20" style={{ top: '35%' }} />
      <div className="absolute left-0 right-0 h-px bg-finance-blue/20" style={{ top: '55%' }} />
      <div className="absolute left-0 right-0 h-px bg-finance-blue/20" style={{ top: '75%' }} />
      <div className="absolute left-0 right-0 h-px bg-finance-blue/20" style={{ top: '95%' }} />
      
      <svg 
        className="absolute top-1/4 left-0 right-0 w-full h-64 opacity-10"
        viewBox="0 0 1000 200" 
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C150,20 350,180 500,100 C650,20 850,180 1000,100"
          stroke="#10B981"
          strokeWidth="3"
          fill="none"
        />
      </svg>
      
      <svg 
        className="absolute top-2/4 left-0 right-0 w-full h-64 opacity-10"
        viewBox="0 0 1000 200" 
        preserveAspectRatio="none"
      >
        <path
          d="M0,150 C120,80 250,180 370,100 C500,20 650,120 800,80 C900,50 950,120 1000,100"
          stroke="#0F172A"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default StockChartPattern;
