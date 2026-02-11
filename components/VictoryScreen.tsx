
import React, { useEffect, useState } from 'react';
import { LootItem } from '../types';
import { Button } from './UI';

interface VictoryScreenProps {
  loot: LootItem | null;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ loot }) => {
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#010a13] flex flex-col items-center justify-center p-4 overflow-hidden animate-fadeIn">
      {/* Background Glory Shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[50%] bg-blue-500/5 rotate-12 blur-[100px]"></div>

      {/* Main Banner */}
      <div className="relative z-10 flex flex-col items-center mb-12 animate-slideIn">
         <div className="relative">
            <h1 className="text-8xl sm:text-9xl font-lol italic text-[#c89b3c] tracking-[0.2em] drop-shadow-[0_0_30px_rgba(200,155,60,0.8)]">
              VICTORY
            </h1>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-[#c89b3c] shadow-[0_0_15px_#c89b3c]"></div>
         </div>
         <p className="mt-8 text-xl text-blue-300 font-bold tracking-[0.5em] uppercase animate-pulse">Protocol Completed</p>
      </div>

      {/* Stats and Loot */}
      {showStats && (
        <div className="flex flex-col items-center gap-8 z-20 animate-fadeIn">
           <div className="flex gap-8 sm:gap-16">
              <div className="flex flex-col items-center">
                 <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Performance Rank</div>
                 <div className="text-7xl font-lol text-[#c89b3c] drop-shadow-[0_0_20px_rgba(200,155,60,0.6)]">S+</div>
              </div>
              <div className="h-20 w-[1px] bg-white/10 self-center"></div>
              <div className="flex flex-col items-start justify-center">
                 <div className="text-xs text-blue-400 font-bold uppercase mb-1">Match Stats</div>
                 <div className="text-2xl text-white font-lol">100 / 0 / 50 <span className="text-sm text-gray-500 ml-2">KDA</span></div>
                 <div className="text-xs text-gray-500 uppercase mt-1">Role: Best Boyfriend</div>
              </div>
           </div>

           <div className="w-full max-w-md p-6 bg-gradient-to-b from-[#091428] to-black border border-[#c89b3c]/50 rounded shadow-2xl flex flex-col items-center">
              <div className="text-[10px] text-[#c89b3c] font-bold uppercase tracking-[0.3em] mb-4">Loot Redeemed</div>
              <h3 className="text-xl text-white font-lol text-center mb-2 uppercase tracking-wide">{loot?.name}</h3>
              <p className="text-sm text-gray-400 text-center italic">"{loot?.description}"</p>
           </div>

           <div className="mt-4 flex flex-col items-center gap-4">
              <p className="text-[#c89b3c] font-bold text-center tracking-[0.2em] uppercase">HAPPY BIRTHDAY, SUMMONER! <br/> GG WP!</p>
              <Button onClick={() => window.location.reload()} variant="secondary" className="scale-75 opacity-50">
                PLAY AGAIN
              </Button>
           </div>
        </div>
      )}

      {/* Particle Effect Sim (Floating Embers) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-[#c89b3c] rounded-full blur-[1px] animate-float"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + 10 + '%',
              animationDuration: Math.random() * 4 + 2 + 's',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.7 + 0.3
            }}
          ></div>
        ))}
      </div>
      
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-400px) scale(0); opacity: 0; }
        }
        .animate-slideIn { animation: slideIn 1.5s ease-out forwards; }
        .animate-float { animation: float linear infinite; }
      `}</style>
    </div>
  );
};

export default VictoryScreen;
