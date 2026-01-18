import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { CoffeIcon } from './icons/CoffeIcon'

type Props = {
  current: number
  total: number
  onSave: () => void
}

export function SaveAndProgress({ current, total, onSave }: Props) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <Stack direction="row" spacing={1} alignItems="center" gap={1}>
      {/* Save & finish later */}
      <Button
        onClick={onSave}
        variant="text"
        sx={{
          textTransform: 'none',
          color: '#BABABA',
          fontWeight: 400,
          fontSize: '1.375rem',
          lineHeight: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          gap: 1,
          p: 0,
          minWidth: 0,
          '&:hover': { backgroundColor: 'transparent', color: 'rgba(153, 148, 148, 0.95)' },
          transition: 'color 220ms ease',
        }}
      >
        Save &amp; finish later
        {/* coffee icon placeholder */}
        <CoffeIcon />
      </Button>

      {/* Progress circle */}
      <Box
        sx={{
          width: '100px',
          height: '100px',
          position: 'relative',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {/* track */}
        <CircularProgress
          variant="determinate"
          value={100}
          thickness={4}
          size={100}
          sx={{
            color: '#E9E9E9',
            width: '100px',
            height: '100px',
          }}
        />

        {/* progress */}
        <CircularProgress
          variant="determinate"
          value={percent}
          thickness={4}
          size={100}
          sx={{
            position: 'absolute',
            color: '#BABABA',
            width: '100px',
            height: '100px',
          }}
        />

        {/* center text */}
        <Box sx={{ position: 'absolute', textAlign: 'center' }}>
          <Typography
            sx={{
              color: '#BABABA',
              fontWeight:700,
              fontSize: '1.425rem',
              lineHeight: '1.5rem',
            }}
          >
            {current}/{total}
          </Typography>
        </Box>
      </Box>
    </Stack>
  )
}