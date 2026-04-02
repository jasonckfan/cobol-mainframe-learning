import { useState } from 'react'
import { initialScenarios } from '../data/scenarios'
import './Quiz.css'

function Quiz() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  
  const totalQuestions = initialScenarios.reduce((sum, s) => sum + s.quiz.length, 0)

  return (
    <div className="quiz-page">
      <header className="page-header">
        <h1 className="page-title">📝 測驗中心</h1>
        <p className="page-desc">檢驗你的學習成果，共 {totalQuestions} 道題目</p>
      </header>

      <div className="quiz-modes">
        <div className="quiz-mode-card featured">
          <div className="mode-icon">🎯</div>
          <h3 className="mode-title">快速測驗</h3>
          <p className="mode-desc">隨機 10 題，快速檢驗基本概念</p>
          <button className="mode-btn">開始測驗</button>
        </div>
        
        <div className="quiz-mode-card">
          <div className="mode-icon">📚</div>
          <h3 className="mode-title">情境測驗</h3>
          <p className="mode-desc">選擇特定情境進行深入測驗</p>
          <div className="scenario-select">
            <select 
              className="select-input"
              value={selectedScenario || ''}
              onChange={(e) => setSelectedScenario(e.target.value || null)}
            >
              <option value="">選擇情境...</option>
              {initialScenarios.map(s => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.quiz.length} 題)
                </option>
              ))}
            </select>
            <button 
              className="mode-btn"
              disabled={!selectedScenario}
            >
              開始
            </button>
          </div>
        </div>
        
        <div className="quiz-mode-card">
          <div className="mode-icon">🏆</div>
          <h3 className="mode-title">期末考試</h3>
          <p className="mode-desc">所有情境綜合測驗，共 {totalQuestions} 題</p>
          <button className="mode-btn">挑戰</button>
        </div>
      </div>

      <div className="quiz-stats">
        <h2 className="stats-title">📊 測驗統計</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">0</span>
            <span className="stat-label">已完成測驗</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">0%</span>
            <span className="stat-label">平均正確率</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">0</span>
            <span className="stat-label">連續答對</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{totalQuestions}</span>
            <span className="stat-label">總題目數</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
