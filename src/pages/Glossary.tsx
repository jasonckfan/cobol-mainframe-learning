import { useState } from 'react'
import './Glossary.css'

interface GlossaryTerm {
  id: string
  term: string
  termEn: string
  category: string
  definition: string
  example?: string
}

const glossaryData: GlossaryTerm[] = [
  {
    id: '1',
    term: 'Mainframe',
    termEn: '大型主機',
    category: 'mainframe',
    definition: '銀行用來處理核心業務的超級電腦，穩定性極高，作業系統通常叫 z/OS',
    example: '銀行的帳戶交易、利息計算都在 Mainframe 上處理',
  },
  {
    id: '2',
    term: 'CICS',
    termEn: 'Customer Information Control System',
    category: 'cics',
    definition: '處理聯機交易的子系統，負責接收網銀、臨櫃發送的單筆電文',
    example: '客戶在網銀轉帳時，CICS 負責即時處理這筆交易',
  },
  {
    id: '3',
    term: 'JCL',
    termEn: 'Job Control Language',
    category: 'jcl',
    definition: '批次控制的腳本語言，告訴主機「去哪裡拿檔案、執行哪支程式、輸出什麼報表」',
    example: '//JOBNAME JOB (ACCT),\'JOB DESC\',CLASS=A',
  },
  {
    id: '4',
    term: 'Batch',
    termEn: '批次處理',
    category: 'general',
    definition: '不需要人工介入，透過排程在背景自動執行，一次處理大量資料',
    example: '每日深夜計算所有帳戶的利息就是 Batch 作業',
  },
  {
    id: '5',
    term: 'Online',
    termEn: '聯機交易',
    category: 'general',
    definition: '使用者即時操作，系統馬上回應，一次處理一筆',
    example: '客戶查詢帳戶餘額就是 Online 交易',
  },
  {
    id: '6',
    term: 'Copybook',
    termEn: 'Copybook',
    category: 'cobol',
    definition: 'COBOL 的資料結構定義檔案，用來統一資料格式',
    example: '定義帳戶資料的欄位名稱、長度、型別',
  },
  {
    id: '7',
    term: 'VSAM',
    termEn: 'Virtual Storage Access Method',
    category: 'mainframe',
    definition: '主機上的檔案組織方式，支援隨機存取',
    example: 'KSDS (Key-Sequenced) 是最常用的 VSAM 類型',
  },
  {
    id: '8',
    term: 'EOD',
    termEn: 'End of Day',
    category: 'general',
    definition: '日終，銀行每日營業結束後的批次處理時間',
    example: 'EOD 通常在晚上 11:30 開始執行',
  },
  {
    id: '9',
    term: 'PIC',
    termEn: 'Picture Clause',
    category: 'cobol',
    definition: 'COBOL 中用來定義資料型別和格式的語法',
    example: 'PIC 9(5) 表示 5 位數字，PIC X(10) 表示 10 個字元',
  },
  {
    id: '10',
    term: 'COMP-3',
    termEn: 'Packed Decimal',
    category: 'cobol',
    definition: 'COBOL 的壓縮十進位格式，節省儲存空間',
    example: 'PIC S9(13)V99 COMP-3 用來儲存金額',
  },
]

const categories = [
  { id: 'all', name: '全部', color: '#666' },
  { id: 'mainframe', name: 'Mainframe', color: '#054ADA' },
  { id: 'cobol', name: 'COBOL', color: '#009d9a' },
  { id: 'jcl', name: 'JCL', color: '#8a3ffc' },
  { id: 'cics', name: 'CICS', color: '#fa4d56' },
  { id: 'general', name: '通用', color: '#42be65' },
]

function Glossary() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTerms = glossaryData.filter(term => {
    const matchesCategory = activeCategory === 'all' || term.category === activeCategory
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.termEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="glossary">
      <header className="page-header">
        <h1 className="page-title">🔍 術語詞典</h1>
        <p className="page-desc">快速查找 COBOL 和 Mainframe 相關術語</p>
      </header>

      <div className="glossary-search">
        <input
          type="text"
          className="search-input"
          placeholder="搜尋術語..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            style={{ 
              backgroundColor: activeCategory === cat.id ? cat.color : undefined 
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="terms-list">
        {filteredTerms.map(term => {
          const category = categories.find(c => c.id === term.category)
          return (
            <div key={term.id} className="term-card">
              <div className="term-header">
                <div className="term-titles">
                  <h3 className="term-name">{term.term}</h3>
                  <span className="term-en">{term.termEn}</span>
                </div>
                <span 
                  className="term-category"
                  style={{ backgroundColor: category?.color }}
                >
                  {category?.name}
                </span>
              </div>
              <p className="term-definition">{term.definition}</p>
              {term.example && (
                <div className="term-example">
                  <span className="example-label">💡 範例：</span>
                  <span className="example-text">{term.example}</span>
                </div>
              )}
            </div>
          )
        })}
        
        {filteredTerms.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>找不到符合的術語</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Glossary
