import { useState } from 'react'
import './CodeLab.css'

function CodeLab() {
  const [activeTab, setActiveTab] = useState<'editor' | 'jcl' | 'copybook'>('editor')

  const cobolTemplate = `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLOWRLD.
      * 你的第一個 COBOL 程式
       
       PROCEDURE DIVISION.
           DISPLAY 'Hello, Mainframe World!'
           STOP RUN.`

  const jclTemplate = `//HELLO JOB (ACCT),'HELLO WORLD',CLASS=A
//STEP1   EXEC PGM=HELLOWRLD
//SYSOUT  DD SYSOUT=*
//SYSPRINT DD SYSOUT=*`

  return (
    <div className="code-lab">
      <header className="page-header">
        <h1 className="page-title">💻 程式碼實驗室</h1>
        <p className="page-desc">練習 COBOL、JCL 和 Copybook 的互動環境</p>
      </header>

      <div className="lab-tabs">
        <button 
          className={`lab-tab ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          COBOL 編輯器
        </button>
        <button 
          className={`lab-tab ${activeTab === 'jcl' ? 'active' : ''}`}
          onClick={() => setActiveTab('jcl')}
        >
          JCL 模擬器
        </button>
        <button 
          className={`lab-tab ${activeTab === 'copybook' ? 'active' : ''}`}
          onClick={() => setActiveTab('copybook')}
        >
          Copybook 工具
        </button>
      </div>

      <div className="lab-content">
        {activeTab === 'editor' && (
          <div className="editor-panel">
            <div className="editor-sidebar">
              <h3>📋 練習題目</h3>
              <div className="exercise-list">
                <div className="exercise-item active">
                  <span className="exercise-num">01</span>
                  <span className="exercise-name">Hello World</span>
                </div>
                <div className="exercise-item">
                  <span className="exercise-num">02</span>
                  <span className="exercise-name">變數宣告</span>
                </div>
                <div className="exercise-item">
                  <span className="exercise-num">03</span>
                  <span className="exercise-name">條件判斷</span>
                </div>
                <div className="exercise-item locked">
                  <span className="exercise-num">04</span>
                  <span className="exercise-name">迴圈處理 🔒</span>
                </div>
              </div>
            </div>
            <div className="editor-main">
              <div className="editor-header">
                <span className="editor-filename">HELLOWRLD.cobol</span>
                <div className="editor-actions">
                  <button className="editor-btn">📝 格式化</button>
                  <button className="editor-btn primary">▶ 執行</button>
                </div>
              </div>
              <textarea 
                className="code-editor"
                defaultValue={cobolTemplate}
                spellCheck={false}
              />
              <div className="editor-console">
                <div className="console-header">
                  <span>終端機輸出</span>
                  <button className="console-clear">清除</button>
                </div>
                <div className="console-output">
                  <span className="console-prompt">$</span>
                  <span className="console-cursor">_</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jcl' && (
          <div className="jcl-panel">
            <div className="jcl-info">
              <h3>📝 JCL (Job Control Language)</h3>
              <p>用來告訴主機「去哪裡拿檔案、執行哪支程式、輸出什麼報表」</p>
            </div>
            <div className="jcl-editor-container">
              <textarea 
                className="code-editor jcl"
                defaultValue={jclTemplate}
                spellCheck={false}
              />
              <div className="jcl-reference">
                <h4>常用 JCL Statement</h4>
                <ul className="reference-list">
                  <li><code>//JOBNAME</code> - 定義 Job 名稱</li>
                  <li><code>//STEPNAME</code> - 定義執行步驟</li>
                  <li><code>EXEC PGM=</code> - 指定執行程式</li>
                  <li><code>//DD</code> - 定義資料檔案</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'copybook' && (
          <div className="copybook-panel">
            <h3>📋 Copybook 結構視覺化</h3>
            <p>將 COBOL 資料結構轉換為易懂的圖表</p>
            <div className="copybook-demo">
              <div className="copybook-input">
                <h4>輸入 Copybook</h4>
                <textarea 
                  className="code-editor"
                  defaultValue={`01  ACCT-RECORD.
    05 ACCT-NO           PIC X(10).
    05 ACCT-NAME         PIC X(30).
    05 ACCT-BALANCE      PIC S9(13)V99 COMP-3.
    05 ACCT-STATUS       PIC X(01).`}
                  spellCheck={false}
                />
              </div>
              <div className="copybook-output">
                <h4>結構圖</h4>
                <div className="structure-tree">
                  <div className="tree-node level-1">
                    <span className="node-name">ACCT-RECORD</span>
                    <span className="node-size">總長度: 50 bytes</span>
                  </div>
                  <div className="tree-children">
                    <div className="tree-node level-2">
                      <span className="node-name">ACCT-NO</span>
                      <span className="node-type">PIC X(10)</span>
                      <span className="node-bytes">10 bytes</span>
                    </div>
                    <div className="tree-node level-2">
                      <span className="node-name">ACCT-NAME</span>
                      <span className="node-type">PIC X(30)</span>
                      <span className="node-bytes">30 bytes</span>
                    </div>
                    <div className="tree-node level-2">
                      <span className="node-name">ACCT-BALANCE</span>
                      <span className="node-type">PIC S9(13)V99 COMP-3</span>
                      <span className="node-bytes">8 bytes (packed)</span>
                    </div>
                    <div className="tree-node level-2">
                      <span className="node-name">ACCT-STATUS</span>
                      <span className="node-type">PIC X(01)</span>
                      <span className="node-bytes">1 byte</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeLab
