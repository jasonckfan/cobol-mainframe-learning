# COBOL Mainframe Learning App - 設計規格書

## 📋 項目概述

為銀行業務分析師 (BA) 設計嘅 COBOL 同 Mainframe 學習 App，參考 japanese-study-mobile 嘅互動式學習模式，專注於銀行核心系統實務。

**目標用戶：**
- 銀行業務分析師 (BA)
- 需要了解主機系統嘅項目管理人員
- 準備轉型做 Mainframe 開發嘅 IT 人員

**技術棧：**
- React 19 + TypeScript + Vite
- PWA 支援離線學習
- 本地儲存進度

---

## 🏗️ 架構設計

### 1. 核心學習模組 (參考 japanese-study-mobile)

```
src/
├── modules/
│   ├── scenarios/           # 情境學習 (對應 japanese-study-mobile 嘅情境)
│   │   ├── batch-vs-online/     # Batch vs Online 處理
│   │   ├── cobol-basics/        # COBOL 基礎語法
│   │   ├── jcl-jobs/            # JCL 與 Job 排程
│   │   ├── copybook/            # Copybook 資料結構
│   │   ├── cics-online/         # CICS 聯機交易
│   │   ├── file-processing/     # 檔案處理 (VSAM, Sequential)
│   │   ├── interest-calc/       # 計息邏輯實務
│   │   ├── sweeping-topping/    # 資金池掃撥
│   │   └── ba-communication/    # BA 與開發溝通術
│   ├── code-lab/            # 程式碼實驗室
│   │   ├── cobol-editor/        # COBOL 語法高亮編輯器
│   │   ├── jcl-simulator/       # JCL 模擬執行
│   │   └── debug-playground/    # 除錯練習場
│   ├── quiz/                # 測驗模組
│   └── glossary/            # 術語詞典
├── components/
│   ├── ScenarioCard/        # 情境卡片 (參考 japanese-study-mobile)
│   ├── DialogueView/        # 對話式學習
│   ├── CodeBlock/           # 程式碼展示
│   ├── MainframeTerminal/   # 終端機模擬器
│   └── ProgressTracker/     # 進度追蹤
├── data/
│   ├── scenarios.ts         # 情境資料
│   ├── code-examples.ts     # 程式碼範例
│   └── quiz-questions.ts    # 測驗題目
└── types/
    └── index.ts             # TypeScript 型別定義
```

---

## 📚 六階段學習路線圖

### 第 1 階段：Mainframe 基礎大圖
**目標：** 建立 Batch vs Online 嘅核心概念

| 情境 ID | 名稱 | 圖標 | 內容 |
|---------|------|------|------|
| mainframe-overview | Mainframe 概覽 | 🖥️ | 什麼是大型主機、z/OS 作業系統 |
| batch-vs-online | Batch vs Online | ⚡ | 批次處理 vs 聯機交易 |
| cics-intro | CICS 介紹 | 🔄 | 聯機交易處理系統 |
| job-scheduling | Job 排程概念 | ⏰ | 日終 (EOD)、月終 (EOM) 流程 |

**互動元素：**
- 動畫展示 Batch Job 流程圖
- Online 交易即時反應模擬
- 時間軸展示日終處理順序

---

### 第 2 階段：COBOL 基礎語法
**目標：** 運用 VBA 基礎快速理解 COBOL

| 情境 ID | 名稱 | 圖標 | 內容 |
|---------|------|------|------|
| cobol-structure | COBOL 程式結構 | 📐 | DIVISION、SECTION、PARAGRAPH |
| data-types | 資料型別 | 🔢 | PIC 9, PIC X, COMP-3 |
| variables | 變數宣告 | 📦 | WORKING-STORAGE、LINKAGE |
| conditions | 條件判斷 | 🔀 | IF、EVALUATE、PERFORM |
| loops | 迴圈處理 | 🔄 | PERFORM UNTIL、VARYING |
| file-io | 檔案 I/O | 📁 | OPEN、READ、WRITE、CLOSE |

**VBA → COBOL 對照表：**
```
VBA: Dim balance As Decimal
COBOL: 01 WS-BALANCE PIC S9(13)V99 COMP-3.

VBA: If balance > 0 Then
COBOL: IF WS-BALANCE > ZERO THEN

VBA: For i = 1 To 10
COBOL: PERFORM VARYING WS-I FROM 1 BY 1 UNTIL WS-I > 10
```

---

### 第 3 階段：JCL、Copybook 與檔案
**目標：** 看懂資料怎麼來、報表怎麼產

