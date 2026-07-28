import React from 'react';

interface HeaderBarProps {
  logoUrl: string;
  title: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ logoUrl, title }) => {
  return (
    <header className="bg-gradient-to-b from-black to-[#131313] top-0 flex flex-col items-center pt-8 pb-4 w-full hidden md:flex z-40 relative animate-fade-in-up">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-[0.75rem] overflow-hidden border-2 border-[#353535] hover:border-[#E11D48] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md">
          <img alt={title} className="w-full h-full object-cover" src={logoUrl} />
        </div>
        <h1 className="font-semibold text-2xl text-white tracking-tight">{title}</h1>
      </div>
    </header>
  );
};


