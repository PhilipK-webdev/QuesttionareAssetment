/**
 * Local storage utilities for questionnaire state
 */

const KEYS = {
  SESSION_ID: 'questionnaire_session_id',
  ANSWERS: 'questionnaire_answers',
  CURRENT_INDEX: 'questionnaire_current_index',
  QUESTIONS: 'questionnaire_questions',
} as const

export const questionnaireStorage = {
  // Session ID
  setSessionId: (sessionId: string) => {
    localStorage.setItem(KEYS.SESSION_ID, sessionId)
  },

  getSessionId: (): string | null => {
    return localStorage.getItem(KEYS.SESSION_ID)
  },

  // Answers
  setAnswers: (answers: Record<string, number>) => {
    localStorage.setItem(KEYS.ANSWERS, JSON.stringify(answers))
  },

  getAnswers: (): Record<string, number> => {
    const stored = localStorage.getItem(KEYS.ANSWERS)
    return stored ? JSON.parse(stored) : {}
  },

  // Current question index
  setCurrentIndex: (index: number) => {
    localStorage.setItem(KEYS.CURRENT_INDEX, String(index))
  },

  getCurrentIndex: (): number => {
    const stored = localStorage.getItem(KEYS.CURRENT_INDEX)
    return stored ? parseInt(stored, 10) : 0
  },

  // Questions (cached)
  setQuestions: (questions: unknown[]) => {
    localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(questions))
  },

  getQuestions: (): unknown[] | null => {
    const stored = localStorage.getItem(KEYS.QUESTIONS)
    return stored ? JSON.parse(stored) : null
  },

  // Clear all
  clear: () => {
    Object.values(KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
  },
}
