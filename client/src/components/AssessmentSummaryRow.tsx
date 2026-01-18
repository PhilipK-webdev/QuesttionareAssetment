import { Box, Stack, Typography } from '@mui/material'
import { QuestionMarkIcon } from './icons/QuestionMarkIcon'

type Props = {
  eyebrow: string // e.g. "Mindset Assessment"
  title: string // e.g. "Growth Mindset"
  description: string
  score: number // e.g. 3.67
  maxScore?: number // default 5
  tooltip?: string
}

export function AssessmentSummaryRow({
  eyebrow,
  title,
  description,
  score,
  maxScore = 5,
  tooltip = 'Your combined score across all driving domains',
}: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
      }}
    >
      {/* LEFT */}
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.80)',
              fontSize: '1.375rem',
              fontWeight: 500,
              lineHeight: '1.25rem',
              whiteSpace: 'nowrap',
            }}
          >
            {eyebrow}
          </Typography>

          <QuestionMarkIcon tooltip={tooltip} size="medium" />
        </Stack>

        <Typography
          sx={{
            background: 'linear-gradient(180deg, #4AD8E0 0%, #49D2DF 19.97%, #47C1DF 29.96%, #45A5DF 49.94%, #417FDF 79.9%, #3C49DF 99.87%)',
backgroundClip: 'text',
WebkitBackgroundClip: 'text',
WebkitTextFillColor: 'transparent',
            fontSize: { xs: '1.6rem', md: '1.8rem', lg:'1.9375rem', xl:'1.9375rem' },
            fontWeight: 500,
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: 'rgba(255,255,255,0.70)',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.35rem',
            maxWidth: 720,
          }}
        >
          {description}
        </Typography>
      </Box>

      {/* RIGHT */}
      <Box sx={{ flexShrink: 0, textAlign: 'right', display: 'flex', gap: '0.5rem', alignItems: 'end' }}>
        <Typography
          sx={{
            background: 'linear-gradient(180deg, #4AD8E0 0%, #49D2DF 29.75%, #47C1DF 44.63%, #45A5DF 74.38%, #417FDF 119.02%, #3C49DF 148.77%);',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            fontSize: { xs: '3rem',md: '3.6rem', lg:'5.625rem', xl:'5.625rem' },
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {score.toFixed(2)}
        </Typography>

        <Typography
          sx={{
            color: 'rgba(255,255,255,0.70)',
            fontWeight: 400,
            fontSize: '1.375rem',
            
          }}
        >
          of {maxScore.toFixed(1)}
        </Typography>
      </Box>
    </Box>
  )
}