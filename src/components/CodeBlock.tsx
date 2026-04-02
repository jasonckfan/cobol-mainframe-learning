import { useState } from 'react'
import type { CodeExample } from '../types'
import './CodeBlock.css'

interface CodeBlockProps {
  example: CodeExample
}

function CodeBlock({ example }: CodeBlockProps) {
  const [showExplanation, setShowExplanation] = useState(false)
  const [showAnnotations, setShowAnnotations] = useState(true)

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'cobol': return 'COBOL'
      case 'jcl': return 'JCL'
      case 'copybook': return 'Copybook'
      default: return lang.toUpperCase()
    }
  }

  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case 'cobol': return '#054ADA'
      case 'jcl': return '#8a3ffc'
      case 'copybook': return '#009d9a'
      default: return '#666'
    }
  }

  const lines = example.code.split('\n')

  return (
    <div className="code-block-container">
      <div className="code-header">
        <div className="code-title">
          <span 
            className="code-lang"
            style={{ backgroundColor: getLanguageColor(example.language) }}
          >
            {getLanguageLabel(example.language)}
          </span>
          <span className="code-name">{example.title}</span>
        </div>
        <div className="code-actions">
          <button 
            className={`code-action ${showAnnotations ? 'active' : ''}`}
            onClick={() => setShowAnnotations(!showAnnotations)}
          >
            📝 註解
          </button>
          <button 
            className={`code-action ${showExplanation ? 'active' : ''}`}
            onClick={() => setShowExplanation(!showExplanation)}
          >
            💡 說明
          </button>
        </div>
      </div>

      <div className="code-content">
        <pre className="code-pre">
          <code>
            {lines.map((line, index) => {
              const lineNum = index + 1
              const annotation = example.annotations?.find(a => a.line === lineNum)
              
              return (
                <div key={index} className="code-line">
                  <span className="line-number">{lineNum.toString().padStart(3, '0')}</span>
                  <span className="line-content">
                    {line || ' '}
                    {showAnnotations && annotation && (
                      <span className="line-annotation">{annotation.text}</span>
                    )}
                  </span>
                </div>
              )
            })}
          </code>
        </pre>
      </div>

      {showExplanation && (
        <div className="code-explanation">
          <h4 className="explanation-title">💡 程式碼說明</h4>
          <p className="explanation-text">{example.explanation}</p>
        </div>
      )}
    </div>
  )
}

export default CodeBlock
