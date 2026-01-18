import { SvgIcon } from '@mui/material'
import type { SvgIconProps } from '@mui/material'

export function ArrowRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32" sx={{ fontSize: '30px' }}>
      <path
        d="M6 17.5L28.5 17.5M28.5 17.5L20.294 26M28.5 17.5L20.294 9"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}