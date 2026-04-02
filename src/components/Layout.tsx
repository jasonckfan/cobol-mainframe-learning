import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: '首頁', icon: '🏠' },
    { path: '/scenarios', label: '情境學習', icon: '📚' },
    { path: '/code-lab', label: '程式碼實驗室', icon: '💻' },
    { path: '/quiz', label: '測驗', icon: '📝' },
    { path: '/glossary', label: '術語詞典', icon: '🔍' },
    { path: '/progress', label: '進度', icon: '📊' },
  ]

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🖥️</span>
            <span className="logo-text">COBOL Mainframe Learning</span>
          </Link>
          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            <span className="terminal-text">$</span> Learn COBOL & Mainframe for Banking
          </p>
          <p className="footer-version">v1.0.0</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
