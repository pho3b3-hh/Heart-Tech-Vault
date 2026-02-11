
import React, { useState, useEffect } from 'react';
import { Card } from '../types';

interface MemoryGameProps {
  onComplete: () => void;
}

const IMAGES = [
  'pic1.jpg', 
  'pic2.jpg',
  'pic3.jpg',
  'pic4.jpe',
  'pic5.jpg',
  'pic6.jpg',
  'pic7.jpg',
  'pic8.jpg',
];

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const shuffled = [...IMAGES, ...IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((img, idx) => ({
        id: idx,
        image: img,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].image === cards[second].image) {
        setCards(prev => prev.map((c, i) => (i === first || i === second ? { ...c, isMatched: true } : c)));
        setMatchedCount(prev => prev + 1);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matchedCount === 8) {
      setIsFinished(true);
      setTimeout(onComplete, 2500);
    }
  }, [matchedCount, onComplete]);

  const handleFlip = (id: number) => {
    if (flipped.length < 2 && !flipped.includes(id) && !cards[id].isMatched) {
      setFlipped(prev => [...prev, id]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 animate-fadeIn w-full max-w-2xl">
      <div className="text-center">
        <h3 className="text-3xl font-lol text-[#00cfeb] mb-2 tracking-widest uppercase">MEMORY LANE LANE</h3>
        <p className="text-sm text-blue-200/60 font-medium uppercase">Reconstruct the memory matrix to extract the key fragment</p>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 relative">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            onClick={() => handleFlip(idx)}
            className={`w-16 h-16 sm:w-28 sm:h-28 cursor-pointer relative transition-all duration-500 transform ${
              flipped.includes(idx) || card.isMatched ? 'rotate-y-180 scale-105' : 'hover:scale-105'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-[#091428] to-[#010a13] border-2 border-[#c89b3c]/50 rounded-lg flex items-center justify-center transition-opacity duration-300 ${flipped.includes(idx) || card.isMatched ? 'opacity-0' : 'opacity-100 shadow-[0_0_10px_rgba(200,155,60,0.2)]'}`}>
               <div className="w-10 h-10 border border-[#c89b3c]/30 rounded-full flex items-center justify-center">
                  <span className="text-[#c89b3c] text-2xl font-lol">?</span>
               </div>
            </div>
            <div className={`absolute inset-0 border-2 border-[#00cfeb] rounded-lg overflow-hidden transition-opacity duration-300 ${flipped.includes(idx) || card.isMatched ? 'opacity-100 shadow-[0_0_20px_rgba(0,207,235,0.4)]' : 'opacity-0'}`}>
              <img src={card.image} alt="Memory" className="w-full h-full object-cover" />
              {card.isMatched && (
                 <div className="absolute inset-0 bg-[#00cfeb]/20 animate-pulse flex items-center justify-center">
                    <div className="w-6 h-6 bg-white/50 rounded-full blur-md"></div>
                 </div>
              )}
            </div>
          </div>
        ))}

        {isFinished && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg rounded-xl border-2 border-[#00cfeb] z-20 animate-bounceIn">
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
                <img src="/key.png" className="w-32 h-32 object-contain relative z-10 drop-shadow-[0_0_20px_#00cfeb]" style={{ mixBlendMode: 'screen' }} />
             </div>
             <h4 className="text-3xl font-lol text-[#00cfeb] tracking-widest animate-pulse">KEY FRAGMENT FOUND</h4>
             <p className="text-xs text-blue-300 uppercase mt-2 tracking-[0.3em]">Progressing to the Forge...</p>
          </div>
        )}
      </div>

      <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden border border-[#c89b3c]/30 shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-[#00cfeb] to-blue-400 transition-all duration-500 shadow-[0_0_10px_#00cfeb]" 
          style={{ width: `${(matchedCount / 8) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MemoryGame;
