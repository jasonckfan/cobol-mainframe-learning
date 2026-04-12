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


  // ========== 第 2 階段：COBOL 程式結構 (新增 2026-04-10) ==========
  {
    id: 'cobol-structure',
    title: 'COBOL 程式結構',
    titleEn: 'COBOL Program Structure',
    icon: '📐',
    stage: 2,
    context: '了解 COBOL 程式的四大 DIVISION',
    contextEn: 'Understanding the four DIVISIONs of COBOL programs',
    roles: [
      { id: 'ba', name: '業務分析師', nameEn: 'Business Analyst', avatar: '👔' },
      { id: 'dev', name: '程式設計師', nameEn: 'Developer', avatar: '💻' },
    ],
    concepts: [
      {
        term: 'DIVISION',
        termEn: 'DIVISION',
        explanation: 'COBOL 程式分為四大區塊：IDENTIFICATION、ENVIRONMENT、DATA、PROCEDURE',
        analogy: '就像寫一本書：封面資訊、出版環境、目錄索引、正文內容',
      },
      {
        term: 'IDENTIFICATION DIVISION',
        termEn: 'IDENTIFICATION DIVISION',
        explanation: '程式的身份識別區，包含程式名稱、作者、日期等資訊',
        analogy: '就像書的封面，寫明書名和作者',
      },
      {
        term: 'DATA DIVISION',
        termEn: 'DATA DIVISION',
        explanation: '定義程式中使用的所有變數和資料結構',
        analogy: '就像書的目錄和索引，定義所有會用到的資料',
      },
      {
        term: 'PROCEDURE DIVISION',
        termEn: 'PROCEDURE DIVISION',
        explanation: '程式的邏輯處理區，包含所有的執行指令',
        analogy: '就像書的正文章節，實際的內容和流程',
      },
    ],
    dialogues: [
      { roleId: 'ba', text: 'COBOL 程式看起來很長，有什麼結構規則嗎？' },
      { roleId: 'dev', text: 'COBOL 有固定的四大 DIVISION，就像寫文章要有標題、前言、正文、結語。' },
      { roleId: 'dev', text: '第一個是 IDENTIFICATION DIVISION，寫程式名稱和基本資訊。' },
      { roleId: 'ba', text: '那 ENVIRONMENT DIVISION 呢？' },
      { roleId: 'dev', text: '那是環境設定，告訴系統這支程式要在哪台機器跑、用什麼檔案。' },
      { roleId: 'dev', text: 'DATA DIVISION 最重要，定義所有變數。就像 VBA 的 Dim 宣告，但要詳細得多。' },
      { roleId: 'ba', text: 'PIC 是什麼意思？' },
      { roleId: 'dev', text: 'PIC (Picture) 定義資料格式。例如 PIC 9(5) 是 5 位數字，PIC X(20) 是 20 個字元。' },
      { roleId: 'dev', text: '最後 PROCEDURE DIVISION 是邏輯區，寫 IF、PERFORM、MOVE 等指令。' },
      { roleId: 'ba', text: '了解了！就像 VBA 的 Sub 裡面寫程式碼。' },
    ],
    codeExamples: [
      {
        title: '完整 COBOL 程式結構',
        language: 'cobol',
        code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. CLMINTRT.
       AUTHOR.  JASON FAN.
       DATE-WRITTEN.  2026-04-10.
      * CALCULATE INTEREST FOR CLM ACCOUNTS
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ACCT-FILE ASSIGN TO ACCTFILE.
       DATA DIVISION.
       FILE SECTION.
       FD  ACCT-FILE.
       01  ACCT-RECORD.
           05  ACCT-KEY          PIC X(10).
           05  ACCT-BALANCE      PIC S9(13)V99 COMP-3.
       WORKING-STORAGE SECTION.
       01  WS-EOF            PIC X VALUE 'N'.
       PROCEDURE DIVISION.
       0000-MAIN.
           OPEN INPUT ACCT-FILE
           PERFORM UNTIL WS-EOF = 'Y'
               READ ACCT-FILE NEXT RECORD
                   AT END MOVE 'Y' TO WS-EOF
                   NOT AT END DISPLAY ACCT-KEY
               END-READ
           END-PERFORM
           CLOSE ACCT-FILE
           STOP RUN.`,
        explanation: 'COBOL 程式必須依序包含 IDENTIFICATION、ENVIRONMENT、DATA、PROCEDURE 四個 DIVISION',
        annotations: [
          { line: 1, text: 'IDENTIFICATION DIVISION：程式識別資訊' },
          { line: 5, text: 'ENVIRONMENT DIVISION：環境設定' },
          { line: 9, text: 'DATA DIVISION：資料定義區' },
          { line: 15, text: 'PROCEDURE DIVISION：邏輯處理區' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        type: 'single',
        question: 'COBOL 程式中，定義變數的 DIVISION 是哪一個？',
        options: [
          { id: 'a', text: 'IDENTIFICATION DIVISION' },
          { id: 'b', text: 'ENVIRONMENT DIVISION' },
          { id: 'c', text: 'DATA DIVISION' },
          { id: 'd', text: 'PROCEDURE DIVISION' },
        ],
        correctAnswer: 'c',
        explanation: 'DATA DIVISION 用於定義程式中使用的所有資料和變數。',
      },
    ],
  },

  // ========== 第 2 階段：COBOL 資料型別 (新增 2026-04-10) ==========
  {
    id: 'cobol-data-types',
    title: 'COBOL 資料型別',
    titleEn: 'COBOL Data Types',
    icon: '🔢',
    stage: 2,
    context: '學習 PIC 定義與 COMP-3 壓縮格式',
    contextEn: 'Learning PIC definitions and COMP-3 packed format',
    roles: [
      { id: 'ba', name: '業務分析師', nameEn: 'Business Analyst', avatar: '👔' },
      { id: 'dev', name: '程式設計師', nameEn: 'Developer', avatar: '💻' },
    ],
    concepts: [
      {
        term: 'PIC (Picture)',
        termEn: 'PIC Clause',
        explanation: '定義資料欄位的格式和長度，9 代表數字，X 代表字元，V 代表隱含小數點',
        analogy: '就像 Excel 的儲存格格式設定：數字、文字、貨幣',
      },
      {
        term: 'COMP-3 (Packed Decimal)',
        termEn: 'COMP-3',
        explanation: '壓縮十進位格式，每個數字佔 4 bits，最後一個 byte 存符號，節省空間',
        analogy: '就像把兩個數字「塞」進一個 byte，省空間但計算時要解壓',
      },
      {
        term: 'S9',
        termEn: 'Signed Numeric',
        explanation: '帶符號的數字，S 表示正負號，通常與 COMP-3 一起使用',
        analogy: '就像 Excel 的會計格式，可以顯示正負數',
      },
      {
        term: 'FILLER',
        termEn: 'FILLER',
        explanation: '佔位用的欄位，程式中不會使用，用於對齊或保留空間',
        analogy: '就像文件中的空白行，佔位置但沒有內容',
      },
    ],
    dialogues: [
      { roleId: 'ba', text: '我看到的 Copybook 裡有很多 PIC 9、PIC X，這是什麼意思？' },
      { roleId: 'dev', text: 'PIC 是 Picture 的縮寫，定義資料格式。PIC 9 是數字，PIC X 是字元。' },
      { roleId: 'dev', text: '例如 PIC 9(13)V99 表示 13 位整數、2 位小數的數字，V 是隱含的小數點。' },
      { roleId: 'ba', text: '那 COMP-3 是什麼？' },
      { roleId: 'dev', text: 'COMP-3 是壓縮格式，把兩個數字「塞」進一個 byte，最後一個 byte 存正負號。' },
      { roleId: 'dev', text: '銀行系統常用 COMP-3 存金額，因為省空間又精確。' },
      { roleId: 'ba', text: 'S9 又是什麼？' },
      { roleId: 'dev', text: 'S 表示 Signed（帶符號），可以存正負數。例如帳戶餘額可能是負數（透支）。' },
      { roleId: 'dev', text: '所以 PIC S9(13)V99 COMP-3 就是：帶符號的 13 位整數 2 位小數，壓縮格式。' },
      { roleId: 'ba', text: '了解了！這樣看 Copybook 就清楚多了。' },
    ],
    codeExamples: [
      {
        title: 'COBOL 資料型別範例',
        language: 'cobol',
        code: `       DATA DIVISION.
       WORKING-STORAGE SECTION.
      * 字元型別
       01  WS-CUST-NAME      PIC X(50).
       01  WS-ACCT-NO        PIC X(10).
      * 數字型別
       01  WS-AGE            PIC 9(03).
       01  WS-COUNT          PIC 9(05) VALUE 0.
      * 帶符號壓縮數字（常用於金額）
       01  WS-BALANCE        PIC S9(13)V99 COMP-3.
       01  WS-INTEREST       PIC S9(09)V999 COMP-3.
      * 隱含小數點
       01  WS-RATE           PIC 9V9999.
      * 條件名稱 (88 Level)
       01  WS-STATUS         PIC X(02).
           88  SUCCESS       VALUE '00'.
           88  NOT-FOUND     VALUE '01'.
           88  ERROR         VALUE '99'.
      * FILLER 佔位
       01  WS-HEADER.
           05  FILLER        PIC X(10) VALUE '=========='.
           05  WS-TITLE      PIC X(20).
           05  FILLER        PIC X(10) VALUE '=========='.`,
        explanation: 'PIC 定義資料格式，COMP-3 是壓縮十進位，S9 是帶符號數字，FILLER 是佔位欄位',
        annotations: [
          { line: 4, text: 'PIC X：字元型別' },
          { line: 8, text: 'PIC 9：數字型別' },
          { line: 11, text: 'S9 COMP-3：帶符號壓縮數字' },
          { line: 16, text: '88 Level：條件名稱' },
          { line: 22, text: 'FILLER：佔位用欄位' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q5-1',
        type: 'single',
        question: 'PIC S9(13)V99 COMP-3 適合用來儲存什麼資料？',
        options: [
          { id: 'a', text: '客戶姓名' },
          { id: 'b', text: '帳戶餘額（可能為負數）' },
          { id: 'c', text: '帳號' },
          { id: 'd', text: '日期格式' },
        ],
        correctAnswer: 'b',
        explanation: 'S9 表示帶符號數字（可正可負），V99 表示 2 位小數，COMP-3 是壓縮格式，適合儲存金額。',
      },
      {
        id: 'q5-2',
        type: 'single',
        question: 'COMP-3 的主要優點是什麼？',
        options: [
          { id: 'a', text: '計算速度更快' },
          { id: 'b', text: '節省儲存空間' },
          { id: 'c', text: '更容易閱讀' },
          { id: 'd', text: '支援更多小數位' },
        ],
        correctAnswer: 'b',
        explanation: 'COMP-3 把兩個數字壓縮到一個 byte，最後一個 byte 存符號，可以節省約一半的儲存空間。',
      },
    ],
  },

  // ========== 第 2 階段：COBOL 條件與迴圈 (新增 2026-04-12) ==========
  {
    id: 'cobol-control-flow',
    title: 'COBOL 條件與迴圈',
    titleEn: 'COBOL Conditions and Loops',
    icon: '🔀',
    stage: 2,
    context: '學習 IF、EVALUATE、PERFORM 等控制流程指令',
    contextEn: 'Learning IF, EVALUATE, PERFORM control flow statements',
    roles: [
      { id: 'ba', name: '業務分析師', nameEn: 'Business Analyst', avatar: '👔' },
      { id: 'dev', name: '程式設計師', nameEn: 'Developer', avatar: '💻' },
    ],
    concepts: [
      {
        term: 'IF 條件判斷',
        termEn: 'IF Statement',
        explanation: '根據條件執行不同邏輯，支援 AND、OR、NOT 組合條件',
        analogy: '就像 Excel 的 IF 函數：如果條件成立就做 A，否則做 B',
      },
      {
        term: 'EVALUATE',
        termEn: 'EVALUATE Statement',
        explanation: '多條件分支判斷，類似其他語言的 switch-case',
        analogy: '就像選擇題，根據不同選項執行不同動作',
      },
      {
        term: 'PERFORM',
        termEn: 'PERFORM Statement',
        explanation: '執行段落或迴圈，支援 UNTIL、VARYING、TIMES 等變化',
        analogy: '就像 VBA 的 For Loop 或 Do While，重複執行某段程式碼',
      },
      {
        term: '段落 (Paragraph)',
        termEn: 'Paragraph',
        explanation: 'PROCEDURE DIVISION 中的程式區塊，以句點結尾，可被 PERFORM 呼叫',
        analogy: '就像 VBA 的 Sub 程序，可以被其他程式呼叫執行',
      },
    ],
    dialogues: [
      { roleId: 'ba', text: 'COBOL 怎麼寫條件判斷？像 VBA 的 If Then Else 嗎？' },
      { roleId: 'dev', text: '很像！COBOL 用 IF...THEN...ELSE...END-IF，記得要寫 END-IF 結束。' },
      { roleId: 'dev', text: '例如：IF WS-BALANCE > 0 THEN ADD WS-AMOUNT TO WS-TOTAL ELSE MOVE 0 TO WS-TOTAL END-IF。' },
      { roleId: 'ba', text: '那有多個條件怎麼辦？像 VBA 的 Select Case？' },
      { roleId: 'dev', text: '用 EVALUATE，這是 COBOL 最強大的多條件判斷。可以根據一個值做很多分支。' },
      { roleId: 'dev', text: '例如：EVALUATE WS-STATUS WHEN 00 DISPLAY 成功 WHEN 01 DISPLAY 找不到 WHEN OTHER DISPLAY 錯誤 END-EVALUATE。' },
      { roleId: 'ba', text: '迴圈呢？怎麼重複執行？' },
      { roleId: 'dev', text: '用 PERFORM。最常用的是 PERFORM UNTIL，類似 Do While。' },
      { roleId: 'dev', text: '還有 PERFORM VARYING，類似 For Loop：PERFORM VARYING WS-I FROM 1 BY 1 UNTIL WS-I > 10。' },
      { roleId: 'ba', text: 'PERFORM 後面接的是什麼？' },
      { roleId: 'dev', text: '接的是段落名稱 (Paragraph)。COBOL 把程式分成很多段落，每個段落做一件事，然後用 PERFORM 呼叫。' },
    ],
    codeExamples: [
      {
        title: 'IF 與 EVALUATE 範例',
        language: 'cobol',
        code: `       PROCEDURE DIVISION.
       0000-MAIN.
           PERFORM 1000-CHECK-BALANCE
           PERFORM 2000-PROCESS-STATUS
           STOP RUN.

       1000-CHECK-BALANCE.
      *    IF 條件判斷
           IF WS-BALANCE > 1000000
               DISPLAY 'VIP 客戶'
               MOVE 'A' TO WS-CUST-TYPE
           ELSE IF WS-BALANCE > 0
               DISPLAY '一般客戶'
               MOVE 'B' TO WS-CUST-TYPE
           ELSE
               DISPLAY '透支客戶'
               MOVE 'C' TO WS-CUST-TYPE
           END-IF.

       2000-PROCESS-STATUS.
      *    EVALUATE 多條件分支
           EVALUATE WS-STATUS
               WHEN '00'
                   DISPLAY '交易成功'
                   PERFORM 3000-UPDATE-RECORD
               WHEN '01'
                   DISPLAY '記錄不存在'
                   PERFORM 4000-CREATE-RECORD
               WHEN '51'
                   DISPLAY '餘額不足'
                   MOVE 'REJECT' TO WS-RESULT
               WHEN '99'
                   DISPLAY '系統錯誤'
                   PERFORM 9000-ERROR-HANDLER
               WHEN OTHER
                   DISPLAY '未知狀態: ' WS-STATUS
           END-EVALUATE.

       3000-UPDATE-RECORD.
           DISPLAY '更新記錄中...'.

       4000-CREATE-RECORD.
           DISPLAY '建立新記錄...'.

       9000-ERROR-HANDLER.
           DISPLAY '錯誤處理程序'.`,
        explanation: 'IF 用於條件判斷，EVALUATE 用於多條件分支，段落 (Paragraph) 用於組織程式碼',
        annotations: [
          { line: 7, text: 'IF...THEN...ELSE...END-IF 結構' },
          { line: 19, text: 'EVALUATE...WHEN...END-EVALUATE 結構' },
          { line: 22, text: 'WHEN 指定特定值' },
          { line: 31, text: 'WHEN OTHER 處理其他所有情況' },
          { line: 37, text: '段落以句點結尾，可被 PERFORM 呼叫' },
        ],
      },
      {
        title: 'PERFORM 迴圈範例',
        language: 'cobol',
        code: `       PROCEDURE DIVISION.
       0000-MAIN.
      *    PERFORM UNTIL - 類似 Do While
           MOVE 1 TO WS-COUNTER
           PERFORM UNTIL WS-COUNTER > 10
               DISPLAY '第 ' WS-COUNTER ' 次迴圈'
               ADD 1 TO WS-COUNTER
           END-PERFORM

      *    PERFORM VARYING - 類似 For Loop
           PERFORM VARYING WS-I FROM 1 BY 1 UNTIL WS-I > 5
               COMPUTE WS-SQUARE = WS-I * WS-I
               DISPLAY WS-I ' 的平方是 ' WS-SQUARE
           END-PERFORM

      *    PERFORM TIMES - 固定次數
           PERFORM 3 TIMES
               DISPLAY '重複執行 3 次'
           END-PERFORM

      *    PERFORM 呼叫其他段落
           PERFORM 1000-PROCESS-FILE
           PERFORM 2000-GENERATE-REPORT
           STOP RUN.

       1000-PROCESS-FILE.
           OPEN INPUT ACCT-FILE
           PERFORM UNTIL WS-EOF = 'Y'
               READ ACCT-FILE NEXT RECORD
                   AT END
                       MOVE 'Y' TO WS-EOF
                   NOT AT END
                       ADD 1 TO WS-TOTAL-COUNT
                       PERFORM 1100-PROCESS-RECORD
               END-READ
           END-PERFORM
           CLOSE ACCT-FILE
           DISPLAY '總共處理 ' WS-TOTAL-COUNT ' 筆記錄'.

       1100-PROCESS-RECORD.
      *    處理單筆記錄的邏輯
           IF ACCT-BALANCE > 0
               ADD ACCT-BALANCE TO WS-TOTAL-AMT
           END-IF.

       2000-GENERATE-REPORT.
           DISPLAY '產生報表中...'
           DISPLAY '總金額: ' WS-TOTAL-AMT.`,
        explanation: 'PERFORM UNTIL 類似 Do While，PERFORM VARYING 類似 For Loop，PERFORM TIMES 重複固定次數',
        annotations: [
          { line: 3, text: 'PERFORM UNTIL：條件成立時持續迴圈' },
          { line: 9, text: 'PERFORM VARYING：從初始值遞增/遞減到終值' },
          { line: 14, text: 'PERFORM TIMES：固定次數迴圈' },
          { line: 23, text: 'READ...AT END...NOT AT END：檔案讀取迴圈' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q6-1',
        type: 'single',
        question: 'COBOL 中，類似 VBA For Loop 的語法是什麼？',
        options: [
          { id: 'a', text: 'IF...THEN' },
          { id: 'b', text: 'PERFORM UNTIL' },
          { id: 'c', text: 'PERFORM VARYING' },
          { id: 'd', text: 'EVALUATE' },
        ],
        correctAnswer: 'c',
        explanation: 'PERFORM VARYING 類似 For Loop，可以指定起始值、遞增量和終止條件。',
      },
      {
        id: 'q6-2',
        type: 'single',
        question: 'EVALUATE 語句相當於其他程式語言的什麼？',
        options: [
          { id: 'a', text: 'If...Else' },
          { id: 'b', text: 'Switch...Case' },
          { id: 'c', text: 'For Loop' },
          { id: 'd', text: 'Try...Catch' },
        ],
        correctAnswer: 'b',
        explanation: 'EVALUATE 類似 switch-case，用於多條件分支判斷，比多個 IF-ELSE 更清晰。',
      },
      {
        id: 'q6-3',
        type: 'code-reading',
        question: '以下程式碼會執行幾次 DISPLAY？PERFORM VARYING WS-I FROM 1 BY 2 UNTIL WS-I > 10  DISPLAY WS-I END-PERFORM',
        options: [
          { id: 'a', text: '5 次' },
          { id: 'b', text: '10 次' },
          { id: 'c', text: '無限迴圈' },
          { id: 'd', text: '0 次' },
        ],
        correctAnswer: 'a',
        explanation: '從 1 開始，每次加 2，直到大於 10。會顯示 1, 3, 5, 7, 9，共 5 次。',
      },
    ],
  },
];
