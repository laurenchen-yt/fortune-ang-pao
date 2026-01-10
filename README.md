# 🧧 Fortune Ang Pao (馬年大吉：大紅包開獎神器)

這是一個基於 React + Vite 開發的互動式紅包抽獎應用程式，專為新年活動設計。具備精美的動畫效果與音效，適合尾牙或家庭聚會使用。

## ✨ 功能特色

- **互動式開獎**：搖動手機或點擊螢幕來抽出紅包。
- **精美視覺**：包含金色粒子特效 (Confetti) 與新年喜慶配色。
- **音效回饋**：內建鑼鼓聲與歡呼音效。
- **名單管理**：可自由設定抽獎名單，支援重複/不重複抽獎。
- **歷史紀錄**：自動記錄中獎名單與時間。

## 🚀 快速開始

### 1. 安裝與執行

確保您的電腦已安裝 Node.js (v18+)。

```bash
# 複製專案
git clone https://github.com/laurenchen-yt/fortune-ang-pao.git
cd fortune-ang-pao

# 安裝套件
npm install

# 啟動開發伺服器
npm run dev
```

開啟瀏覽器訪問 `http://localhost:3000` 即可開始使用。

### 2. 部署至 GitHub Pages

本專案已設定 GitHub Actions 自動部署。

1. 修改 `package.json` 中的 `homepage` 欄位（選用）。
2. 推送程式碼至 GitHub：
   ```bash
   git add .
   git commit -m "feat: initial release"
   git push origin main
   ```
3. 進入 GitHub Repo -> **Settings** -> **Pages**。
4. 確保 Source 設定為 **GitHub Actions**。
5. 等待 Actions 執行完畢，即可在 `https://laurenchen-yt.github.io/fortune-ang-pao/` 看到成果。

## 🛠 技術堆疊

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Effects**: Canvas Confetti
- **Language**: TypeScript

## 📄 授權

MIT License
