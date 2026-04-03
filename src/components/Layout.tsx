import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: '首頁', icon: '🏠' },
    { path: '/scenarios', label: '情境', icon: '📚' },
    { path: '/code-lab', label: '實驗室', icon: '💻' },
    { path: '/quiz', label: '測驗', icon: '📝' },
    { path: '/glossary', label: '詞典', icon: '🔍' },
    { path: '/progress', label: '進度', icon: '📊' },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🖥️</span>
            <span className="logo-text">COBOL</span>
          </Link>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Layout
