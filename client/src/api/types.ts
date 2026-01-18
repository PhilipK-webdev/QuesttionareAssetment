/**
 * API types matching backend responses
 */

export interface Question {
  id: string
  text: string
  reverse: boolean
  section: string
  section_id: number
}

export interface AnswerOption {
  value: number
  label: string
}

export interface QuestionnaireResponse {
  questions: Question[]
  answers: AnswerOption[]
  total_questions: number
}

export interface RegisterPayload {
  full_name: string
  email: string
  gender: string
  age_group: string
}

export interface RegisterResponse {
  session_id: string
  message: string
}

export interface SaveProgressPayload {
  session_id: string
  answers: Record<string, number>
  current_question_index: number
}

export interface SubmitPayload {
  session_id: string
  answers: Record<string, number>
}

export interface DomainScore {
  score: number
  category: string
  category_label: string
  domain_key: string
}

export interface RecommendedCourseObject {
  course_name: string
  description: string
}

export interface SubmitResponse {
  user: RegisterPayload
  scores: Record<string, DomainScore>
  llm_analysis: {
    driving_style: string
    recommended_course: string | RecommendedCourseObject
  }
  completed_at: string
}
