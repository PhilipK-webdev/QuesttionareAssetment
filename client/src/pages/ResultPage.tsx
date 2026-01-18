import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PageLayout } from '../components/PageLayout'
import resultBg from '../assets/result-page.jpg'
import { LandingHeader } from '../components/LandingHeader'
import logo from '../assets/logo.svg'
import { LearningProfileSection } from '../components/LearningProfileSection'
import { InfoCard } from '../components/InfoCard'
import { PlantIcon } from '../components/icons/PlantIcon'
import { AssessmentSummaryRow } from '../components/AssessmentSummaryRow'
import { DriverDomainsCard } from '../components/DriverDomainsCard'
import type { SubmitResponse } from '../api/types'

export default function ResultPage() {
  const navigate = useNavigate()
  const [results, setResults] = useState<SubmitResponse | null>(null)
  const [loading, setLoading] = useState(true)

  // Load results from sessionStorage on mount
  useEffect(() => {
    const storedResults = sessionStorage.getItem('questionnaire_results')
    
    if (!storedResults) {
      // No results found, redirect to landing page
      navigate('/')
      return
    }

    try {
      const parsedResults = JSON.parse(storedResults) as SubmitResponse
      setResults(parsedResults)
    } catch (err) {
      console.error('Failed to parse results:', err)
      navigate('/')
      return
    }

    setLoading(false)
  }, [navigate])


  // Loading state
  if (loading) {
    return (
      <PageLayout pageBg="#E9E9E9" backgroundImage={resultBg}>
        <Stack sx={{ minHeight: '100vh' }} justifyContent="center" alignItems="center">
          <CircularProgress sx={{ color: '#40CBE8' }} />
          <Typography sx={{ mt: 2, color: '#414141' }}>Loading results...</Typography>
        </Stack>
      </PageLayout>
    )
  }

  // No results state
  if (!results) {
    return (
      <PageLayout pageBg="#E9E9E9" backgroundImage={resultBg}>
        <Stack sx={{ minHeight: '100vh' }} justifyContent="center" alignItems="center">
          <Typography sx={{ color: '#414141', fontSize: '1.5rem', mb: 2 }}>
            No results found
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </Stack>
      </PageLayout>
    )
  }

  // Prepare data for components
  const { user, scores, llm_analysis } = results
  
  // Helper to extract recommended course text (can be string or object)
  const getRecommendedCourseText = (): string => {
    const course = llm_analysis.recommended_course
    if (!course) return 'Course recommendation pending'
    if (typeof course === 'string') return course
    if (typeof course === 'object' && course !== null) {
      const { course_name, description } = course as { course_name?: string; description?: string }
      if (course_name && description) return `${course_name}: ${description}`
      return course_name || description || 'Course recommendation pending'
    }
    return 'Course recommendation pending'
  }
  
  const recommendedCourseText = getRecommendedCourseText()
  
  // Prepare radar chart data
  const domainOrder = ['Reaction Speed', 'Vehicle Control', 'Spatial Awareness', 'Road Behavior'] as const
  const radarLabels = domainOrder
  const radarValues = domainOrder.map(domain => scores[domain]?.score ?? 0)
  
  // Calculate overall score (average of all domain scores)
  const overallScore = domainOrder.reduce((sum, domain) => sum + (scores[domain]?.score ?? 0), 0) / domainOrder.length
  
  // Prepare domain rows for DriverDomainsCard
  const domainRows = domainOrder.map(domain => ({
    key: domain,
    score: scores[domain]?.score ?? 0,
    max: 4,
    category: scores[domain]?.category ?? 'Medium',
    categoryLabel: scores[domain]?.category_label ?? 'Average',
  }))

  // Extract key strengths and areas for improvement from scores
  const sortedDomains = [...domainOrder].sort((a, b) => (scores[b]?.score ?? 0) - (scores[a]?.score ?? 0))
  const topStrength = sortedDomains[0]
  const areaToImprove = sortedDomains[sortedDomains.length - 1]

  return (
    <PageLayout pageBg="#E9E9E9" backgroundImage={resultBg}>
      <Stack sx={{ minHeight: '100vh', marginLeft: 'auto', marginRight: 'auto', mt:6 }} justifyContent="center">
        <Box sx={{ display: 'flex',
          padding: {
            xs: '1rem',
            md: '2.375rem 3.875rem',
            lg: '1.375rem 2.875rem',
            xl: '2.375rem 3.875rem',
          },    
          flexDirection: 'column',
          alignItems: 'flex-start',
          flex: '1 0 0',
          alignSelf: 'stretch',
          height: '100%',
          width: 'max(1000px, 70vw)',
          borderRadius: '2.1875rem',
          border: '2px solid #245F74',
          background: '#111727',
          mb: '2rem',
      }}>
        {/* Header with Print Button */}
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <LandingHeader logoSrc={logo} showSelectLanguage={false} isIcon={false} isResultPage={true}/>
        </Box>
        
        <LearningProfileSection 
          userName={user.full_name}
          drivingStyle={llm_analysis.driving_style}
          radarLabels={radarLabels}
          radarValues={radarValues}
        />
        
        <Box sx={{ mt: '2rem', display: 'flex',
            height: '12.3125rem',
            alignItems: 'center',
            gap: '2rem',
            justifyContent:'center',
            alignSelf: 'stretch',
        }}>
          <InfoCard
            title="Driving Style"
            tooltip="Your overall driving personality based on assessment responses"
            subtitles={[
              llm_analysis.driving_style.split('.')[0] || 'Analysis pending',
            ]}
          />
          <InfoCard
            title="Recommended Course"
            tooltip="Suggested training to help improve your driving skills"
            subtitles={[
              recommendedCourseText,
            ]}
          />
          <InfoCard
            title="Key Strength"
            tooltip="The driving domain where you scored highest"
            subtitles={[
              topStrength,
              `Score: ${scores[topStrength]?.score?.toFixed(1) ?? 'N/A'} / 4`,
              scores[topStrength]?.category_label ?? '',
            ]}
          />
          <InfoCard
            title="Area to Improve"
            tooltip="The driving domain that could benefit from additional practice"
            subtitles={[
              areaToImprove,
              `Score: ${scores[areaToImprove]?.score?.toFixed(1) ?? 'N/A'} / 4`,
              scores[areaToImprove]?.category_label ?? '',
            ]}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '98%', height: '100%', mt: '-38px', gap:4,pl:4 }}>
          <Box>
            <PlantIcon/>
          </Box>
          <AssessmentSummaryRow
            eyebrow="Driver Assessment"
            title="Overall Score"
            description={recommendedCourseText}
            score={parseFloat(overallScore.toFixed(2))}
            maxScore={4}
          />
        </Box>
        
        <DriverDomainsCard
          title="Driver Domains"
          rows={domainRows}
        />
      </Box>
    </Stack>
    </PageLayout>
  )
}
