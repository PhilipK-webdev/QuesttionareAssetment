import { Box, Typography } from '@mui/material'
import { ProfileRadarCard } from './ProfileRadarCard'

type Props = {
  userName: string
  drivingStyle: string
  radarLabels: readonly string[]
  radarValues: number[]
}

export function LearningProfileSection({
  userName,
  drivingStyle,
  radarLabels,
  radarValues,
}: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: { xs: 520, md: 420 },
        color: '#ECECEC',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 'inherit',  
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '47% 1fr' },
          gap: { xs: 4, md: 0 },
          alignItems: 'center',
          paddingLeft: {
            xs: '1rem',
            md: '0',
            lg: '0rem',
            xl: '2rem',
          },
        }}
      >
        {/* LEFT */}
        <Box sx={{ maxWidth: 520 }}>
          <Typography sx={{ opacity: 0.95, mb: 1, fontSize: '1.9375rem', fontWeight: 400 }}>
            {userName}
          </Typography>

          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '3.125rem',
              lineHeight: '3.91875rem',
              letterSpacing: '-0.09375rem',
              mb: 2,
            }}
          >
            Learning Profile
          </Typography>

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '1.375rem',
              lineHeight: '1.91875rem',
              letterSpacing: '-0.04125rem',
              opacity: 0.9,
              mb: 1,
            }}
          >
            Summary
          </Typography>

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '0.875rem',
              lineHeight: '1.5rem',
              opacity: 0.78,
              maxWidth: {
                xs: '100%',
                md: 520,
                lg: 300,
                xl: 520,
              },
            }}
          >
            {drivingStyle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: {
              xs: '100%',
              md: '22vw',
              lg: '34vw',
              xl: '31vw',
            },
            borderRadius: '1.5625rem',
            padding: '1rem 1.875rem',
            background: 'var(--PD-Res-2, #181E30)',
            border: '2px solid var(--PD-Res3, #2B2D38)',
          }}
        >
          <Box
            sx={{
              borderRadius: 3,
              display: 'grid',
              fontSize: 14,
            }}
          >
            <ProfileRadarCard labels={[...radarLabels]} values={radarValues} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
