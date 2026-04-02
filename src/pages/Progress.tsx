import { initialScenarios } from '../data/scenarios'
import './Progress.css'

function Progress() {
  const stages = [
    { num: 1, name: 'Mainframe 基礎大圖', total: 0, completed: 0 },
    { num: 2, name: 'COBOL 基礎語法', total: 0, completed: 0 },
    { num: 3, name: 'JCL 與檔案處理', total: 0, completed: 0 },
    { num: 4, name: 'CLM 銀行實務', total: 0, completed: 0 },
    { num: 5, name: 'BA 溝通術', total: 0, completed: 0 },
    { num: 6, name: '實戰模擬', total: 0, completed: 0 },
  ]

  // Calculate totals per stage
  initialScenarios.forEach(s => {
    const stage = stages.find(st => st.num === s.stage)
    if (stage) {
      stage.total++
    }
  })

  stages[0].completed = 1 // Mock data

  const totalScenarios = initialScenarios.length
  const completedScenarios = stages.reduce((sum, s) => sum + s.completed, 0)
  const overallProgress = Math.round((completedScenarios / totalScenarios) * 100)

  return (
    <div className="progress-page">
      <header className="page-header">
        <h1 className="page-title">📊 學習進度</h1>
        <p className="page-desc">追蹤你的六階段學習旅程</p>
      </header>

      <div className="overall-progress">
        <div className="progress-circle">
          <svg viewBox="0 0 100 100" className="progress-ring">
            <circle
              className="progress-ring-bg"
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className="progress-ring-fill"
              cx="50"
              cy="50"
              r="45"
              style={{
                strokeDasharray: `${2 * Math.PI * 45}`,
                strokeDashoffset: `${2 * Math.PI * 45 * (1 - overallProgress / 100)}`,
              }}
            />
          </svg>
          <div className="progress-text">
            <span className="progress-percent">{overallProgress}%</span>
            <span className="progress-label">總進度</span>
          </div>
        </div>
        <div className="progress-summary">
          <div className="summary-item">
            <span className="summary-value">{completedScenarios}</span>
            <span className="summary-label">已完成情境</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">{totalScenarios}</span>
            <span className="summary-label">總情境數</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">0</span>
            <span className="summary-label">測驗通過</span>
          </div>
        </div>
      </div>

      <div className="stages-progress">
        <h2 className="section-title">各階段進度</h2>
        <div className="stages-list">
          {stages.map(stage => {
            const progress = stage.total > 0 
              ? Math.round((stage.completed / stage.total) * 100) 
              : 0
            
            return (
              <div key={stage.num} className="stage-progress-card">
                <div className="stage-info">
                  <div className="stage-num-badge">{stage.num}</div>
                  <div className="stage-details">
                    <h3 className="stage-name">{stage.name}</h3>
                    <span className="stage-count">
                      {stage.completed} / {stage.total} 情境
                    </span>
                  </div>
                </div>
                <div className="stage-bar">
                  <div className="stage-progress-bar">
                    <div 
                      className="stage-progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="stage-percent">{progress}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="achievements">
        <h2 className="section-title">🏆 成就徽章</h2>
        <div className="badges-grid">
          <div className="badge-item locked">
            <span className="badge-icon">🌟</span>
            <span className="badge-name">初學者</span>
            <span className="badge-desc">完成第 1 階段</span>
          </div>
          <div className="badge-item locked">
            <span className="badge-icon">💻</span>
            <span className="badge-name">程式碼新手</span>
            <span className="badge-desc">完成第 2 階段</span>
          </div>
          <div className="badge-item locked">
            <span className="badge-icon">📁</span>
            <span className="badge-name">檔案管理員</span>
            <span className="badge-desc">完成第 3 階段</span>
          </div>
          <div className="badge-item locked">
            <span className="badge-icon">💰</span>
            <span className="badge-name">銀行專家</span>
            <span className="badge-desc">完成第 4 階段</span>
          </div>
          <div className="badge-item locked">
            <span className="badge-icon">🤝</span>
            <span className="badge-name">溝通大師</span>
            <span className="badge-desc">完成第 5 階段</span>
          </div>
          <div className="badge-item locked">
            <span className="badge-icon">🎓</span>
            <span className="badge-name">畢業生</span>
            <span className="badge-desc">完成所有階段</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress
