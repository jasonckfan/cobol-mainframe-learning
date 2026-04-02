import type { Dialogue, Role } from '../types'
import './DialogueView.css'

interface DialogueViewProps {
  dialogues: Dialogue[]
  roles: Role[]
}

function DialogueView({ dialogues, roles }: DialogueViewProps) {
  const getRole = (roleId: string) => {
    return roles.find(r => r.id === roleId)
  }

  return (
    <div className="dialogue-panel">
      <h2 className="panel-title">💬 情境對話</h2>
      <p className="panel-desc">模擬 BA 與業務單位的真實對話場景</p>
      
      <div className="dialogue-list">
        {dialogues.map((dialogue, index) => {
          const role = getRole(dialogue.roleId)
          if (!role) return null

          return (
            <div 
              key={index} 
              className={`dialogue-item ${dialogue.isQuestion ? 'is-question' : ''}`}
            >
              <div className="dialogue-avatar">
                <span className="avatar-emoji">{role.avatar}</span>
              </div>
              <div className="dialogue-content">
                <div className="dialogue-header">
                  <span className="dialogue-role">{role.name}</span>
                  <span className="dialogue-role-en">{role.nameEn}</span>
                </div>
                <div className="dialogue-bubble">
                  <p className="dialogue-text">{dialogue.text}</p>
                  {dialogue.textEn && (
                    <p className="dialogue-text-en">{dialogue.textEn}</p>
                  )}
                </div>
                {dialogue.isQuestion && (
                  <div className="question-badge">💡 思考點</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DialogueView