| 情境 ID | 名稱 | 圖標 | 內容 |
|---------|------|------|------|
| jcl-basics | JCL 基礎 | 📋 | JOB、EXEC、DD statement |
| copybook | Copybook | 📋 | 資料結構定義 |
| vsam-files | VSAM 檔案 | 🗂️ | KSDS、ESDS、RRDS |
| sequential | 循序檔 | 📄 | Sequential File 處理 |
| sort-merge | Sort/Merge | 🔀 | DFSORT 使用 |

**實際範例：**
```jcl
//CLMINT JOB (ACCT),'CALC INTEREST',CLASS=A,MSGCLASS=H
//STEP1    EXEC PGM=CLMINTCL
//INFILE   DD DSN=CLM.ACCOUNT.MASTER,DISP=SHR
//OUTFILE  DD DSN=CLM.INTEREST.REPORT,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE)
//SYSOUT   DD SYSOUT=*
```

---

### 第 4 階段：銀行實務案例 (CLM 專場)
**目標：** 拆解資金池與計息嘅實際系統行為

| 情境 ID | 名稱 | 圖標 | 內容 |
|---------|------|------|------|
| clm-overview | CLM 概覽 | 💰 | 企業資金池管理概念 |
| sweeping | 自動上掃 | ⬆️ | Auto Sweeping 邏輯 |
| topping | 自動下撥 | ⬇️ | Auto Topping 邏輯 |
| interest-calc | 計息邏輯 | 📊 | 利息計算公式與實作 |
| pool-structure | 資金池架構 | 🏗️ | 母帳戶、子帳戶關係 |
| eod-process | 日終處理 | 🌙 | EOD Batch 流程 |

**互動模擬：**
- 資金池餘額變化動畫
- 計息公式計算器
- Sweeping/Topping 觸發條件設定

---

### 第 5 階段：需求分析與 BA 溝通術
**目標：** 如何與開發討論可行性、精準提問

| 情境 ID | 名稱 | 圖標 | 內容 |
|---------|------|------|------|
| req-analysis | 需求分析 | 🔍 | 釐清業務需求 |
| feasibility | 可行性評估 | ⚖️ | 技術可行性判斷 |
| online-or-batch | Online vs Batch 決策 | 🤔 | 選擇正確處理方式 |
| asking-dev | 提問技巧 | ❓ | 如何問開發人員 |
| spec-writing | 規格書撰寫 | 📝 | 撰寫清楚的規格 |

**情境對話範例：**
```
業務：「系統自動補滿透支」

BA 提問：
❌ 「系統自動補滿」
✅ 「這個『自動』是客戶一發生透支，
     系統就『即時 (Online)』去另一個帳戶抓錢過來補？
     還是每天『傍晚固定時間 (Batch)』
     把今天所有透支帳戶一次補齊？」
```

---

### 第 6 階段：實戰模擬
**目標：** 真實需求演練

| 情境 ID | 名稱 | 圖標 | 內容 |
|---------|------|------|------|
| mock-ba-dev | BA-Dev 角色扮演 | 🎭 | 模擬需求討論 |
| case-study-1 | 案例研究 1 | 📚 | 新增計息規則 |
| case-study-2 | 案例研究 2 | 📚 | 修改 Sweeping 門檻 |
| case-study-3 | 案例研究 3 | 📚 | 報表格式變更 |
| final-project | 期末專案 | 🎓 | 完整需求分析 |

---

## 🎨 UI/UX 設計

