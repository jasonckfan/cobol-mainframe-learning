// COBOL Mainframe Learning App - 情境資料
// 第 1 階段：Mainframe 基礎大圖

import type { Scenario } from '../types';

export const initialScenarios: Scenario[] = [
  // ========== 第 1 階段：Mainframe 基礎大圖 ==========
  {
    id: 'batch-vs-online',
    title: 'Batch vs Online 處理',
    titleEn: 'Batch vs Online Processing',
    icon: '⚡',
    stage: 1,
    context: '銀行主機最核心的兩種運作模式',
    contextEn: 'The two core operation modes of bank mainframes',
    roles: [
      { id: 'ba', name: '業務分析師', nameEn: 'Business Analyst', avatar: '👔' },
      { id: 'business', name: '業務單位', nameEn: 'Business User', avatar: '💼' },
    ],
    concepts: [
      {
        term: 'Mainframe (大型主機)',
        termEn: 'Mainframe',
        explanation: '銀行用來處理核心業務的超級電腦，穩定性極高，作業系統通常叫 z/OS',
        analogy: '就像一家銀行的「超級中央大廚房」，24小時不停運作',
      },
      {
        term: 'Online (聯機交易)',
        termEn: 'Online Transaction',
        explanation: '使用者即時操作，系統馬上回應，一次處理一筆',
        analogy: '就像前台客人點餐，廚房馬上炒，客人等著要看結果',
      },
      {
        term: 'Batch (批次處理)',
        termEn: 'Batch Processing',
        explanation: '不需要人工介入，透過排程在背景自動執行，一次處理大量資料',
        analogy: '就像餐廳打烊後，廚房人員算一整天的總帳、備明天的料',
      },
      {
        term: 'CICS',
        termEn: 'CICS',
        explanation: 'Customer Information Control System，處理聯機交易的子系統',
        analogy: 'Online 交易的大門管理員，負責接收和分發交易請求',
      },
      {
        term: 'JCL',
        termEn: 'JCL',
        explanation: 'Job Control Language，告訴主機「去哪裡拿檔案、執行哪支程式、輸出什麼報表」',
        analogy: 'Batch 工作的食譜，寫明材料、步驟、成品',
      },
    ],
    dialogues: [
      { roleId: 'business', text: '我們希望系統自動幫客戶把透支的錢補滿。' },
      { roleId: 'ba', text: '了解。讓我確認一下：這個「自動」是什麼意思？' },
      { roleId: 'ba', text: '是客戶一發生透支，系統就「即時 (Online)」去另一個帳戶抓錢過來補？', isQuestion: true },
      { roleId: 'ba', text: '還是我們每天「傍晚固定一個時間 (Batch)」，跑一支排程把今天所有透支的帳戶一次補齊？', isQuestion: true },
      { roleId: 'business', text: '應該是即時的吧？客戶不想被收透支利息。' },
      { roleId: 'ba', text: '明白。如果是即時處理，這就是 Online 交易，需要走 CICS，開發成本會比較高。' },
      { roleId: 'ba', text: '如果是日終批次處理，就是 Batch Job，用 JCL 排程，成本較低，但客戶當天還是會被計透支利息。' },
      { roleId: 'business', text: '原來如此，那我們要評估一下成本效益。' },
      { roleId: 'ba', text: '對，這就是為什麼 BA 要先釐清是 Online 還是 Batch，兩者的技術架構完全不同。' },
    ],
    codeExamples: [
      {
        title: 'Online COBOL 程式結構',
        language: 'cobol',
        code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. CLMONLIN.
      * ONLINE PROGRAM FOR REAL-TIME TRANSFER
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       SOURCE-COMPUTER. IBM-370.
       OBJECT-COMPUTER. IBM-370.
       
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-INPUT-MSG.
           05  WS-FROM-ACCT    PIC X(10).
           05  WS-TO-ACCT      PIC X(10).
           05  WS-AMOUNT       PIC 9(13)V99 COMP-3.
       01  WS-OUTPUT-MSG.
           05  WS-STATUS       PIC X(02).
           05  WS-BALANCE      PIC 9(13)V99 COMP-3.
       
       LINKAGE SECTION.
       01  DFHCOMMAREA.
           05  LK-DATA       PIC X(100).
       
       PROCEDURE DIVISION.
       0000-MAIN.
           EXEC CICS HANDLE CONDITION
               ERROR(9999-ERROR)
           END-EXEC
           
           EXEC CICS RECEIVE
               INTO(WS-INPUT-MSG)
               LENGTH(LENGTH OF WS-INPUT-MSG)
           END-EXEC
           
           PERFORM 1000-VALIDATE-INPUT
           PERFORM 2000-PROCESS-TRANSFER
           PERFORM 3000-SEND-RESPONSE
           
           EXEC CICS RETURN END-EXEC.
       
       1000-VALIDATE-INPUT.
      *    CHECK IF ACCOUNTS EXIST AND HAVE SUFFICIENT BALANCE
           EXEC CICS READ FILE('ACCTFILE')
               INTO(ACCT-RECORD)
               RIDFLD(WS-FROM-ACCT)
           END-EXEC.
       
       2000-PROCESS-TRANSFER.
      *    DEDUCT FROM SOURCE, ADD TO DESTINATION
           SUBTRACT WS-AMOUNT FROM ACCT-BALANCE.
           EXEC CICS REWRITE FILE('ACCTFILE')
               FROM(ACCT-RECORD)
           END-EXEC.
       
       3000-SEND-RESPONSE.
           MOVE ACCT-BALANCE TO WS-BALANCE.
           MOVE '00' TO WS-STATUS.
           EXEC CICS SEND
               FROM(WS-OUTPUT-MSG)
               LENGTH(LENGTH OF WS-OUTPUT-MSG)
           END-EXEC.`,
        explanation: 'Online 程式使用 CICS 指令接收和發送訊息，即時處理單筆交易',
        annotations: [
          { line: 1, text: '程式識別區' },
          { line: 22, text: 'CICS 通訊區，接收前端傳來的資料' },
          { line: 27, text: '處理 CICS 錯誤' },
          { line: 31, text: '接收使用者輸入' },
          { line: 43, text: '讀取帳戶資料' },
          { line: 49, text: '即時更新餘額' },
        ],
      },
      {
        title: 'Batch JCL 腳本範例',
        language: 'jcl',
        code: `//CLMINT JOB (ACCT),'CALC INTEREST',CLASS=A,MSGCLASS=H
//JOBLIB   DD DSN=CLM.LOADLIB,DISP=SHR
//* 
//* JOB 名稱：CLMINT
//* 功能：計算 CLM 帳戶每日利息
//* 排程：每日 23:30 (EOD)
//* 
//* STEP 1: 備份昨日資料
//STEP010  EXEC PGM=IEBGENER
//SYSUT1   DD DSN=CLM.ACCT.MASTER,DISP=SHR
//SYSUT2   DD DSN=CLM.ACCT.MASTER.BAK(+1),
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(100,50),RLSE),
//            DCB=(RECFM=FB,LRECL=500,BLKSIZE=27950)
//SYSPRINT DD SYSOUT=*
//SYSIN    DD DUMMY
//* 
//* STEP 2: 執行計息程式
//STEP020  EXEC PGM=CLMINTCL,COND=(0,NE)
//ACCTFILE DD DSN=CLM.ACCT.MASTER,DISP=SHR
//INTFILE  DD DSN=CLM.INT.RATE.FILE,DISP=SHR
//RPTFILE  DD DSN=CLM.INTEREST.RPT(+1),
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE),
//            DCB=(RECFM=FB,LRECL=133,BLKSIZE=27930)
//SYSOUT   DD SYSOUT=*
//SYSABEND DD SYSOUT=*
//* 
//* STEP 3: 發送完成通知
//STEP030  EXEC PGM=SENDMAIL,COND=(0,NE)
//RECIPIENT DD *
TO: BA-TEAM@BANK.COM
SUBJECT: CLM Interest Calc Complete
//*`,
        explanation: 'Batch Job 透過 JCL 定義多個步驟，按順序執行備份、計息、通知',
        annotations: [
          { line: 1, text: 'JOB statement：定義作業名稱和屬性' },
          { line: 2, text: 'JOBLIB：載入程式庫' },
          { line: 9, text: 'STEP 1：使用 IEBGENER 複製檔案作備份' },
          { line: 18, text: 'STEP 2：執行 COBOL 計息程式' },
          { line: 20, text: '輸入檔：帳戶主檔' },
          { line: 21, text: '輸入檔：利率檔' },
          { line: 22, text: '輸出檔：利息報表' },
          { line: 30, text: 'STEP 3：發送郵件通知' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        type: 'scenario',
        question: '情境 A：企業客戶透過 API 查詢目前母帳戶的最新可用餘額 (Available Balance)。這應該用 Online 還是 Batch？',
        options: [
          { id: 'a', text: 'Online - 客戶需要即時看到最新餘額' },
          { id: 'b', text: 'Batch - 可以晚上統一計算後提供' },
        ],
        correctAnswer: 'a',
        explanation: '查詢最新餘額需要即時回應，這是典型的 Online 交易，透過 CICS 處理。',
      },
      {
        id: 'q1-2',
        type: 'scenario',
        question: '情境 B：每月一號，系統根據上個月的每日餘額，計算出應付利息，並產出利息明細報表給企業客戶。這應該用 Online 還是 Batch？',
        options: [
          { id: 'a', text: 'Online - 客戶登入時即時計算' },
          { id: 'b', text: 'Batch - 每月固定時間批次處理大量帳戶' },
        ],
        correctAnswer: 'b',
        explanation: '計算利息涉及大量帳戶和歷史資料，適合在夜間用 Batch 處理，產出報表後供客戶次日查詢。',
      },
      {
        id: 'q1-3',
        type: 'single',
        question: '以下哪個是 CICS 的主要功能？',
        options: [
          { id: 'a', text: '批次排程和作業控制' },
          { id: 'b', text: '聯機交易處理和畫面管理' },
          { id: 'c', text: '檔案備份和恢復' },
          { id: 'd', text: '資料庫查詢優化' },
        ],
        correctAnswer: 'b',
        explanation: 'CICS (Customer Information Control System) 主要負責聯機交易處理，包括接收交易請求、管理畫面流程、處理資料讀寫等。',
      },
      {
        id: 'q1-4',
        type: 'code-reading',
        question: '看以下 JCL 片段，這個 Job 的主要功能是什麼？\n\n//DAILY JOB (ACCT),\'EOD PROCESS\',CLASS=A\n//STEP1 EXEC PGM=CLMEOD01\n//INFILE DD DSN=CLM.TRANS.FILE,DISP=SHR\n//RPTFILE DD DSN=CLM.DAILY.RPT,DISP=(NEW,CATLG)',
        options: [
          { id: 'a', text: '即時處理客戶交易' },
          { id: 'b', text: '日終批次處理交易檔並產出報表' },
          { id: 'c', text: '備份系統資料' },
          { id: 'd', text: '發送電子郵件通知' },
        ],
        correctAnswer: 'b',
        explanation: '這是一個 Batch Job（有 JOB statement 和 EXEC PGM），用來處理日終 (EOD) 流程，讀取交易檔並產出報表。',
      },
    ],
  },
  
  // ========== 第 2 個情境：CICS 基礎介紹 ==========
  {
    id: 'cics-basics',
    title: 'CICS 基礎介紹',
    titleEn: 'CICS Basics',
    icon: '🖥️',
    stage: 1,
    context: '了解銀行聯機交易系統的核心組件',
    contextEn: 'Understanding the core components of bank online transaction systems',
    roles: [
      { id: 'ba', name: '業務分析師', nameEn: 'Business Analyst', avatar: '👔' },
      { id: 'dev', name: '程式設計師', nameEn: 'Developer', avatar: '💻' },
    ],
    concepts: [
      {
        term: 'CICS (Customer Information Control System)',
        termEn: 'CICS',
        explanation: 'IBM 的交易處理監控系統，負責管理銀行所有即時交易',
        analogy: '就像餐廳的前台經理，負責接收客人點單、分配給廚房、確保每道菜按順序完成',
      },
      {
        term: 'Transaction (交易)',
        termEn: 'Transaction',
        explanation: '一個完整的業務操作單位，必須全部成功或全部失敗',
        analogy: '就像轉帳：扣款和入帳必須同時成功，不能只扣款不入帳',
      },
      {
        term: 'Program Control (程式控制)',
        termEn: 'Program Control',
        explanation: 'CICS 管理程式的載入、執行和釋放資源',
        analogy: '就像經理安排哪個廚師做哪道菜，做完後清理工作台',
      },
      {
        term: 'Temporary Storage (暫存區)',
        termEn: 'Temporary Storage',
        explanation: '交易過程中暫時存放資料的地方，交易完成後清除',
        analogy: '就像廚房的工作台，準備食材時暫放，出菜後清空',
      },
    ],
    dialogues: [
      { roleId: 'ba', text: '我想了解一下 CICS 系統是如何處理交易的。' },
      { roleId: 'dev', text: '好的。CICS 是銀行核心系統的大腦，所有即時交易都要經過它。' },
      { roleId: 'dev', text: '當客戶在 ATM 提款時，CICS 會先驗證卡片、檢查餘額、扣款、吐鈔，這四個步驟必須一起完成。' },
      { roleId: 'ba', text: '如果其中一步失敗了怎麼辦？' },
      { roleId: 'dev', text: '這就是 Transaction 的概念：全部成功或全部失敗。如果吐鈔失敗，前面的扣款會自動回滾。' },
      { roleId: 'ba', text: '原來如此，這就是所謂的 ACID 特性？' },
      { roleId: 'dev', text: '對！Atomicity（原子性）、Consistency（一致性）、Isolation（隔離性）、Durability（持久性）。' },
      { roleId: 'dev', text: 'CICS 確保即使系統當機，交易資料也不會遺失或錯亂。' },
      { roleId: 'ba', text: '那 BA 在寫需求時要注意什麼？' },
      { roleId: 'dev', text: '要明確定義交易的邊界：什麼時候開始、什麼時候結束、失敗時如何處理。這會影響 CICS 程式的設計。' },
    ],
    codeExamples: [
      {
        title: 'CICS 交易程式範例',
        language: 'cobol',
        code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. WITHDRAW.
      * CICS ATM 提款程式
       
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-ACCT-NO       PIC X(10).
       01  WS-AMOUNT        PIC 9(9)V99 COMP-3.
       01  WS-BALANCE       PIC 9(9)V99 COMP-3.
       01  WS-STATUS        PIC X(2).
           88  SUCCESS      VALUE '00'.
           88  INSUFF-FUND  VALUE '51'.
       
       LINKAGE SECTION.
       01  DFHCOMMAREA      PIC X(100).
       
       PROCEDURE DIVISION.
       0000-MAIN.
           EXEC CICS HANDLE CONDITION
               ERROR(9999-ERROR)
           END-EXEC
           
      * 接收輸入
           EXEC CICS RECEIVE
               INTO(DFHCOMMAREA)
               LENGTH(LENGTH OF DFHCOMMAREA)
           END-EXEC
           
      * 解析輸入資料
           MOVE DFHCOMMAREA(1:10) TO WS-ACCT-NO
           MOVE DFHCOMMAREA(11:9) TO WS-AMOUNT
           
      * 查詢餘額
           EXEC CICS READ
               FILE('ACCTFILE')
               INTO(WS-BALANCE)
               RIDFLD(WS-ACCT-NO)
           END-EXEC
           
      * 檢查餘額
           IF WS-BALANCE < WS-AMOUNT
               MOVE '51' TO WS-STATUS
               GO TO 9000-EXIT
           END-IF
           
      * 扣款
           SUBTRACT WS-AMOUNT FROM WS-BALANCE
           
      * 更新帳戶
           EXEC CICS REWRITE
               FILE('ACCTFILE')
               FROM(WS-BALANCE)
               RIDFLD(WS-ACCT-NO)
           END-EXEC
           
           MOVE '00' TO WS-STATUS
           .
           
       9000-EXIT.
           EXEC CICS SEND
               FROM(WS-STATUS)
               LENGTH(2)
           END-EXEC
           
           EXEC CICS RETURN
           END-EXEC.
           
       9999-ERROR.
           MOVE '99' TO WS-STATUS
           GO TO 9000-EXIT.`,
        explanation: 'CICS 程式使用 EXEC CICS 指令進行交易處理，包含接收請求、讀取資料、業務邏輯、回傳結果',
        annotations: [
          { line: 21, text: 'RECEIVE：接收來自終端機的輸入' },
          { line: 28, text: 'READ：從 VSAM 檔案讀取帳戶餘額' },
          { line: 34, text: '業務邏輯：檢查餘額是否足夠' },
          { line: 41, text: 'REWRITE：更新帳戶餘額' },
          { line: 48, text: 'SEND：回傳處理結果給終端機' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        type: 'single',
        question: 'CICS 的主要功能是什麼？',
        options: [
          { id: 'a', text: '批次作業排程' },
          { id: 'b', text: '聯機交易處理' },
          { id: 'c', text: '資料庫備份' },
          { id: 'd', text: '網路安全管理' },
        ],
        correctAnswer: 'b',
        explanation: 'CICS (Customer Information Control System) 是專門用於聯機交易處理的監控系統。',
      },
      {
        id: 'q2-2',
        type: 'single',
        question: 'Transaction 的 ACID 特性中，"A" 代表什麼？',
        options: [
          { id: 'a', text: 'Availability（可用性）' },
          { id: 'b', text: 'Atomicity（原子性）' },
          { id: 'c', text: 'Authority（權限）' },
          { id: 'd', text: 'Automation（自動化）' },
        ],
        correctAnswer: 'b',
        explanation: 'Atomicity（原子性）表示交易是不可分割的單位，要麼全部成功，要麼全部失敗。',
      },
      {
        id: 'q2-3',
        type: 'code-reading',
        question: '以下 CICS 指令的作用是什麼?\n\nEXEC CICS READ\n    FILE(`ACCTFILE`)\n    INTO(WS-BALANCE)\n    RIDFLD(WS-ACCT-NO)\nEND-EXEC',
        options: [
          { id: 'a', text: '寫入資料到檔案' },
          { id: 'b', text: '從檔案讀取資料' },
          { id: 'c', text: '刪除檔案記錄' },
          { id: 'd', text: '建立新檔案' },
        ],
        correctAnswer: 'b',
        explanation: 'READ 指令用於從 CICS 管理的檔案中讀取資料，RIDFLD 指定讀取鍵值。',
      },
    ],
  },
  
  // ========== 第 3 個情境：JCL 入門 ==========
  {
    id: 'jcl-basics',
    title: 'JCL 入門',
    titleEn: 'JCL Basics',
    icon: '📋',
    stage: 1,
    context: '學習批次作業控制語言的基礎語法',
    contextEn: 'Learning the basic syntax of Job Control Language',
    roles: [
      { id: 'ba', name: '業務分析師', nameEn: 'Business Analyst', avatar: '👔' },
      { id: 'ops', name: '操作員', nameEn: 'Operator', avatar: '🔧' },
    ],
    concepts: [
      {
        term: 'JCL (Job Control Language)',
        termEn: 'JCL',
        explanation: '告訴主機「要做什麼、用什麼資源、輸出到哪裡」的指令語言',
        analogy: '就像給工廠的生產指令單，寫明原料、工序、成品存放位置',
      },
      {
        term: 'JOB Statement',
        termEn: 'JOB Statement',
        explanation: '每個批次作業的第一行，定義作業名稱和基本屬性',
        analogy: '就像生產單的表頭，有單號、客戶、優先級等資訊',
      },
      {
        term: 'EXEC Statement',
        termEn: 'EXEC Statement',
        explanation: '執行某個程式，可以指定條件（如前置步驟成功才執行）',
        analogy: '就像指定某個工序，可以設定「只有上一步合格才做這步」',
      },
      {
        term: 'DD Statement',
        termEn: 'DD Statement',
        explanation: 'Data Definition，定義程式需要的資料檔案',
        analogy: '就像指定這個工序需要什麼原料、成品放哪裡',
      },
    ],
    dialogues: [
      { roleId: 'ba', text: '我想了解一下 JCL 是怎麼運作的。' },
      { roleId: 'ops', text: 'JCL 是批次作業的靈魂。沒有 JCL，主機不知道要做什麼。' },
      { roleId: 'ops', text: '每個批次作業都以 JOB statement 開頭，定義作業名稱和帳號。' },
      { roleId: 'ba', text: '那 EXEC 和 DD 是什麼？' },
      { roleId: 'ops', text: 'EXEC 是執行程式，DD 是定義資料檔。一個 JOB 可以有多個 EXEC（多個步驟）。' },
      { roleId: 'ops', text: '例如：第一步備份、第二步處理、第三步產報表，三步組成一個完整的批次作業。' },
      { roleId: 'ba', text: '如果第二步失敗了怎麼辦？' },
      { roleId: 'ops', text: '可以用 COND 參數控制。例如 COND=(0,NE) 表示「只有上一步回傳碼為 0 才執行」。' },
      { roleId: 'ba', text: '這樣就可以確保不會用錯誤的資料繼續處理。' },
      { roleId: 'ops', text: '對！這是批次作業的重要安全機制。BA 寫需求時要考慮這些處理邏輯。' },
    ],
    codeExamples: [
      {
        title: '基本 JCL 結構',
        language: 'jcl',
        code: `//PAYROLL JOB (ACCT),'PAYMENT PROCESS',CLASS=A,MSGCLASS=H
//* 
//* 薪資處理批次作業
//* 
//JOBLIB   DD DSN=PAYROLL.LOADLIB,DISP=SHR
//* 
//* STEP 1: 驗證輸入檔案
//STEP010  EXEC PGM=PAYVALID
//INFILE   DD DSN=PAYROLL.INPUT.FILE,DISP=SHR
//RPTFILE  DD SYSOUT=*
//SYSOUT   DD SYSOUT=*
//* 
//* STEP 2: 計算薪資（只有 STEP1 成功才執行）
//STEP020  EXEC PGM=PAYCALC,COND=(0,NE,STEP010)
//EMPFILE  DD DSN=PAYROLL.EMP.MASTER,DISP=SHR
//TAXFILE  DD DSN=PAYROLL.TAX.TABLE,DISP=SHR
//OUTFILE  DD DSN=PAYROLL.OUTPUT.FILE(+1),
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(50,10),RLSE),
//            DCB=(RECFM=FB,LRECL=500)
//RPTFILE  DD SYSOUT=*
//SYSOUT   DD SYSOUT=*
//* 
//* STEP 3: 產出報表
//STEP030  EXEC PGM=PAYRPT,COND=(0,NE,STEP020)
//INFILE   DD DSN=*.STEP020.OUTFILE,DISP=SHR
//RPTFILE  DD SYSOUT=*
//SYSOUT   DD SYSOUT=*`,
        explanation: 'JCL 由 JOB、EXEC、DD 三種 statement 組成，透過 COND 參數控制執行流程',
        annotations: [
          { line: 1, text: 'JOB：定義作業名稱、帳號、類別' },
          { line: 5, text: 'JOBLIB：指定程式庫位置' },
          { line: 8, text: 'EXEC：執行驗證程式' },
          { line: 14, text: 'COND=(0,NE,STEP010)：只有 STEP010 回傳 0 才執行' },
          { line: 17, text: 'DD：定義輸出檔，(+1) 表示新世代' },
          { line: 25, text: '*.STEP020.OUTFILE：引用前面步驟產生的檔案' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        type: 'single',
        question: 'JCL 中 JOB statement 的作用是什麼？',
        options: [
          { id: 'a', text: '執行程式' },
          { id: 'b', text: '定義作業名稱和屬性' },
          { id: 'c', text: '指定資料檔案' },
          { id: 'd', text: '設定排程時間' },
        ],
        correctAnswer: 'b',
        explanation: 'JOB statement 是每個批次作業的第一行，用來定義作業名稱、帳號、類別等基本屬性。',
      },
      {
        id: 'q3-2',
        type: 'single',
        question: 'COND=(0,NE,STEP010) 的意思是什麼？',
        options: [
          { id: 'a', text: 'STEP010 回傳 0 時跳過這步' },
          { id: 'b', text: 'STEP010 回傳不等於 0 時跳過這步' },
          { id: 'c', text: 'STEP010 回傳 0 時執行這步' },
          { id: 'd', text: '無條件執行這步' },
        ],
        correctAnswer: 'c',
        explanation: 'COND=(0,NE,STEP010) 表示「如果 STEP010 的回傳碼 Not Equal 0，則跳過」。也就是 STEP010 成功（回傳 0）才執行。',
      },
      {
        id: 'q3-3',
        type: 'code-reading',
        question: '//OUTFILE DD DSN=DATA.FILE(+1),DISP=(NEW,CATLG,DELETE)\\n這個 DD statement 的意思是什麼?',
        options: [
          { id: 'a', text: '開啟現有檔案供讀取' },
          { id: 'b', text: '建立新檔案，正常結束時保留，異常時刪除' },
          { id: 'c', text: '刪除舊檔案並建立新檔案' },
          { id: 'd', text: '僅供暫時使用，作業結束後刪除' },
        ],
        correctAnswer: 'b',
        explanation: 'DISP=(NEW,CATLG,DELETE) 表示：NEW（建立新檔）、CATLG（正常結束時編目保留）、DELETE（異常時刪除）。(+1) 表示新世代。',
      },
    ],
  },
];