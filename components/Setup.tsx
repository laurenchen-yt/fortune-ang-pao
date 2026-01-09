
import React, { useState } from 'react';
import { Settings } from '../types';

interface SetupProps {
  initialSettings: Settings;
  onSave: (settings: Settings) => void;
}

const Setup: React.FC<SetupProps> = ({ initialSettings, onSave }) => {
  const [inputText, setInputText] = useState(initialSettings.names.join('\n'));
  const [allowRepeat, setAllowRepeat] = useState(initialSettings.allowRepeat);
  const [drawCount, setDrawCount] = useState(initialSettings.drawCount || 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const names = text.split(/\r?\n/).map(n => n.trim()).filter(n => n !== "");
        setInputText(names.join('\n'));
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    const names = inputText.split(/\r?\n/).map(n => n.trim()).filter(n => n !== "");
    if (names.length === 0) {
      alert("請輸入至少一個姓名！");
      return;
    }
    const count = Math.max(1, Math.min(drawCount, names.length));
    onSave({ names, allowRepeat, drawCount: count });
  };

  return (
    <div className="bg-red-800 bg-opacity-40 p-6 rounded-3xl border-2 border-amber-600 shadow-2xl space-y-6">
      <h2 className="text-xl font-bold text-amber-400 border-b border-amber-600 pb-2">名單設定</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-amber-200">請輸入或貼上姓名（每行一人）</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-40 bg-red-950 text-amber-100 p-4 rounded-xl border border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-red-800"
          placeholder="例如：&#10;王大明&#10;李小華&#10;陳曉東"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-amber-200">上傳 CSV / 文字檔</label>
          <input 
            type="file" 
            accept=".csv,.txt"
            onChange={handleFileChange}
            className="block w-full text-xs text-amber-300
              file:mr-2 file:py-2 file:px-3
              file:rounded-full file:border-0
              file:text-xs file:font-semibold
              file:bg-amber-600 file:text-red-900
              hover:file:bg-amber-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-amber-200">每次抽取人數</label>
          <input 
            type="number"
            min="1"
            value={drawCount}
            onChange={(e) => setDrawCount(parseInt(e.target.value) || 1)}
            className="w-full bg-red-950 text-amber-100 p-2 rounded-xl border border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-2 border-t border-amber-900 mt-2">
        <span className="text-amber-200 font-medium text-sm">是否允許重複中獎</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={allowRepeat}
            onChange={(e) => setAllowRepeat(e.target.checked)}
          />
          <div className="w-11 h-6 bg-red-950 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
        </label>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-amber-500 hover:bg-amber-400 text-red-950 font-black py-4 rounded-2xl text-xl shadow-[0_4px_0_rgb(180,83,9)] active:translate-y-1 active:shadow-none transition-all"
      >
        確認並進入抽獎
      </button>
    </div>
  );
};

export default Setup;
