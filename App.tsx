
import React, { useState } from 'react';
import { GameStage, LootItem } from './types';
import MemoryGame from './components/MemoryGame';
import BlockBlast from './components/BlockBlast';
import HextechChest from './components/HextechChest';
import VictoryScreen from './components/VictoryScreen';
import { Button } from './components/UI';

const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>(GameStage.INTRO);
  const [inventory, setInventory] = useState({
    keyFragment: false,
    masterworkKey: false,
    claimedLoot: null as LootItem | null
  });

  const nextStage = () => {
    switch (stage) {
      case GameStage.INTRO: setStage(GameStage.MEMORY); break;
      case GameStage.MEMORY: 
        setInventory(prev => ({ ...prev, keyFragment: true }));
        setStage(GameStage.BLOCK_BLAST); 
        break;
      case GameStage.BLOCK_BLAST: 
        setInventory(prev => ({ ...prev, masterworkKey: true }));
        setStage(GameStage.CHEST); 
        break;
      case GameStage.CHEST: 
        break;
    }
  };

  const handleLootClaimed = (loot: LootItem) => {
    setInventory(prev => ({ ...prev, claimedLoot: loot }));
    setStage(GameStage.VICTORY);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#010a13] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-500/10 rounded-full blur-[150px]"></div>

      {/* Header UI */}
      <div className="w-full max-w-5xl flex justify-between items-end mb-6 z-20 px-4">
        <div className="flex flex-col text-left">
          <h1 className="text-4xl font-lol text-[#c89b3c] tracking-[0.2em] drop-shadow-[0_0_15px_rgba(200,155,60,0.5)] uppercase">
            THE HEART-TECH VAULT
          </h1>
          <div className="h-1 w-full bg-gradient-to-r from-[#c89b3c] to-transparent mt-1 shadow-[0_0_8px_rgba(200,155,60,0.4)]"></div>
          <p className="text-[10px] text-blue-400 font-bold uppercase mt-1 tracking-widest">BIRTHDAY PROTOCOL ACTIVATED</p>
        </div>
        
        <div className="flex gap-3 items-center">
          <div className={`p-1 border-2 border-[#c89b3c] rounded bg-[#091428] shadow-inner transition-all duration-700 ${inventory.keyFragment ? 'shadow-[0_0_10px_#00cfeb] border-[#00cfeb]' : 'opacity-20 grayscale'}`}>
             <img src="/key.png" className="w-8 h-8 object-contain" alt="Key" style={{ mixBlendMode: 'screen' }} />
          </div>
          <div className={`p-1 border-2 border-[#c89b3c] rounded bg-[#091428] shadow-inner transition-all duration-700 ${inventory.masterworkKey ? 'shadow-[0_0_10px_#c89b3c]' : 'opacity-20 grayscale'}`}>
             <img src="/chest.png" className="w-8 h-8 object-contain" alt="Chest" style={{ mixBlendMode: 'screen' }} />
          </div>
        </div>
      </div>

      {/* Main Mission Control */}
      <main className="w-full max-w-4xl min-h-[600px] flex flex-col items-center justify-center relative z-10">
        {stage === GameStage.INTRO && (
          <div className="text-center animate-fadeIn flex flex-col items-center">
            <div className="w-32 h-32 border-4 border-[#c89b3c] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(200,155,60,0.3)] bg-[#091428] relative overflow-hidden">
               <img src="/chest.png" className="w-24 h-24 object-contain brightness-125" style={{ mixBlendMode: 'screen' }} />
               <div className="absolute inset-0 bg-blue-500/10 animate-pulse pointer-events-none"></div>
            </div>
            <h2 className="text-5xl font-lol text-white mb-6 tracking-wide">SUMMONER, YOUR QUEST AWAITS</h2>
            <p className="text-lg text-blue-100/80 max-w-xl mx-auto leading-relaxed mb-10 font-light">
              A high-value target detected: <span className="text-[#c89b3c] font-bold underline decoration-dotted">Your Birthday!</span> To secure your legendary loot, you must complete the trial of the Heart-Tech Labs.
            </p>
            <Button onClick={nextStage} className="px-16 py-5 text-2xl hover:scale-105 transition-transform">
              INITIATE TRIAL
            </Button>
          </div>
        )}

        {stage === GameStage.MEMORY && <MemoryGame onComplete={nextStage} />}
        {stage === GameStage.BLOCK_BLAST && <BlockBlast onComplete={nextStage} />}
        {stage === GameStage.CHEST && <HextechChest hasKey={inventory.masterworkKey} onClaim={handleLootClaimed} />}
        {stage === GameStage.VICTORY && <VictoryScreen loot={inventory.claimedLoot} />}
      </main>

      <footer className="mt-auto py-6 text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold z-20 text-center w-full">
        PROPERTY OF PHOELTOVER CUSTOMS © 2026 • HAND-CRAFTED BY PHOEBE HSU • NO REFUNDS ON HEXTECH LOGIC
      </footer>
    </div>
  );
};

export default App;
