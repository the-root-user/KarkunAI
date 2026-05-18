import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MockMap({ className, isConfirmed = false }: { className?: string, isConfirmed?: boolean }) {
  return (
    <div className={cn("relative bg-accent-foreground/5 overflow-hidden rounded-xl border border-accent-foreground/10", isConfirmed && "border-primary/30", className)}>
      {/* Visual background simulation */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'radial-gradient(#888 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px), linear-gradient(#ccc 1px, transparent 1px)',
        backgroundSize: '40px 40px, 20px 20px, 20px 20px'
      }} />

      {/* Roads */}
      <div className="absolute top-1/2 left-0 w-full h-[30px] bg-background opacity-80 -translate-y-1/2 rotate-12" />
      <div className="absolute top-0 left-1/3 w-[30px] h-full bg-background opacity-80 rotate-[-5deg]" />

      {/* Markers */}
      <div className={cn("absolute top-1/3 left-1/2 translate-x-4", isConfirmed ? "-mt-1" : "animate-bounce")}>
        <MapPin className={cn("w-5 h-5", isConfirmed ? "text-primary fill-primary" : "text-rose-500 fill-rose-500")} />
        {isConfirmed &&
          <div className="-ml-2 mt-0.5 bg-primary/80 px-1.5 py-0.25 rounded-lg text-[9px] font-semibold text-primary-foreground">
            Booked
          </div>
        }
      </div>
      <div className="absolute top-2/3 left-1/4">
        <MapPin className="w-4 h-4 text-[#00a884] fill-[#00a884]" />
      </div>

      <div className="absolute bottom-2 right-2 border border-border/40 bg-transparent backdrop-blur-sm px-1.5 py-0.5 rounded-lg text-[10px] font-bold text-muted-foreground">
        LIVE TRACKING (MOCK)
      </div>
    </div>
  );
}
