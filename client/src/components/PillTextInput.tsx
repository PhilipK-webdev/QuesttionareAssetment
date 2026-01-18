import { Box, TextField, Typography } from '@mui/material'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  label: string
  placeholder?: string
  required?: boolean
  error?: FieldError
  register: UseFormRegisterReturn
  type?: string
}

export function PillTextInput({
  label,
  placeholder,
  required,
  error,
  register,
  type = 'text',
}: Props) {
  return (
    <Box>
      <Typography sx={{ overflow: 'hidden',
        color: '#E9E9E9',
        textOverflow: 'ellipsis',
        fontSize:" 1.125rem",
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '1.5625rem',
        mb: 1 }}>
        {label} {required && '*'}
      </Typography>

      <TextField
        fullWidth
        type={type}
        placeholder={placeholder}
        error={!!error}
        helperText={error?.message}
        {...register}
        InputProps={{
          sx: {
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.92)',
      
            // 👇 placeholder styling
            '& input::placeholder': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#414141',
              fontSize: '0.875rem',
              fontWeight: 400,
              lineHeight: '1.5rem',
              opacity: 1, // IMPORTANT: MUI defaults placeholder opacity to ~0.5
            },
          },
        }}
      />
    </Box>
  )
}