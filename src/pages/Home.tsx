import { Link } from 'react-router-dom'
import { initialScenarios } from '../data/scenarios'
import './Home.css'

function Home() {
  const stages = [
    { num: 1, name: 'Mainframe 基礎', icon: '🖥️', desc: 'Batch vs Online、CICS、JCL' },
    { num: 2, name: 'COBOL 語法', icon: '💻', desc: '變數、條件、迴圈' },
    { num: 3, name: '檔案與批次', icon: '📁', desc: 'JCL、Copybook、VSAM' },
    { num: 4, name: 'CLM 銀行實務', icon: '💰', desc: '資金池、掃撥、計息' },
    { num: 5, name: 'BA 溝通術', icon: '🤝', desc: '需求分析、精準提問' },
    { num: 6, name: '實戰模擬', icon: '🎯', desc: '角色扮演、案例研究' },
  ]

  const completedScenarios = 1 // TODO: Get from localStorage
  const totalScenarios = initialScenarios.length
  const progress = Math.round((completedScenarios / totalScenarios) * 100)

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            學習 <span className="terminal-text">COBOL</span> 與 <span className="terminal-text">Mainframe</span>
          </h1>
          <p className="hero-subtitle">
            為銀行業務分析師設計的互動式學習平台
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{initialScenarios.length}</span>
              <span className="stat-label">學習情境</span>
            </div>
            <div className="stat">
              <span className="stat-number">6</span>
              <span className="stat-label">學習階段</span>
            </div>
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">實戰案例</span>
            </div>
          </div>
          <Link to="/scenarios" className="hero-cta">
            開始學習 →
          </Link>
        </div>
      </section>

      {/* Progress Section */}
      <section className="progress-section">
        <h2 className="section-title">學習進度</h2>
        <div className="progress-card">
          <div className="progress-header">
            <span className="progress-text">已完成 {completedScenarios} / {totalScenarios} 個情境</span>
            <span className="progress-percent">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Today's Recommendation */}
      <section className="recommendation">
        <h2 className="section-title">🎯 今日推薦</h2>
        <Link to="/scenarios/batch-vs-online" className="rec-card">
          <div className="rec-icon">⚡</div>
          <div className="rec-content">
            <h3 className="rec-title">Batch vs Online 處理</h3>
            <p className="rec-desc">
              銀行主機最核心的兩種運作模式。學會判斷需求應該用即時處理還是批次排程。
            </p>
            <div className="rec-meta">
              <span className="rec-stage">第 1 階段</span>
              <span className="rec-duration">約 15 分鐘</span>
            </div>
          </div>
        </Link>
      </section>

      {/* Learning Path */}
      <section className="learning-path">
        <h2 className="section-title">📚 六階段學習路線</h2>
        <div className="stages-grid">
          {stages.map((stage) => (
            <Link 
              key={stage.num} 
              to={`/scenarios?stage=${stage.num}`}
              className="stage-card"
            >
              <div className="stage-number">{stage.num}</div>
              <div className="stage-icon">{stage.icon}</div>
              <h3 className="stage-name">{stage.name}</h3>
              <p className="stage-desc">{stage.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Tools */}
      <section className="quick-tools">
        <h2 className="section-title">🔧 快速工具</h2>
        <div className="tools-grid">
          <Link to="/glossary" className="tool-card">
            <span className="tool-icon">🔍</span>
            <span className="tool-name">術語詞典</span>
          </Link>
          <Link to="/code-lab" className="tool-card">
            <span className="tool-icon">💻</span>
            <span className="tool-name">程式碼實驗室</span>
          </Link>
          <Link to="/quiz" className="tool-card">
            <span className="tool-icon">📝</span>
            <span className="tool-name">測驗中心</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
