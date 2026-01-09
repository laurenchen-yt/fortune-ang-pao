
import React from 'react';
import { AppState, Winner } from '../types';

interface LotteryProps {
  view: AppState;
  poolCount: number;
  totalCount: number;
  currentWinners: string[];
  onStart: () => void;
  onOpen: () => void;
  onReset: () => void;
  history: Winner[];
}

const Lottery: React.FC<LotteryProps> = ({ 
  view, 
  poolCount, 
  totalCount, 
  currentWinners, 
  onStart, 
  onOpen, 
  onReset,
  history 
}) => {
  const RedEnvelope = ({ isShaking = false, onClick = () => {} }) => (
    <div 
      onClick={onClick}
      className={`${isShaking ? 'shake-animation cursor-pointer' : ''} w-60 h-80 bg-red-600 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-amber-500 flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95`}
    >
      {/* Top flap */}
      <div className="absolute top-0 w-full h-1/3 bg-red-700 rounded-b-[50%] border-b-4 border-amber-500 z-20 flex items-center justify-center">
        <div className="w-16 h-16 bg-amber-500 rounded-full border-4 border-amber-300 flex items-center justify-center shadow-inner mt-8">
           <span className="text-red-800 text-2xl font-bold">🧧</span>
        </div>
      </div>
      
      {/* Decorative lines */}
      <div className="absolute inset-0 border-[12px] border-amber-500 border-opacity-10 rounded-3xl pointer-events-none"></div>
      
      {/* Main text / Character */}
      <div className="z-10 mt-16 text-center">
        <div className="text-amber-400 font-serif font-black text-8xl drop-shadow-[0_2px_10px_rgba(251,191,36,0.6)]">福</div>
        <p className="text-amber-300 text-xs mt-2 font-bold tracking-[0.2em]">HAPPY NEW YEAR</p>
      </div>

      {/* Shine effect for shaking */}
      {isShaking && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );

  return (
    <div className="flex-grow flex flex-col space-y-6">
      {/* Stats */}
      <div className="flex justify-around text-amber-200 font-bold bg-red-900 bg-opacity-30 py-2 rounded-xl border border-red-700">
        <div className="text-center">
          <p className="text-xs opacity-70 font-normal">總人數</p>
          <p className="text-xl">{totalCount}</p>
        </div>
        <div className="text-center">
          <p className="text-xs opacity-70 font-normal">剩餘人數</p>
          <p className="text-xl text-amber-400">{poolCount}</p>
        </div>
      </div>

      {/* Main Interaction Area */}
      <div className="flex-grow flex flex-col items-center justify-center py-4 relative">
        {view === 'ready' && (
          <div className="text-center space-y-10">
            <RedEnvelope />
            <button
              onClick={onStart}
              className="px-16 py-5 bg-amber-500 text-red-900 text-3xl font-black rounded-full shadow-[0_8px_0_rgb(180,83,9)] hover:bg-amber-400 hover:shadow-[0_6px_0_rgb(180,83,9)] active:translate-y-1 active:shadow-none transition-all"
            >
              啟動抽獎
            </button>
          </div>
        )}

        {view === 'shaking' && (
          <div className="text-center space-y-8">
            <RedEnvelope isShaking={true} onClick={onOpen} />
            <div className="bg-amber-500 bg-opacity-90 px-6 py-2 rounded-full shadow-lg">
               <p className="text-red-900 font-black animate-bounce">🧧 點擊大紅包揭曉！ 🧧</p>
            </div>
          </div>
        )}

        {view === 'revealed' && (
          <div className="text-center animate-in zoom-in duration-500 w-full px-4">
            <h3 className="text-amber-200 text-2xl font-black mb-6 drop-shadow-lg">✨ 大吉大利，恭喜中獎！ ✨</h3>
            <div className="flex flex-wrap justify-center gap-6 mb-10 max-h-72 overflow-y-auto custom-scrollbar p-4">
              {currentWinners.map((name, i) => (
                <div 
                  key={i} 
                  className="bg-white px-8 py-6 rounded-3xl shadow-[0_0_40px_rgba(251,191,36,0.8)] border-8 border-amber-400 min-w-[160px] transform hover:scale-110 transition-transform flex flex-col items-center"
                >
                  <span className="text-xs text-amber-600 font-bold mb-1 uppercase tracking-widest">Lucky Winner</span>
                  <p className="text-red-600 text-4xl font-black">{name}</p>
                </div>
              ))}
            </div>
            <button
              onClick={onReset}
              className="px-12 py-4 bg-amber-500 text-red-900 text-2xl font-black rounded-full shadow-lg hover:bg-amber-400 active:scale-95 transition-all border-4 border-amber-300"
            >
              再來一次
            </button>
          </div>
        )}
      </div>

      {/* History Drawer (Bottom) */}
      <div className="bg-red-950 bg-opacity-60 p-5 rounded-3xl border-2 border-amber-900 shadow-inner">
        <h4 className="text-amber-400 font-black mb-3 text-sm flex items-center tracking-wider">
           📜 榮耀中獎榜
        </h4>
        <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {history.length > 0 ? (
            history.map((winner, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gradient-to-r from-red-900/50 to-red-800/50 p-3 rounded-xl border border-amber-900/30">
                <span className="text-amber-100 font-bold text-lg">{winner.name}</span>
                <span className="text-amber-600 text-xs font-mono">{winner.time}</span>
              </div>
            ))
          ) : (
            <p className="text-red-400 text-center py-6 text-xs italic tracking-widest">虚位以待，靜候佳音...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lottery;
