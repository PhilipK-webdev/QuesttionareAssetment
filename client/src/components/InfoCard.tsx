import { Box, IconButton, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { QuestionMarkIcon } from './icons/QuestionMarkIcon'

type Props = {
  title: string
  subtitles: string[] // 👈 now supports many
  tooltip?: string
  onStarClick?: () => void
}

export function InfoCard({
  title,
  subtitles,
  tooltip = 'More information about this metric',
  onStarClick,
}: Props) {
  return (
    <Box
      sx={{
        width: '16.47rem',
        height:'12.31rem',
        borderRadius: '1.5625rem',
        border: '2px solid #2B2D38',
        background: '#181E30',
        position: 'relative',
        overflowY: 'auto',
        px: '1rem',
        py: '1.875rem',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {/* Title row with question mark and star */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography sx={{ 
            color: '#ECECEC', 
            fontSize: {
              xs: '1.375rem',
              md: '1.375rem',
              lg: '1rem',
              xl: '1.375rem',
            }, 
            fontWeight: 400,
          }}>
            {title}
          </Typography>
          <QuestionMarkIcon tooltip={tooltip} size="medium" />
        </Stack>
        
        <IconButton
          onClick={onStarClick}
          sx={{
            width: 30,
            height: 30,
            borderRadius: '8px',
            color: '#40CBE8',
            p: 0,
            '&:hover': { background: 'rgba(64,203,232,0.18)' },
            transition: 'background 180ms ease',
          }}
        >
          <StarIcon sx={{ width: '1.5rem', height: '1.5rem' }} />
        </IconButton>
      </Stack>

      {/* Subtitles */}
      <Stack>
        {subtitles.map((text, idx) => (
          <Typography
            key={idx}
            sx={{
              color: '#40CBE8',
              fontSize: '0.85rem',
              fontWeight: 400,
              lineHeight: '1.25rem',
            }}
          >
            – {text}
          </Typography>
        ))}
      </Stack>
    </Box>
  )
}