/**
 * API client for questionnaire backend
 */

import type {
  QuestionnaireResponse,
  RegisterPayload,
  RegisterResponse,
  SaveProgressPayload,
  SubmitPayload,
  SubmitResponse,
} from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

class QuestionnaireAPI {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  /**
   * Register a new user and get session ID
   */
  async register(data: RegisterPayload): Promise<RegisterResponse> {
    const response = await fetch(`${this.baseUrl}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Registration failed')
    }

    return response.json()
  }

  /**
   * Get shuffled questionnaire
   */
  async getQuestionnaire(sessionId?: string): Promise<QuestionnaireResponse> {
    const url = sessionId
      ? `${this.baseUrl}/api/questionnaire?session_id=${sessionId}`
      : `${this.baseUrl}/api/questionnaire`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch questionnaire')
    }

    return response.json()
  }

  /**
   * Save progress for later
   */
  async saveProgress(data: SaveProgressPayload): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/save-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to save progress')
    }
  }

  /**
   * Load saved progress
   */
  async loadProgress(sessionId: string): Promise<{
    user: RegisterPayload
    answers: Record<string, number>
    current_question_index: number
    last_saved?: string
  }> {
    const response = await fetch(`${this.baseUrl}/api/load-progress/${sessionId}`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to load progress')
    }

    return response.json()
  }

  /**
   * Submit completed questionnaire
   */
  async submit(data: SubmitPayload): Promise<SubmitResponse> {
    const response = await fetch(`${this.baseUrl}/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to submit questionnaire')
    }

    return response.json()
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${this.baseUrl}/api/health`)
    return response.json()
  }
}

// Export singleton instance
export const questionnaireAPI = new QuestionnaireAPI()
