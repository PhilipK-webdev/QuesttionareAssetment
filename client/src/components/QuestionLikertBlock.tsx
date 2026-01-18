import { Box, Stack, Typography } from '@mui/material'
import { PrimaryActionButton } from './PrimaryActionButton'
import { SecondaryActionButton } from './SecondaryActionButton'

type LikertOption = {
  value: number
  label: string
}

// Match backend's 4-option scale
const OPTIONS: LikertOption[] = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Agree' },
  { value: 4, label: 'Strongly Agree' },
]

type Props = {
  prompt: string
  question: string
  value?: number
  onChange: (value: number) => void
  onBack: () => void
  onNext?: () => void
  isFirstQuestion?: boolean
  isLastQuestion?: boolean
}

export function QuestionLikertBlock({
  prompt,
  question,
  value,
  onChange,
  onBack,
  onNext,
  isFirstQuestion = false,
  isLastQuestion = false,
}: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        minHeight: {
          xs: '60vh',
          md: '60vh',
          lg: '67vh',
          xl: '70vh',
        },
        flexDirection: 'column',
        alignItems: 'start',
        gap: 2,
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography
          sx={{
            color: '#414141',
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.5rem',
            mb: 1,
          }}
        >
          {prompt}
        </Typography>

        {/* question */}
        <Typography
          sx={{
            color: '#414141',
            fontSize: { sm: '2rem', md: '2.5rem' },
            fontWeight: 700,
            lineHeight: { sm: '2.4rem', md: '3rem' },
            letterSpacing: '-0.02em',
            maxWidth: 980,
            mb: 4,
          }}
        >
          {question}
        </Typography>

        {/* options */}
        <Stack direction="row" spacing={5} alignItems="flex-start">
          {OPTIONS.map((opt) => {
            const selected = value === opt.value

            return (
              <Box
                key={opt.value}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => onChange(opt.value)}
                role="button"
                aria-label={opt.label}
              >
                <Box
                  sx={{
                    width: '4.38rem',
                    height: '4.38rem',
                    borderRadius: '50%',
                    backgroundColor: selected ? '#BDBDBD' : '#D9D9D9',
                    display: 'grid',
                    placeItems: 'center',
                    transition: 'background-color 200ms ease, transform 200ms ease',
                    ...(selected
                      ? { transform: 'scale(1.02)' }
                      : {
                          '&:hover': {
                            backgroundColor: '#CFCFCF',
                          },
                        }),
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.125rem',
                      fontWeight: 400,
                      color: '#8C8C8C',
                    }}
                  >
                    {opt.value}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    color: '#414141',
                    textAlign: 'center',
                    maxWidth: 150,
                    lineHeight: '1rem',
                  }}
                >
                  {opt.label}
                </Typography>
              </Box>
            )
          })}
        </Stack>
      </Box>

      {/* Navigation buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        {!isFirstQuestion && (
          <SecondaryActionButton onClick={onBack} showArrow={true} textColor="#BABABA">
            Back
          </SecondaryActionButton>
        )}

        {isLastQuestion && (
          <PrimaryActionButton onClick={onNext} from="question">
            Submit
          </PrimaryActionButton>
        )}
      </Box>
    </Box>
  )
}
