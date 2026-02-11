
import React, { useState } from 'react';
import { LootItem } from '../types';
import { Button } from './UI';

const LOOT_POOL: LootItem[] = [
  { 
    id: 'm1', 
    name: "Vanguard's Restoration Shard", 
    type: 'Shard', 
    rarity: 'Epic', 
    description: 'One Full-Body Massage Session (Valid for 1 Year)',
    image: '/prize-massage.jpg' 
  },
  { 
    id: 'h1', 
    name: "Honeyfruit Feast Voucher", 
    type: 'Shard', 
    rarity: 'Epic', 
    description: 'Any takeout dinner of your choice - Summoner’s Pick',
    image: '/prize-dinner.jpg'
  },
  { 
    id: 'p1', 
    name: "Passive Aura: Cleanse", 
    type: 'Shard', 
    rarity: 'Legendary', 
    description: 'One "Get Out of Chores" Card (Stackable x3)',
    image: '/prize-chores.jpg'
  },
];

const GRAND_PRIZE: LootItem = {
  id: 'gp',
  name: "Ultimate Skin Permanent: RIOT POINTS CACHE",
  type: 'Permanent',
  rarity: 'Ultimate',
  description: '1,380 RP (or equivalent cash!)',
  image: '/bigprize.jpg'
};

interface HextechChestProps {
  hasKey: boolean;
  onClaim: (loot: LootItem) => void;
}

const HextechChest: React.FC<HextechChestProps> = ({ hasKey, onClaim }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [rerollsUsed, setRerollsUsed] = useState(0);
  const [currentLoot, setCurrentLoot] = useState<LootItem | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const openChest = () => {
    if (!hasKey || isOpened) return;
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setIsOpened(true);
      setCurrentLoot(LOOT_POOL[0]);
    }, 1500);
  };

  const handleReroll = () => {
    if (rerollsUsed >= 2) return;
    setIsShaking(true);
    const nextReroll = rerollsUsed + 1;
    setRerollsUsed(nextReroll);
    
    setTimeout(() => {
      setIsShaking(false);
      if (nextReroll === 2) {
        setCurrentLoot(GRAND_PRIZE);
      } else {
        setCurrentLoot(LOOT_POOL[nextReroll]);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full animate-fadeIn min-h-[500px]">
      {!isOpened ? (
        <div className="flex flex-col items-center gap-12">
           <div className="text-center">
             <h3 className="text-3xl font-lol text-[#00cfeb] mb-2 tracking-[0.2em] uppercase">LOOT VAULT REACHED</h3>
             <p className="text-gray-400 max-w-sm mx-auto font-medium">Insert Masterwork Key to decrypt Ferre's birthday rewards.</p>
           </div>
           
           <div 
             className={`w-96 h-96 relative cursor-pointer group flex items-center justify-center ${isShaking ? 'animate-shake' : ''}`}
             onClick={openChest}
           >
              {/* Spinning Aura */}
              <div className="absolute inset-0 border-2 border-dashed border-[#c89b3c]/40 rounded-full animate-[spin_30s_linear_infinite]"></div>
              <div className="absolute inset-10 border border-[#00cfeb]/30 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
              
              {/* Chest Visual Container - 20% larger */}
              <div className="relative w-80 h-80 bg-white rounded-3xl flex items-center justify-center border-2 border-[#c89b3c]/40 overflow-hidden shadow-[0_0_80px_rgba(200,155,60,0.25)] group-hover:shadow-[0_0_120px_rgba(200,155,60,0.4)] transition-all">
                <img 
                  src="chest.png" 
                  alt="Hextech Chest"
                  className={`w-full h-full object-contain transition-all duration-700 ${!isOpened ? 'brightness-40 contrast-125' : 'brightness-100'} ${isShaking ? 'scale-110' : 'scale-100'}`}
                  style={{ mixBlendMode: 'multiply' }}
                />
                
                {/* Glowing Key */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                   <img 
                     src="key.png" 
                     alt="Hextech Key"
                     className={`w-24 h-24 object-contain transition-all duration-500 ${hasKey ? 'drop-shadow-[0_0_25px_#00cfeb] opacity-100 scale-110' : 'grayscale opacity-20'}`} 
                     style={{ mixBlendMode: 'screen' }}
                   />
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-[#091428] font-bold font-lol tracking-[0.4em] opacity-80 uppercase whitespace-nowrap">
                   HEART-TECH SECURE
                </div>
              </div>
           </div>
           
           <Button 
             disabled={!hasKey || isShaking} 
             onClick={openChest}
             className="px-20 py-5 text-xl"
           >
             {isShaking ? 'DECRYPTING...' : 'OPEN VAULT'}
           </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full animate-fadeIn max-w-lg">
          <div className={`p-8 bg-[#091428] border-4 ${currentLoot?.rarity === 'Ultimate' ? 'border-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.5)]' : 'border-[#c89b3c]/50 shadow-[0_0_60px_rgba(0,0,0,0.8)]'} rounded-2xl w-full text-center relative overflow-hidden ${isShaking ? 'animate-shake' : ''}`}>
             <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${currentLoot?.rarity === 'Ultimate' ? 'orange' : '[#00cfeb]'} to-transparent shadow-[0_0_15px_#00cfeb]`}></div>
             
             <div className="mb-6">
                <span className={`text-xs font-bold uppercase tracking-[0.5em] ${currentLoot?.rarity === 'Ultimate' ? 'text-orange-400' : 'text-[#00cfeb]'}`}>
                  {currentLoot?.rarity} {currentLoot?.type}
                </span>
                <h4 className="text-3xl font-lol text-white mt-2 leading-tight uppercase tracking-widest drop-shadow-md">{currentLoot?.name}</h4>
             </div>

             <div className="w-full aspect-video mx-auto bg-black border-2 border-[#c89b3c]/40 rounded-xl mb-6 flex items-center justify-center shadow-2xl relative overflow-hidden group">
                <img 
                  src={currentLoot?.image} 
                  alt={currentLoot?.name}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                {currentLoot?.rarity === 'Ultimate' && (
                   <div className="absolute inset-0 border-4 border-orange-500/30 animate-pulse pointer-events-none"></div>
                )}
             </div>

             <div className="bg-black/60 p-5 rounded-lg mb-8 border border-white/10 shadow-inner">
                <p className="text-blue-100 italic text-base leading-relaxed font-medium">
                  "{currentLoot?.description}"
                </p>
             </div>

             <div className="flex flex-col gap-4">
                <Button variant="primary" onClick={() => onClaim(currentLoot!)} className="w-full py-4">
                  CLAIM PERMANENT
                </Button>
                
                {rerollsUsed < 2 && (
                   <Button 
                     variant="secondary" 
                     onClick={handleReroll}
                     className="text-[10px] py-2 opacity-80 hover:opacity-100 border-blue-400/30"
                   >
                     REROLL 3 SHARDS INTO PERMANENT ({2 - rerollsUsed} LEFT)
                   </Button>
                )}
             </div>
          </div>
          
          <div className="mt-8 text-[11px] text-blue-400/60 uppercase tracking-[0.4em] font-bold bg-black/60 px-6 py-2 border border-white/5 rounded-full backdrop-blur-sm">
             ANALYZING DROP RATES... {rerollsUsed === 0 ? '0.1%' : rerollsUsed === 1 ? '5.0%' : '100%'}
          </div>
        </div>
      )}
    </div>
  );
};

export default HextechChest;
