import {
  Box,
  Stack,
  Typography,
  Alert,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { PageLayout } from '../components/PageLayout'
import registration from '../assets/registration-page.jpg'
import { LandingHeader } from '../components/LandingHeader'
import logo from '../assets/logo.svg'
import { PillTextInput } from '../components/PillTextInput'
import { PillSelectInput } from '../components/PillSelectInput'
import { PrimaryActionButton } from '../components/PrimaryActionButton'
import { SecondaryActionButton } from '../components/SecondaryActionButton'
import { questionnaireAPI } from '../api/questionnaire'
import { questionnaireStorage } from '../storage/questionnaire'


type FormValues = {
  fullName: string
  email: string
  gender: string
  ageGroup: string
}


export default function RegistrationPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      gender: '',
      ageGroup: '',
    },
    mode: 'onTouched',
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setError(null)
      
      // Register with backend
      const response = await questionnaireAPI.register({
        full_name: values.fullName,
        email: values.email,
        gender: values.gender,
        age_group: values.ageGroup,
      })

      // Store session ID
      questionnaireStorage.setSessionId(response.session_id)
      
      // Navigate to intro page
      navigate('/intro')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    }
  }

  return (
    <PageLayout pageBg="#E9E9E9" backgroundImage={registration}>
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
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1, 
        justifyContent: 'center',
      }}
    >
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 8, mb: 2 }}>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 500,                  
                  fontSize: { sm: '3.12rem', md:' 3.12rem'},
                }}
              >
                Registration
              </Typography>

              <Typography sx={{
                  color: 'white',
                  fontWeight: 400,                  
                  fontSize: { sm: '1.375rem', md:'1.375rem'},
                }}>
                A few details to get started
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Stack spacing={2.5}>
                {/* Full Name */}
                <PillTextInput
                  label="Full Name"
                  required
                  placeholder="Enter your full name"
                  register={register('fullName', {
                    required: 'Full name is required',
                    minLength: { value: 2, message: 'Name is too short' },
                  })}
                  error={errors.fullName}
                />

                <PillTextInput
                  label="Email"
                  required
                  type="email"
                  placeholder="Used to save your progress"
                  register={register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email',
                    },
                  })}
                  error={errors.email}
                />

                {/* Gender + Age Group */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { sm: '1fr', md: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <PillSelectInput<FormValues>
                    label="Gender"
                    name="gender"
                    required
                    placeholder="Choose an option"
                    control={control}
                    error={errors.gender}
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                      { value: 'prefer_not', label: 'Prefer not to say' },
                    ]}
                  />

                  <PillSelectInput<FormValues>
                    label="Age Group"
                    name="ageGroup"
                    required
                    placeholder="Select age group"
                    control={control}
                    error={errors.ageGroup}
                    options={[
                      { value: '18-25', label: '18–25' },
                      { value: '26-35', label: '26–35' },
                      { value: '36-50', label: '36–50' },
                      { value: '50+', label: '50+' },
                    ]}
                  />
                </Box>
              </Stack>

              {/* Actions */}
              <Box
                sx={{
                  mt: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <SecondaryActionButton onClick={() => navigate('/')}>
                  Back
                </SecondaryActionButton>

                <PrimaryActionButton
                  type="submit"
                  disabled={isSubmitting}
                  showArrow
                  onClick={handleSubmit(onSubmit)}
                  from="register"
                >
                  Continue
                </PrimaryActionButton>
              </Box>
            </Box>
          </Box>
        </Box>
        </Stack>
    </PageLayout>
  );
}