
import React, { useState, useEffect } from 'react';
import Setup from './components/Setup';
import Lottery from './components/Lottery';
import { AppState, Winner, Settings } from './types';
import { playConfetti, playSound, stopSound } from './utils';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('setup');
  const [settings, setSettings] = useState<Settings>({
    names: [],
    allowRepeat: false,
    drawCount: 1,
  });
  const [pool, setPool] = useState<string[]>([]);
  const [history, setHistory] = useState<Winner[]>([]);
  const [currentWinners, setCurrentWinners] = useState<string[]>([]);

  // Initialize pool whenever settings names change
  useEffect(() => {
    setPool([...settings.names]);
  }, [settings.names]);

  const handleStartSetup = () => {
    setView('setup');
  };

  const handleFinishSetup = (newSettings: Settings) => {
    setSettings(newSettings);
    setPool([...newSettings.names]);
    setView('ready');
  };

  const startShaking = () => {
    if (pool.length === 0) {
      alert("名單已空！請重新設定或開啟重複抽獎。");
      return;
    }
    setView('shaking');
    playSound('drum', true);
  };

  const openEnvelope = () => {
    stopSound('drum');
    playSound('celebrate');
    playConfetti();

    const winnersToPick = Math.min(settings.drawCount, pool.length);
    const tempPool = [...pool];
    const pickedNames: string[] = [];

    for (let i = 0; i < winnersToPick; i++) {
      const randomIndex = Math.floor(Math.random() * tempPool.length);
      pickedNames.push(tempPool[randomIndex]);
      
      if (!settings.allowRepeat) {
        tempPool.splice(randomIndex, 1);
      }
    }
    
    setCurrentWinners(pickedNames);
    const newHistoryEntries = pickedNames.map(name => ({ 
      name, 
      time: new Date().toLocaleTimeString() 
    }));
    setHistory(prev => [...newHistoryEntries, ...prev]);

    if (!settings.allowRepeat) {
      setPool(tempPool);
    }

    setView('revealed');
  };

  const resetDraw = () => {
    setCurrentWinners([]);
    setView('ready');
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-start p-4 cny-gradient">
      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold gold-text leading-tight">🧧 「大紅包」開獎囉</h1>
        {view !== 'setup' && (
          <button 
            onClick={handleStartSetup}
            className="bg-amber-500 hover:bg-amber-600 text-red-900 font-bold py-2 px-4 rounded-full text-sm shadow-lg transition-all whitespace-nowrap"
          >
            ⚙️ 設定
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-md flex-grow flex flex-col">
        {view === 'setup' ? (
          <Setup 
            initialSettings={settings} 
            onSave={handleFinishSetup} 
          />
        ) : (
          <Lottery 
            view={view}
            poolCount={pool.length}
            totalCount={settings.names.length}
            currentWinners={currentWinners}
            onStart={startShaking}
            onOpen={openEnvelope}
            onReset={resetDraw}
            history={history}
          />
        )}
      </main>

      {/* Footer Decoration */}
      <footer className="mt-8 mb-4 text-center">
        <p className="text-amber-400 text-opacity-60 text-xs italic">
          祝您 馬年行大運，財源滾滾來 🐎✨
        </p>
      </footer>
    </div>
  );
};

export default App;
