import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { initialScenarios } from '../data/scenarios'
import CodeBlock from '../components/CodeBlock'
import DialogueView from '../components/DialogueView'
import QuizPanel from '../components/QuizPanel'
import './ScenarioDetail.css'

function ScenarioDetail() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<'concepts' | 'dialogues' | 'code' | 'quiz'>('concepts')
  
  const scenario = initialScenarios.find(s => s.id === id)
  
  if (!scenario) {
    return (
      <div className="not-found">
        <h1>😕 找不到情境</h1>
        <p>該學習情境不存在或正在開發中</p>
        <Link to="/scenarios" className="back-link">← 返回情境列表</Link>
      </div>
    )
  }

  const stageNames = [
    '',
    'Mainframe 基礎大圖',
    'COBOL 基礎語法',
    'JCL 與檔案處理',
    'CLM 銀行實務',
    'BA 溝通術',
    '實戰模擬',
  ]

  return (
    <div className="scenario-detail">
      {/* Header */}
      <header className="detail-header">
        <div className="detail-meta">
          <Link to="/scenarios" className="back-link">← 返回列表</Link>
          <span className="stage-badge">階段 {scenario.stage}</span>
        </div>
        <div className="detail-title-section">
          <span className="detail-icon">{scenario.icon}</span>
          <div className="detail-titles">
            <h1 className="detail-title">{scenario.title}</h1>
            <p className="detail-subtitle">{scenario.titleEn}</p>
          </div>
        </div>
        <p className="detail-context">{scenario.context}</p>
      </header>

      {/* Tabs */}
      <div className="detail-tabs">
        <button 
          className={`tab ${activeTab === 'concepts' ? 'active' : ''}`}
          onClick={() => setActiveTab('concepts')}
        >
          💡 核心概念 ({scenario.concepts.length})
        </button>
        <button 
          className={`tab ${activeTab === 'dialogues' ? 'active' : ''}`}
          onClick={() => setActiveTab('dialogues')}
        >
          💬 情境對話 ({scenario.dialogues.length})
        </button>
        <button 
          className={`tab ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          💻 程式碼範例 ({scenario.codeExamples.length})
        </button>
        <button 
          className={`tab ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          📝 測驗 ({scenario.quiz.length})
        </button>
      </div>

      {/* Content */}
      <div className="detail-content">
        {activeTab === 'concepts' && (
          <div className="concepts-panel">
            <h2 className="panel-title">核心概念</h2>
            <div className="concepts-list">
              {scenario.concepts.map((concept, index) => (
                <div key={index} className="concept-card">
                  <div className="concept-header">
                    <h3 className="concept-term">{concept.term}</h3>
                    <span className="concept-term-en">{concept.termEn}</span>
                  </div>
                  {concept.analogy && (
                    <div className="concept-analogy">
                      <span className="analogy-label">💭 白話比喻：</span>
                      {concept.analogy}
                    </div>
                  )}
                  <p className="concept-explanation">{concept.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dialogues' && (
          <DialogueView 
            dialogues={scenario.dialogues} 
            roles={scenario.roles}
          />
        )}

        {activeTab === 'code' && (
          <div className="code-panel">
            <h2 className="panel-title">程式碼範例</h2>
            <div className="code-examples">
              {scenario.codeExamples.map((example, index) => (
                <CodeBlock key={index} example={example} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <QuizPanel questions={scenario.quiz} />
        )}
      </div>

      {/* Navigation */}
      <footer className="detail-footer">
        <Link to="/scenarios" className="btn-secondary">
          ← 返回列表
        </Link>
        <button className="btn-primary">
          標記為完成 ✅
        </button>
      </footer>
    </div>
  )
}

export default ScenarioDetail
