import { Box,Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import intro from '../assets/intro-page.jpg'
import { LandingHeader } from '../components/LandingHeader'
import logo from '../assets/logo.svg'
import { PrimaryActionButton } from '../components/PrimaryActionButton'
import { SecondaryActionButton } from '../components/SecondaryActionButton'
export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <PageLayout pageBg="#E9E9E9" backgroundImage={intro}>
      <Stack sx={{ minHeight:{
        xs: '92vh',
        md: '91vh',
        lg: '91vh',
        xl: '92vh',
      }}} justifyContent="center">
        <Box sx={{ display: 'flex',
          // padding: '.375rem 2.875rem',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1 0 0',
          alignSelf: 'stretch',
          height: '100%',
          width: 'max(1300px, 92vw)'

      }}>
      <LandingHeader logoSrc={logo} showSelectLanguage={true} isIcon={false}/>
          <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'start',
        flex: 1,  
        width: 'min(1800px, 55vw)',
        padding: {
          xs: '10.375rem 4.875rem',
          md: '10.375rem 4.875rem',
          lg: '8.375rem 4.875rem',
          xl: '10.375rem 4.875rem',
        },
      }}
    >
        <Box
          sx={{
            maxWidth: 1400,
          }}
        >
          <Typography variant="h2"
            sx={{
              color: '#ECECEC',  
              fontSize: '5.75rem',
              fontWeight: 700,
              lineHeight: '6.53125rem',
              letterSpacing: '-0.1725rem'
                    }}
          >
            What to Expect
          </Typography>

          <Box component="ul" sx={{ pl: 2 }}>
          <Typography
          component="li"
            sx={{
              mt: 2,
              color: '#ECECEC',  
              fontWeight: 400,              
              letterSpacing: '-0.04125rem',
              fontSize: {
                sm: '1.3rem',   // ~48px
                md: '1.2rem',
              },
              maxWidth: 460,
            }}
          >
            You are about to assess your driving capabilities
          </Typography>
          <Typography
          component="li"
            sx={{
              color: '#ECECEC',  
              fontWeight: 400,
              
              letterSpacing: '-0.04125rem',
              fontSize: {
                sm: '1.3rem',   // ~48px
                md: '1.2rem',
              },
              maxWidth: 460,
            }}
          >
            You will be asked to answer a series of questions
          </Typography>
          <Typography
          component="li"
            sx={{
              color: '#ECECEC',  
              fontWeight: 400,
              
              letterSpacing: '-0.04125rem',
              fontSize: {
                sm: '1.3rem',   // ~48px
                md: '1.2rem',
              },
              maxWidth: 560,
            }}
          >
            The questionnaire will take approximately 20 minutes to complete
          </Typography>
          </Box>
          
              <Box
                  sx={{
                    
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'flex-end',
                    flexDirection: 'row-reverse',
                    gap: 2,
                  }}
                >
                  <SecondaryActionButton onClick={() => navigate('/register')}>
                    Back
                  </SecondaryActionButton>
                  <PrimaryActionButton
                    type="submit"
                    onClick={() => navigate('/question')}
                  >
                    Continue
                  </PrimaryActionButton>
                </Box>
          
        </Box>
        </Box>
        </Box>
    </Stack>
    
    </PageLayout>
  )
}