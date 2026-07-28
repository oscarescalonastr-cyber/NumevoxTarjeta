import React from 'react';
import { CardData } from '../types';

interface HeroSectionProps {
  data: CardData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <section className="w-full relative flex flex-col items-center pt-12 pb-8 px-5 bg-gradient-to-b from-black to-[#131313] rounded-b-3xl mb-12 animate-fade-in-up delay-100">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none rounded-b-3xl"></div>
      
      {/* Brand Logo */}
      <div className="relative z-10 w-32 h-32 rounded-[0.75rem] border border-[#4c4546] shadow-2xl overflow-hidden mb-6 bg-black flex items-center justify-center animate-pop-in delay-200 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer">
        <img
          src={data.logoUrl}
          alt={data.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Typography */}
      <div className="relative z-10 text-center space-y-2">
        <h2 className="text-3xl font-semibold text-white tracking-tight">
          {data.title}
        </h2>
        <p className="text-base text-[#c6c6c7]">
          {data.subtitle}
        </p>
        
        {/* Pink Accent Line */}
        <div className="w-8 h-[1px] bg-[#E11D48] mx-auto my-3"></div>
        
        <p className="text-sm text-[#cfc4c5] max-w-[280px] mx-auto">
          {data.description}
        </p>
      </div>
    </section>
  );
};

