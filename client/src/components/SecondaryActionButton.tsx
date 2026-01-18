import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button, Stack } from '@mui/material'
import type { ReactNode } from 'react'
import { ArrowIcon } from './icons/ArrowIcon'

type Props = {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean

  showArrow?: boolean
  arrowColor?: string
  background?: string
  textColor?: string
}

export function SecondaryActionButton({
  children,
  onClick,
  disabled,
  showArrow = false,
  arrowColor = 'currentColor',
  background = 'transparent',
  textColor = 'var(--PD-Grey-3, #E9E9E9)',
}: Props) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      disabled={disabled}
      sx={{
        color: textColor,
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: '1.5625rem',
        textTransform: 'none',
        pl:1,
        px: background !== 'transparent' ? 1.5 : 0,
        py: background !== 'transparent' ? 0.5 : 0,
        borderRadius: '999px',
        backgroundColor: background,
        transition: 'transform 200ms ease, box-shadow 200ms ease, filter 200ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          filter: 'brightness(1.05)',
        },
        '&:disabled': {
          opacity: 0.4,
        },
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {showArrow && (
          <ArrowIcon />
        )}
        {children}
      </Stack>
    </Button>
  )
}