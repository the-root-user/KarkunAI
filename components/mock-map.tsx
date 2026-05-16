import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MockMap({ className, isConfirmed = false }: { className?: string, isConfirmed?: boolean }) {
  return (
    <div className={`relative bg-stone-200 overflow-hidden rounded-xl border border-stone-300 ${className}`}>
      {/* Visual background simulation */}
      <div className="absolute inset-0 opacity-40" style={{ 
        backgroundImage: 'radial-gradient(#888 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px), linear-gradient(#ccc 1px, transparent 1px)',
        backgroundSize: '40px 40px, 20px 20px, 20px 20px'
      }} />
      
      {/* Roads */}
      <div className="absolute top-1/2 left-0 w-full h-[30px] bg-white opacity-60 -translate-y-1/2 rotate-12" />
      <div className="absolute top-0 left-1/3 w-[30px] h-full bg-white opacity-60 rotate-[-5deg]" />

      {/* Markers */}
      <div className={cn("absolute top-1/3 left-1/2 translate-x-4", !isConfirmed && "animate-bounce")}>
        <MapPin className="w-5 h-5 text-red-500 fill-red-500" />
        {isConfirmed &&
          <div className="bg-red-500/80 px-1.5 py-0.5 rounded-lg text-[9px] font-semibold text-red-100">
            Booked
          </div>
        }
      </div>
      <div className="absolute top-2/3 left-1/4">
        <MapPin className="w-4 h-4 text-[#00a884] fill-[#00a884]" />
      </div>

      <div className="absolute bottom-2 right-2 bg-white/80 px-1.5 py-0.5 rounded-lg text-[10px] font-bold text-stone-500">
        LIVE TRACKING (MOCK)
      </div>
    </div>
  );
}
