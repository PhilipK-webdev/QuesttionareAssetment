import { Snackbar, Alert, type AlertColor } from '@mui/material'
import { styled } from '@mui/material/styles'

// Styled Alert component matching app design
const StyledAlert = styled(Alert)(({ theme, severity }) => {
  const getBackgroundColor = () => {
    switch (severity) {
      case 'success':
        return '#4CAF50'
      case 'error':
        return '#F44336'
      case 'warning':
        return '#FF9800'
      case 'info':
        return '#2196F3'
      default:
        return '#4CAF50'
    }
  }

  return {
    backgroundColor: getBackgroundColor(),
    color: '#FFFFFF',
    borderRadius: '12px',
    fontFamily: 'Assistant, sans-serif, Rubik',
    fontWeight: 600,
    fontSize: '1rem',
    padding: '12px 20px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    '& .MuiAlert-icon': {
      color: '#FFFFFF',
      fontSize: '1.5rem',
    },
    '& .MuiAlert-message': {
      padding: '4px 0',
    },
  }
})

interface CustomSnackbarProps {
  open: boolean
  message: string
  severity?: AlertColor
  onClose: () => void
  autoHideDuration?: number
}

export const CustomSnackbar = ({
  open,
  message,
  severity = 'success',
  onClose,
  autoHideDuration = 4000,
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        marginTop: '20px',
      }}
    >
      <StyledAlert
        onClose={onClose}
        severity={severity}
        variant="filled"
        elevation={6}
      >
        {message}
      </StyledAlert>
    </Snackbar>
  )
}
