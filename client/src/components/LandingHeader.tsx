import { Box, MenuItem, Select } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { ArrowDownIcon } from '../components/icons/ArrowDownIcon'
import { LogoIcon } from './icons/LogoIcon'
import { DownloadIcon } from './icons/DownloadIcon'
import { ShareIcon } from './icons/ShareIcon'

type Props = {
  logoSrc: string,
  showSelectLanguage: boolean,
  isIcon: boolean,
  isResultPage?: boolean
}

export function LandingHeader({ logoSrc, showSelectLanguage = true, isIcon = false, isResultPage = false }: Props) {
  const [lang, setLang] = useState('en')

  const handleChange = (e: SelectChangeEvent) => {
    setLang(e.target.value)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        ...(isResultPage && {
          px:{
            xs: '1rem',
            md: '3.75rem',
            lg: '.375rem',
            xl: '2.375rem',
          },
          py:{
            xs: '1rem',
            md: '3.75rem',
            lg: '2.375rem',
            xl: '2.375rem',
          }
        }),
      }}
    >
      {isIcon ? <LogoIcon /> :  <Box
        component="img"
        src={logoSrc}
        alt="Logo"
        sx={{
          height: 28,
          width: 'auto',
          display: 'block',
        }}
      />
      }
     

{showSelectLanguage && (
<Select
  // size="small"
  value={lang}
  onChange={handleChange}
  IconComponent={ArrowDownIcon}
  sx={{
    width: 160,                 // adjust if you want
    height: 40,  
    borderRadius: '1.875rem',
    backgroundColor: 'rgba(0,0,0,0.15)',
    color: 'white',

    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #D7D9DF',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255,0.9)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255,0.9)',
    },

    '& .MuiSelect-select': {
      paddingRight: '3.25rem',
      paddingLeft: '2rem',
    },

    '& .MuiSelect-icon': {
      right: '2rem',
      color: '#D7D9DF',
      fontSize: '16px',
      transition: 'transform 200ms ease',
    },

    '&[aria-expanded="true"] .MuiSelect-icon': {
      transform: 'rotate(180deg)',
    },
  }}
>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="he">Hebrew</MenuItem>
      </Select>
      )}
      {isResultPage ? <Box sx={{ display: 'flex', gap: '1rem' }}>
       <Box onClick={handlePrint} sx={{cursor: 'pointer'}}><DownloadIcon /></Box>
      </Box> : null}
    </Box>
  )
}