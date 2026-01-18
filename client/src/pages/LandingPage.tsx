import { Box, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { PageLayout } from '../components/PageLayout'
import landingBg from '../assets/landing-page.jpg'
import { LandingHeader } from '../components/LandingHeader'
import logo from '../assets/logo.svg'
import { PrimaryActionButton } from '../components/PrimaryActionButton'
import { questionnaireStorage } from '../storage/questionnaire'

export default function LandingPage() {
  const navigate = useNavigate()

  // Check if user has completed results or saved progress
  const hasResults = sessionStorage.getItem('questionnaire_results')
  const hasProgress = questionnaireStorage.getSessionId() && questionnaireStorage.getQuestions()

  // Auto-redirect if user has saved progress (Save for Later)
  useEffect(() => {
    if (hasProgress && !hasResults) {
      // User has saved progress but not completed - redirect to questionnaire
      navigate('/question')
    }
  }, [navigate, hasProgress, hasResults])

  return (
    <PageLayout pageBg="#E9E9E9" backgroundImage={landingBg}>
      <Stack sx={{ minHeight:{
        xs: '92vh',
        md: '91vh',
        lg: '91vh',
        xl: '92vh',
      } }} justifyContent="center">
        <Box sx={{ display: 'flex',
          // padding: '.375rem 2.875rem',    
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flex: '1 0 0',
          alignSelf: 'stretch',
          height: '100%',
          width: 'max(1300px, 92vw)'

      }}>
      <LandingHeader logoSrc={logo} showSelectLanguage={true} isIcon={false}/>
          <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flex: 1, 
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
        }}
      >
        <Typography
          sx={{
            color: '#ECECEC',  
            fontWeight: 700,
            lineHeight:'4.53125rem',
            letterSpacing: '-0.19875rem',
            fontSize: {
              sm: '3rem',   // ~48px
              md: '4.5rem',
            },
          }}
        >
          Discover
          <br />
          Your Learning
          <br />
          Profile
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: '#ECECEC',  
            fontWeight: 400,
            lineHeight:'1.9375rem',
            letterSpacing: '-0.04125rem',
            fontSize: {
              sm: '1.3rem',  
              md: '1.2rem',
            },
            maxWidth: 500,
          }}
        >
          Designed to build a complete understanding of how you learn
        </Typography>

        <PrimaryActionButton onClick={() => navigate(hasResults ? '/results' : '/register')}>
          {hasResults ? 'View Results' : "Let's Begin"}
        </PrimaryActionButton>
        
      </Box>
    </Box>
    </Box>
    </Stack>
    
    </PageLayout>
  )
}