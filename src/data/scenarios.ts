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
          { id: 'd', text: '發送電子郵件通知'