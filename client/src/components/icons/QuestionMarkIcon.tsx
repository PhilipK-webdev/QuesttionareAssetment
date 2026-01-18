import { Box, Tooltip } from '@mui/material'
import QuestionMark from '@mui/icons-material/QuestionMark'

type Props = {
  tooltip: string
  size?: 'small' | 'medium'
}

export function QuestionMarkIcon({ tooltip, size = 'small' }: Props) {
  const dimensions = size === 'small' ? '.8rem' : '1rem'
  
  return (
    <Tooltip 
      title={tooltip} 
      arrow 
      placement="top"
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: '#2B2D38',
            color: '#ECECEC',
            fontSize: '0.75rem',
            padding: '8px 12px',
            borderRadius: '8px',
            maxWidth: 220,
            '& .MuiTooltip-arrow': {
              color: '#2B2D38',
            },
          },
        },
      }}
    >
      <Box
        sx={{
          p: 0.1,
          width: dimensions,
          height: dimensions,
          color: 'rgba(255,255,255,0.55)',
          borderRadius: '3.125rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #BABABA',
          cursor: 'help',
          '&:hover': { color: '#ECECEC' },
          transition: 'color 180ms ease',
        }}
      >
        <QuestionMark sx={{ fontSize: '.75rem' }} />
      </Box>
    </Tooltip>
  )
}
