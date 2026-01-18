import { Box, IconButton, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { QuestionMarkIcon } from './icons/QuestionMarkIcon'

type DomainKey = 'Reaction Speed' | 'Vehicle Control' | 'Spatial Awareness' | 'Road Behavior'

type DomainRow = {
  key: DomainKey
  score: number // e.g. 3.2
  max: number // e.g. 4
  category?: string // e.g. 'Low', 'Medium', 'High'
  categoryLabel?: string // e.g. 'Needs Improvement', 'Average', 'Safe'
}

type Props = {
  title?: string
  rows: DomainRow[]
  note?: string
  onStarClick?: () => void
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

// Get color based on category
function getCategoryColor(category?: string): string {
  switch (category?.toLowerCase()) {
    case 'high':
      return '#4ADE80' // Green
    case 'medium':
      return '#FBBF24' // Yellow/Amber
    case 'low':
      return '#F87171' // Red
    default:
      return '#BABABA' // Gray
  }
}

// Get tooltip text based on domain
function getDomainTooltip(domain: DomainKey): string {
  switch (domain) {
    case 'Reaction Speed':
      return 'How quickly you respond to unexpected situations on the road'
    case 'Vehicle Control':
      return 'Your ability to maintain control of the vehicle in various conditions'
    case 'Spatial Awareness':
      return 'Your perception of surrounding vehicles, obstacles, and road layout'
    case 'Road Behavior':
      return 'Your adherence to traffic rules and safe driving practices'
    default:
      return 'Performance metric for this driving domain'
  }
}

export function DriverDomainsCard({
  title = 'Driver Domains',
  rows,
  note,
  onStarClick,
}: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        p: { xs: 3, md: 4 },
        borderRadius: '1.5625rem',
        border: '2px solid #2B2D38',
        background: '#181E30',
        backdropFilter: 'blur(10px)',
        color: '#ECECEC',
        mt: '-1rem',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Typography sx={{ fontWeight: 600, fontSize: '1.375rem' }}>
            {title}
          </Typography>

          <QuestionMarkIcon 
            tooltip="Breakdown of your performance across different driving skill areas" 
            size="medium" 
          />
        </Stack>

        <IconButton
          onClick={onStarClick}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '12px',
            color: '#40CBE8',
            position: 'absolute',
            right: '1.7rem',
            top: {
              xs: '1.875rem',
              md: '1.875rem',
              lg: '1.55rem',
              xl: '1.875rem',
            },
            '&:hover': { background: 'rgba(64,203,232,0.18)' },
            transition: 'background 180ms ease',
          }}
        >
          <StarIcon sx={{ width: '1.875rem', height: '1.875rem' }} />
        </IconButton>
      </Box>

      {/* Rows */}
      <Stack spacing={2.2}>
        {rows.map((r) => {
          const pct = (clamp(r.score, 0, r.max) / r.max) * 100
          const categoryColor = getCategoryColor(r.category)

          return (
            <Box
              key={r.key}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '220px 140px 1fr' },
                alignItems: 'center',
                gap: { xs: 1, md: 3 },
              }}
            >
              {/* Left label */}
              <Stack direction="row" spacing={0.8} alignItems="center">
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    color: '#ECECEC',
                  }}
                >
                  {r.key}
                </Typography>

                <QuestionMarkIcon 
                  tooltip={getDomainTooltip(r.key)} 
                  size="small" 
                />
              </Stack>

              {/* Score with category label */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  textAlign: { xs: 'left', md: 'right' },
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    color: '#BABABA',
                  }}
                >
                  <Box component="span" sx={{ color: '#40CBE8', fontWeight: 500 }}>
                    {r.score.toFixed(1)}
                  </Box>{' '}
                  <Box component="span" sx={{ color: '#BABABA' }}>
                    / {r.max}
                  </Box>
                </Typography>
                
                {/* Category badge */}
                {r.categoryLabel && (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 1,
                      py: 0.25,
                      borderRadius: '0.5rem',
                      background: `${categoryColor}20`,
                      border: `1px solid ${categoryColor}50`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: categoryColor,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {r.categoryLabel}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Progress */}
              <Box
                sx={{
                  height: '1.25rem', // figma: 1.25rem
                  borderRadius: '3.75rem', // figma: 3.75rem
                  background: 'rgba(255,255,255,0.35)', // the "track"
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${pct}%`,
                    borderRadius: '3.75rem',
                    background:
                      'linear-gradient(270deg, #4AD8E0 0%, #49D2DF 20.26%, #47C1DF 30.39%, #45A5DF 50.64%, #417FDF 81.03%, #3C49DF 101.28%)',
                    transition: 'width 300ms ease',
                  }}
                />
              </Box>
            </Box>
          )
        })}
      </Stack>

      {/* Note */}
      {note && (
        <Typography
          sx={{
            mt: 3,
            fontFamily: 'Rubik',
            fontSize: '0.9rem',
            lineHeight: '1.35rem',
            color: 'rgba(255,255,255,0.70)',
          }}
        >
          {note}
        </Typography>
      )}
    </Box>
  )
}
