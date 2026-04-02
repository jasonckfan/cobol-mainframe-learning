# COBOL Mainframe Learning

![Deploy to GitHub Pages](https://github.com/jasonckfan/cobol-mainframe-learning/actions/workflows/deploy.yml/badge.svg)

一個為 **銀行業務分析師 (BA)** 設計的互動式學習平台，專注於：
- COBOL 程式語言基礎
- Mainframe 主機系統概念
- 銀行業務實務（CLM 資金池、計息邏輯等）
- BA 與開發團隊溝通技巧

## 🌐 線上版本

> GitHub Pages：
>
> **https://jasonckfan.github.io/cobol-mainframe-learning/**

---

## ✨ 主要功能

### 1) 六階段學習路線圖
專為銀行 BA 設計的漸進式學習路徑：

| 階段 | 主題 | 內容 |
|:---|:---|:---|
| 1 | Mainframe 基礎大圖 | Batch vs Online、CICS、JCL 概念 |
| 2 | COBOL 基礎語法 | 變數、條件、迴圈（對照 VBA） |
| 3 | JCL 與檔案處理 | Job 排程、Copybook、VSAM |
| 4 | CLM 銀行實務 | 資金池、掃撥、計息邏輯 |
| 5 | BA 溝通術 | 需求分析、可行性評估、精準提問 |
| 6 | 實戰模擬 | 角色扮演、案例研究 |

### 2) 情境式學習
- **核心概念**：白話比喻 + 正式定義，快速理解 Mainframe 術語
- **情境對話**：模擬 BA 與業務單位、BA 與開發的真實對話場景
- **程式碼範例**：Online COBOL（CICS）與 Batch JCL 對照
- **互動測驗**：情境判斷、程式碼閱讀、單選題

### 3) 程式碼實驗室
- **COBOL 編輯器**：語法高亮、行號顯示
- **JCL 模擬器**：常用 JCL statement 參考
- **Copybook 工具**：資料結構視覺化

### 4) 術語詞典
- 快速搜尋 Mainframe、COBOL、JCL、CICS 等術語
- 分類瀏覽 + 範例說明

### 5) 進度追蹤
- 六階段完成進度視覺化
- 測驗成績統計
- 成就徽章系統

---

## 📱 手機優先設計

本 App 採用 **Mobile-first** 設計理念，針對 iPhone Safari 優化：

- ✅ 支援 iPhone 刘海屏（Safe Area）
- ✅ 最小觸摸目標 44px（Apple HIG 標準）
- ✅ 可加入主屏幕，像原生 App 般全屏運行
- ✅ 流暢的 -webkit-overflow-scrolling 滾動體驗
- ✅ 響應式佈局，支援 iPhone SE 到 iPhone 15 Pro Max

---

## 🧰 技術棧

- React 19
- TypeScript
- Vite
- React Router DOM
- PWA（vite-plugin-pwa）
- 純 CSS（IBM 終端機風格設計）

---

## 🚀 本機開發

### 環境需求
- Node.js 20+
- npm

### 安裝依賴
```bash
npm install
```

### 啟動開發模式
```bash
npm run dev
```

### 打包建置
```bash
npm run build
```

### 本機預覽建置結果
```bash
npm run preview
```

---

## 📦 專案結構

```text
src/
├── components/          # React 元件
│   ├── Layout.tsx      # 主佈局
│   ├── CodeBlock.tsx   # 程式碼展示
│   ├── DialogueView.tsx # 對話組件
│   └── QuizPanel.tsx   # 測驗組件
├── pages/              # 頁面組件
│   ├── Home.tsx        # 首頁
│   ├── ScenarioList.tsx    # 情境列表
│   ├── ScenarioDetail.tsx  # 情境詳情
│   ├── CodeLab.tsx     # 程式碼實驗室
│   ├── Glossary.tsx    # 術語詞典
│   ├── Quiz.tsx        # 測驗中心
│   └── Progress.tsx    # 進度追蹤
├── data/               # 學習資料
│   └── scenarios.ts    # 情境資料
├── types/              # TypeScript 型別
├── styles/             # 全域樣式
└── App.tsx             # 主入口

.github/workflows/
└── deploy.yml          # GitHub Pages 自動部署

SPEC.md                 # 詳細設計規格書
```

---

## 🎨 設計特色

### IBM 終端機風格
- **主色調**：IBM Blue (#054ADA)
- **輔助色**：復古終端機綠色 (#33FF00)
- **字體**：IBM Plex Sans / IBM Plex Mono
- **視覺效果**：發光陰影、終端機掃描線效果

### 互動體驗
- 動畫過渡效果
- 對話氣泡漸進顯示
- 程式碼行號與註解
- 測驗即時反饋

---

## 🤖 GitHub Pages 自動部署

此專案已設定 GitHub Actions 自動部署：

- **觸發條件**：`push` 到 `main` 分支
- **流程**：
  1. Checkout 代碼
  2. Setup Node.js 20
  3. Install dependencies (`npm ci`)
  4. Build (`npm run build`)
  5. Upload artifact
  6. Deploy to GitHub Pages
- **部署目標**：https://jasonckfan.github.io/cobol-mainframe-learning/

若要手動觸發，可到 Actions 執行 `Deploy to GitHub Pages` workflow。

---

## 🗺️ 後續可擴充

### 內容擴充
- [ ] 第 2-6 階段完整情境內容
- [ ] 更多銀行業務案例（外匯、貸款、信用卡）
- [ ] COBOL 除錯練習題目
- [ ] JCL 語法檢查器

### 功能增強
- [ ] 使用者帳號與雲端同步
- [ ] 離線學習（Service Worker）
- [ ] 學習排程提醒
- [ ] 社群討論區

### 互動升級
- [ ] 語音朗讀（TTS）
- [ ] 程式碼執行模擬
- [ ] 3D 主機機房視覺化

---

## 📚 參考資源

### 技術參考
- [IBM COBOL Documentation](https://www.ibm.com/docs/en/cobol-zos)
- [IBM JCL Reference](https://www.ibm.com/docs/en/zos-basic-skills)
- [CICS Documentation](https://www.ibm.com/docs/en/cics-ts)

### 學習平台
- [IBM Z Xplore](https://www.ibm.com/zxplore) - 免費 Mainframe 學習
- [COBOL Programming Course](https://github.com/openmainframeproject/cobol-programming-course)

---

## 🙏 致謝

此專案參考 [japanese-study-mobile](https://github.com/jasonckfan/japanese-study-mobile) 的架構設計，專為銀行業務分析師打造。

---

## License

MIT
