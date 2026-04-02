import { useState } from 'react'
import type { QuizQuestion } from '../types'
import './QuizPanel.css'

interface QuizPanelProps {
  questions: QuizQuestion[]
}

function QuizPanel({ questions }: QuizPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const currentQuestion = questions[currentIndex]

  const handleSelect = (optionId: string) => {
    if (showResult) return
    setSelectedAnswer(optionId)
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return
    setShowResult(true)
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectCount(c => c + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setCorrectCount(0)
    setIsFinished(false)
  }

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'single': return '單選題'
      case 'multiple': return '多選題'
      case 'scenario': return '情境判斷'
      case 'code-reading': return '程式碼閱讀'
      default: return type
    }
  }

  if (isFinished) {
    const score = Math.round((correctCount / questions.length) * 100)
    return (
      <div className="quiz-finished">
        <div className="quiz-result-card">
          <h2 className="result-title">🎉 測驗完成！</h2>
          <div className="result-score">
            <span className="score-number">{score}</span>
            <span className="score-label">分</span>
          </div>
          <p className="result-detail">
            答對 {correctCount} / {questions.length} 題
          </p>
          <div className="result-feedback">
            {score >= 80 ? '太棒了！你已經掌握這個情境的核心概念。' :
             score >= 60 ? '不錯！建議再複習一下答錯的題目。' :
             '繼續加油！建議重新閱讀情境內容。'}
          </div>
          <button className="btn-primary" onClick={handleRestart}>
            重新測驗
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-panel">
      <div className="quiz-header">
        <span className="quiz-progress">
          題目 {currentIndex + 1} / {questions.length}
        </span>
        <span className="quiz-type">
          {getQuestionTypeLabel(currentQuestion.type)}
        </span>
      </div>

      <div className="quiz-question">
        <h3 className="question-text">{currentQuestion.question}</h3>
      </div>

      <div className="quiz-options">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedAnswer === option.id
          const isCorrect = option.id === currentQuestion.correctAnswer
          const showCorrect = showResult && isCorrect
          const showWrong = showResult && isSelected && !isCorrect

          return (
            <button
              key={option.id}
              className={`quiz-option ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''}`}
              onClick={() => handleSelect(option.id)}
              disabled={showResult}
            >
              <span className="option-letter">{option.id.toUpperCase()}</span>
              <span className="option-text">{option.text}</span>
              {showCorrect && <span className="option-icon">✓</span>}
              {showWrong && <span className="option-icon">✗</span>}
            </button>
          )
        })}
      </div>

      {showResult && (
        <div className={`quiz-explanation ${selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'wrong'}`}>
          <h4 className="explanation-title">
            {selectedAnswer === currentQuestion.correctAnswer ? '✅ 答對了！' : '❌ 答錯了'}
          </h4>
          <p className="explanation-text">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="quiz-actions">
        {!showResult ? (
          <button 
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!selectedAnswer}
          >
            提交答案
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNext}>
            {currentIndex < questions.length - 1 ? '下一題 →' : '查看結果'}
          </button>
        )}
      </div>
    </div>
  )
}

export default QuizPanel