### 主視覺風格
- **主色調：** IBM 藍色 (#054ADA) - 致敬 IBM Mainframe
- **輔助色：** 復古終端機綠色 (#33FF00)
- **字體：** 
  - 標題：IBM Plex Sans
  - 程式碼：IBM Plex Mono / Fira Code
  - 中文：Noto Sans TC

### 畫面結構 (參考 japanese-study-mobile)

```
┌─────────────────────────────┐
│  🖥️ COBOL Mainframe Learning │
├─────────────────────────────┤
│  📊 進度總覽                  │
│  [=====>     ] 18/60 情境    │
├─────────────────────────────┤
│  🎯 今日推薦                  │
│  Batch vs Online 處理        │
├─────────────────────────────┤
│  📚 六階段學習路線            │
│  ┌───┐ ┌───┐ ┌───┐          │
│  │ 1 │ │ 2 │ │ 3 │ ...      │
│  └───┘ └───┘ └───┘          │
├─────────────────────────────┤
│  🔧 工具箱                   │
│  [術語詞典] [程式碼庫] [測驗] │
└─────────────────────────────┘
```

### 情境學習畫面
```
┌─────────────────────────────┐
│  ⬅️  Batch vs Online        │
├─────────────────────────────┤
│  🍳 中央大廚房比喻            │
│                             │
│  ┌─────────┐  ┌─────────┐   │
│  │ Online  │  │  Batch  │   │
│  │  ⚡即時  │  │  🌙批次 │   │
│  └─────────┘  └─────────┘   │
│                             │
│  [動畫展示區域]               │
│                             │
├─────────────────────────────┤
│  📋 關鍵術語                  │
│  • CICS - 聯機交易處理        │
│  • JCL - Job Control Language │
├─────────────────────────────┤
│  💬 情境對話                  │
│  業務：「系統自動補滿透支」    │
│                             │
│  [❓ 分析這個需求]            │
└─────────────────────────────┘
```

---

## 💻 程式碼展示功能

### COBOL 語法高亮
```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CLMINTCL.
      * CALCULATE INTEREST FOR CLM ACCOUNTS
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ACCT-FILE ASSIGN TO ACCTFILE
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS ACCT-KEY.
       
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-BALANCE       PIC S9(13)V99 COMP-3.
       01  WS-INTEREST-RATE PIC 9V9999    COMP-3 VALUE 0.0125.
       01  WS-INTEREST-AMT  PIC S9(11)V99 COMP-3.
       
       PROCEDURE DIVISION.
       0000-MAIN.
           OPEN INPUT ACCT-FILE
           PERFORM UNTIL WS-EOF = 'Y'
               READ ACCT-FILE NEXT RECORD
                   AT END MOVE 'Y' TO WS-EOF
                   NOT AT END
                       COMPUTE WS-INTEREST-AMT = 
                           WS-BALANCE * WS-INTEREST-RATE / 365
               END-READ
           END-PERFORM
           CLOSE ACCT-FILE
           STOP RUN.
```

### JCL 腳本展示
```jcl
//CLMINT JOB (ACCT),'INTEREST CALC',CLASS=A,MSGCLASS=H
//JOBLIB   DD DSN=CLM.LOADLIB,DISP=SHR
//* 
//* STEP 1: SORT INPUT FILE BY ACCOUNT
//STEP1    EXEC PGM=SORT
//SORTIN   DD DSN=CLM.ACCOUNT.DAILY,DISP=SHR
//SORTOUT  DD DSN=&&SORTED,DISP=(NEW,PASS),
//            SPACE=(CYL,(5,2),RLSE)
//SYSOUT   DD SYSOUT=*
//SYSIN    DD *
    SORT FIELDS=(1,10,CH,A)
/*
//* 
//* STEP 2: CALCULATE INTEREST
//STEP2    EXEC PGM=CLMINTCL,COND=(0,NE)
//ACCTFILE DD DSN=&&SORTED,DISP=(OLD,DELETE)
//RPTFILE  DD DSN=CLM.INTEREST.RPT(+1),
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE),
//            DCB=(RECFM=FB,LRECL=133,BLKSIZE=27930)
//SYSOUT   DD SYSOUT=*
//SYSABEND DD SYSOUT=*
```

---

## 📱 功能特色

### 1. 互動式學習
- **情境對話：** 模擬 BA 與業務、BA 與開發嘅對話場景
- **角色扮演：** 用戶可以扮演 BA 或開發人員
- **決策點：** 選擇 Online vs Batch、判斷可行性

### 2. 程式碼實驗室
- **COBOL 編輯器：** 語法高亮、行號顯示
- **JCL 模擬器：** 模擬 Job 執行流程
- **Copybook 視覺化：** 資料結構圖形化展示
- **除錯練習：** 故意放錯誤，讓用戶找出問題

### 3. 測驗系統
- **單選題：** 概念理解
- **情境判斷：** Online vs Batch 選擇
- **程式碼閱讀：** 看懂 COBOL 邏輯
- **實作題：** 撰寫簡單 JCL

### 4. 術語詞典
- **快速搜尋：** CICS、JCL、VSAM 等術語
- **分類瀏覽：** 按主題分類
- **我的收藏：** 標記重要術語

### 5. 進度追蹤
- **學習路徑：** 六階段進度視覺化
- **每日目標：** 建議每日學習情境
- **成就系統：** 完成階段獲得徽章

---

## 🔧 技術實作細節

### 資料結構 (參考 japanese-study-mobile)

```typescript
// src/types/index.ts

export interface Scenario {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  stage: 1 | 2 | 3 | 4 | 5 | 6;  // 六階段
  context: string;
  roles: Role[];
  concepts: Concept[];           // 核心概念
  dialogues: Dialogue[];         // 情境對話
  codeExamples: CodeExample[];   // 程式碼範例
  quiz: QuizQuestion[];          // 測驗題目
}

export interface Role {
  id: string;
  name: string;
  nameEn: string;
  avatar: string;  // emoji
}

export interface Concept {
  term: string;
  termEn: string;
  explanation: string;
  analogy?: string;  // 白話比喻
}

export interface Dialogue {
  roleId: string;
  text: string;
  textEn?: string;
  isQuestion?: boolean;  // 是否為提問點
  options?: DialogueOption[];
}

export interface DialogueOption {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface CodeExample {
  title: string;
  language: 'cobol' | 'jcl' | 'copybook';
  code: string;
  explanation: string;
  annotations?: CodeAnnotation[];
}

export interface CodeAnnotation {
  line: number;
  text: string;
}
```

---

## 📊 與 japanese-study-mobile 對照

| japanese-study-mobile | cobol-mainframe-learning | 說明 |
|----------------------|-------------------------|------|
| 情境 (Scenario) | 情境 (Scenario) | 相同概念，改為銀行業務情境 |
| 詞彙 (Vocab) | 術語 (Glossary) | 日文詞彙 → Mainframe 術語 |
| 對話 (Dialogue) | 情境對話 (Dialogue) | 日語對話 → BA 業務對話 |
| 文法 (Grammar) | 核心概念 (Concept) | 日文文法 → Mainframe 概念 |
| 測驗 (Quiz) | 測驗 (Quiz) | 相同功能 |
| 進度 (Progress) | 進度 (Progress) | 六階段學習路徑 |

---

## 🚀 開發時程建議

### Phase 1: MVP (2-3 週)
- [ ] 專案架構設置 (Vite + React + TS)
- [ ] 基礎 UI 組件 (參考 japanese-study-mobile)
- [ ] 第 1 階段內容 (Batch vs Online)
- [ ] 術語詞典基礎功能

### Phase 2: 核心功能 (3-4 週)
- [ ] 第 2-3 階段內容 (COBOL 基礎、JCL)
- [ ] 程式碼高亮編輯器
- [ ] 測驗系統
- [ ] 進度追蹤

### Phase 3: 實務內容 (4-6 週)
- [ ] 第 4 階段 (CLM 專場)
- [ ] 第 5 階段 (BA 溝通術)
- [ ] 互動模擬功能
- [ ] 角色扮演對話

### Phase 4: 完善 (2-3 週)
- [ ] 第 6 階段 (實戰模擬)
- [ ] PWA 離線功能
- [ ] 成就系統
- [ ] 優化與測試

---

## 📝 內容創作指南

### 每個情境需包含：

1. **情境設定**
   - 銀行業務場景描述
   - 涉及的角色（業務、BA、開發）

2. **核心概念 (3-5 個)**
   - 術語名稱
   - 白話解釋（比喻）
   - 正式定義

3. **情境對話 (10-20 句)**
   - BA 與業務的對話
   - BA 與開發的對話
   - 決策點選擇

4. **程式碼範例 (1-3 個)**
   - COBOL 程式片段
   - JCL 腳本
   - Copybook 定義

5. **測驗題目 (3-5 題)**
   - 概念理解題
   - 情境判斷題
   - 程式碼閱讀題

---

## 🎯 成功指標

- **學習完成率：** 用戶完成六階段的比例
- **測驗通過率：** 各階段測驗平均分數
- **使用頻率：** 每週使用次數
- **用戶反饋：** NPS 分數

---

## 🔗 參考資源

### 技術參考
- [IBM COBOL Documentation](https://www.ibm.com/docs/en/cobol-zos)
- [IBM JCL Reference](https://www.ibm.com/docs/en/zos-basic-skills)
- [CICS Documentation](https://www.ibm.com/docs/en/cics-ts)

### 學習資源
- [IBM Z Xplore](https://www.ibm.com/zxplore) - 免費 Mainframe 學習平台
- [COBOL Programming Course](https://github.com/openmainframeproject/cobol-programming-course)

---

*設計規格 v1.0*
*參考：japanese-study-mobile 架構*
*目標用戶：銀行業務分析師 (BA)*