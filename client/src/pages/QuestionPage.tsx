import { Box, Stack, CircularProgress, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { LandingHeader } from '../components/LandingHeader'
import logo from '../assets/logo.svg'
import question from '../assets/question-page.jpg'
import { RectangleIcon } from '../components/icons/RectangleIcon'
import { SaveAndProgress } from '../components/SaveAndProgress'
import { useEffect, useState } from 'react'
import { QuestionLikertBlock } from '../components/QuestionLikertBlock'
import { questionnaireAPI } from '../api/questionnaire'
import { questionnaireStorage } from '../storage/questionnaire'
import type { Question } from '../api/types'
import { useSnackbar } from '../context/SnackbarContext'

export default function QuestionPage() {
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbar()
  
  // State
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)

  // Load questionnaire on mount
  useEffect(() => {
    const loadQuestionnaire = async () => {
      try {
        // Get session ID from storage
        const storedSessionId = questionnaireStorage.getSessionId()
        if (!storedSessionId) {
          navigate('/register')
          return
        }

        setSessionId(storedSessionId)

        // Try to load from cache first
        const cachedQuestions = questionnaireStorage.getQuestions()
        const cachedAnswers = questionnaireStorage.getAnswers()
        const cachedIndex = questionnaireStorage.getCurrentIndex()

        if (cachedQuestions) {
          setQuestions(cachedQuestions as Question[])
          setAnswers(cachedAnswers)
          setCurrentIndex(cachedIndex)
          setLoading(false)
          return
        }

        // Fetch from API
        const response = await questionnaireAPI.getQuestionnaire(storedSessionId)
        setQuestions(response.questions)
        
        // Cache questions
        questionnaireStorage.setQuestions(response.questions)
        
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load questionnaire')
        setLoading(false)
      }
    }

    loadQuestionnaire()
  }, [navigate])

  // Save progress periodically
  const handleSaveProgress = async () => {
    if (!sessionId) return

    try {
      await questionnaireAPI.saveProgress({
        session_id: sessionId,
        answers,
        current_question_index: currentIndex,
      })

      // Also save to local storage
      questionnaireStorage.setAnswers(answers)
      questionnaireStorage.setCurrentIndex(currentIndex)

      showSnackbar('Progress saved successfully!', 'success')
    } catch (err) {
      console.error('Failed to save progress:', err)
      showSnackbar('Failed to save progress. Please try again.', 'error')
    }
  }

  // Handle answer change with auto-advance
  const handleAnswerChange = (value: number) => {
    const currentQuestion = questions[currentIndex]
    if (!currentQuestion) return
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    }
    
    setAnswers(newAnswers)
    questionnaireStorage.setAnswers(newAnswers)

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        const nextIndex = currentIndex + 1
        setCurrentIndex(nextIndex)
        questionnaireStorage.setCurrentIndex(nextIndex)
      }
    }, 300) // 300ms delay for visual feedback
  }

  // Navigate to next question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      questionnaireStorage.setCurrentIndex(nextIndex)
    } else {
      // Last question - submit
      handleSubmit()
    }
  }

  // Navigate to previous question
  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      questionnaireStorage.setCurrentIndex(prevIndex)
    }
  }

  // Submit questionnaire
  const handleSubmit = async () => {
    if (!sessionId) return

    // Check if all questions are answered
    const unansweredQuestions = questions.filter(q => !answers[q.id])
    if (unansweredQuestions.length > 0) {
      showSnackbar(`Please answer all questions. ${unansweredQuestions.length} question(s) remaining.`, 'warning')
      return
    }

    try {
      setLoading(true)
      const results = await questionnaireAPI.submit({
        session_id: sessionId,
        answers,
      })

      // Store results for ResultPage
      sessionStorage.setItem('questionnaire_results', JSON.stringify(results))
      
      // Clear local storage
      questionnaireStorage.clear()
      
      // Navigate to results
      navigate('/results')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit questionnaire')
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <PageLayout pageBg="#FFFFFF" from="questionnaire" backgroundImage={question}>
        <Stack sx={{ minHeight: {
            xs: '90vh',
            md: '95.5vh',
            lg: '95.7vh',
            xl: '96.5vh',
          }, width: '100vw' }} justifyContent="center" alignItems="center">
          <CircularProgress size={100} sx={{ color: '#FFFFFF' }}/>
          <Typography sx={{ mt: 2, color: '#FFFFFF', fontSize: '1.5rem' }}>
            {questions.filter(q => !answers[q.id]).length === 0 ? `Please wait while we load the results...` : 'Loading questionnaire...'}
          </Typography>
        </Stack>
      </PageLayout>
    )
  }

  // Error state
  if (error || questions.length === 0) {
    return (
      <PageLayout pageBg="#FFFFFF" from="questionnaire" backgroundImage={question}>
        <Stack sx={{ minHeight: {
            xs: '90vh',
            md: '95.5vh',
            lg: '95.7vh',
            xl: '96.5vh',
          }, width: '100vw' }} justifyContent="center" alignItems="center">
          <Typography sx={{ color: '#414141', fontSize: '1.5rem', mb: 2 }}>
            {error || 'No questions available'}
          </Typography>
          <button onClick={() => navigate('/register')}>Return to Registration</button>
        </Stack>
      </PageLayout>
    )
  }

  const currentQuestion = questions[currentIndex]
  const currentAnswer = answers[currentQuestion.id]
  const isLastQuestion = currentIndex === questions.length - 1  

  return (
    <PageLayout pageBg="#E9E9E9" from="questionnaire" backgroundImage={question}>
      <Stack
        sx={{
          minHeight: {
            xs: '90vh',
            md: '95.5vh',
            lg: '95.7vh',
            xl: '96.5vh',
          },
          width: '100vw',
          background: '#FFFFFF',
        }}
        justifyContent="center"
      >
        <Box
          sx={{
            display: 'flex',
            padding: '2.375rem 5.5rem',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1 0 0',
            alignSelf: 'stretch',
            height: '100%',
            width: 'max(1550px, 100vw)',
          }}
        >
          <LandingHeader logoSrc={logo} showSelectLanguage={false} isIcon={true} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              flexDirection: 'column',
              justifyContent: 'start',
              flex: 1,
              width: 'min(1800px, 94vw)',
              position: 'relative',
            }}
          >
            {/* Save & Progress - TOP RIGHT */}
            <Box
              sx={{
                position: 'absolute',
                top: -40,
                right: -10,
                zIndex: 10,
              }}
            >
              <SaveAndProgress
                current={currentIndex + 1}
                total={questions.length}
                onSave={handleSaveProgress}
              />
            </Box>

            <Box
              sx={{
                maxWidth: 1400,
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                pl: '9rem',
                pt: '6rem',
              }}
            >
              {/* Question Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <QuestionLikertBlock
                  prompt={`Question ${currentIndex + 1} of ${questions.length}`}
                  question={currentQuestion.text}
                  value={currentAnswer}
                  onChange={handleAnswerChange}
                  onBack={handleBack}
                  onNext={currentAnswer ? handleNext : undefined}
                  isFirstQuestion={currentIndex === 0}
                  isLastQuestion={isLastQuestion}
                />
              </Box>

              <RectangleIcon />
            </Box>
          </Box>
        </Box>
      </Stack>
    </PageLayout>
  )
}
