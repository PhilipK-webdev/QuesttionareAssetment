import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Button } from '@mui/material'
import type { ReactNode } from 'react'
import { ArrowRightIcon } from './icons/ArrowRightIcon'

type Props = {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  showArrow?: boolean
  from?:string
}

export function PrimaryActionButton({
  children,
  onClick,
  type = 'button',
  disabled,
  showArrow = false,
  from = '',
}: Props) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      endIcon={showArrow ? <ArrowRightIcon/> : undefined}
      sx={{
        '& .MuiButton-endIcon .MuiSvgIcon-root': {
          fontSize: 30,
        },
        borderRadius: '6.875rem',
        px: 4,
        py: 1.3,
        mt: {
          xs: from === 'question' || from === 'register' ? 0 : '2.81rem',
          md: from === 'question' || from === 'register' ? 0 : '2.81rem',
          lg: from === 'question' || from === 'register' ? 0 : '2.81rem',
          xl: from === 'question' || from === 'register' ? 0 : '2.81rem',
        },
        background:
          'linear-gradient(271deg, #4AD8E0 -3.23%, #49D2DF 18.16%, #47C1DF 28.85%, #45A5DF 50.23%, #417FDF 82.31%, #3C49DF 103.7%)',

        boxShadow: '0 0 20px 0 rgba(74, 216, 224, 0.28)',
        color: '#071C2A',
        fontWeight: 700,
        textTransform: 'none',
        fontSize:'1.175rem',
        transition: 'transform 200ms ease, box-shadow 200ms ease, filter 200ms ease',

        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 22px rgba(0,0,0,0.25)',
          filter: 'brightness(1.05)',
        },

        '&:active': {
          transform: 'translateY(0)',
          boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
        },
      }}
    >
      {children}
    </Button>
  )
}