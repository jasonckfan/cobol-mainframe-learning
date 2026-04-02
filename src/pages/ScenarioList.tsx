import { Link } from 'react-router-dom'
import { initialScenarios } from '../data/scenarios'
import './ScenarioList.css'

function ScenarioList() {
  const stages = [
    { num: 1, name: 'Mainframe 基礎大圖', color: '#054ADA' },
    { num: 2, name: 'COBOL 基礎語法', color: '#009d9a' },
    { num: 3, name: 'JCL 與檔案處理', color: '#8a3ffc' },
    { num: 4, name: 'CLM 銀行實務', color: '#fa4d56' },
    { num: 5, name: 'BA 溝通術', color: '#f1c21b' },
    { num: 6, name: '實戰模擬', color: '#42be65' },
  ]

  const getScenariosByStage = (stageNum: number) => {
    return initialScenarios.filter(s => s.stage === stageNum)
  }

  return (
    <div className="scenario-list">
      <header className="page-header">
        <h1 className="page-title">📚 情境學習</h1>
        <p className="page-desc">選擇一個情境開始學習，建議按順序完成</p>
      </header>

      <div className="stages-container">
        {stages.map((stage) => {
          const stageScenarios = getScenariosByStage(stage.num)
          return (
            <section key={stage.num} className="stage-section">
              <div 
                className="stage-header"
                style={{ borderLeftColor: stage.color }}
              >
                <div className="stage-badge" style={{ backgroundColor: stage.color }}>
                  階段 {stage.num}
                </div>
                <h2 className="stage-title">{stage.name}</h2>
                <span className="stage-count">{stageScenarios.length} 個情境</span>
              </div>
              
              <div className="scenarios-grid">
                {stageScenarios.map((scenario) => (
                  <Link 
                    key={scenario.id}
                    to={`/scenarios/${scenario.id}`}
                    className="scenario-card"
                  >
                    <div className="scenario-icon">{scenario.icon}</div>
                    <div className="scenario-content">
                      <h3 className="scenario-title">{scenario.title}</h3>
                      <p className="scenario-title-en">{scenario.titleEn}</p>
                      <p className="scenario-context">{scenario.context}</p>
                      <div className="scenario-meta">
                        <span className="scenario-concepts">
                          {scenario.concepts.length} 個概念
                        </span>
                        <span className="scenario-dialogues">
                          {scenario.dialogues.length} 段對話
                        </span>
                      </div>
                    </div>
                    <div className="scenario-arrow">→</div>
                  </Link>
                ))}
                
                {stageScenarios.length === 0 && (
                  <div className="empty-stage">
                    <span className="empty-icon">🚧</span>
                    <span className="empty-text">情境開發中...</span>
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default ScenarioList
