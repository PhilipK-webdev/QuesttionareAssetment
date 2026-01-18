import { Box, Container } from '@mui/material'

type Props = {
  children: React.ReactNode
  pageBg?: string
  backgroundImage?: string,
  from?:string
}

export function PageLayout({ children, pageBg = '#E9E9E9', backgroundImage, from }: Props) {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: pageBg, py: { sm: 2, md: 2, background: from === 'questionnaire' ? `url(${backgroundImage}) lightgray 50% / cover no-repeat` : 'none' } }}>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: { sm: 3, md: 3 }, // outer gutters (space from screen edges)
        }}
      >
        <Box
          sx={{
            // ✅ makes the frame scale with the screen, with a max cap
            width: 'min(1400px, 94vw)',

            borderRadius: '2.1875rem',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            // gap: '0.625rem' ,
            flex: '1 0 0',
            alignSelf: 'stretch',

            px: from === 'questionnaire' ? { sm: '0rem', md: '0rem'} : { sm: '2rem', md: '2rem', xl: '3rem'},   
            py: from === 'questionnaire' ? { sm: '0rem', md: '0rem' } : { sm: '2rem', md: '2rem'},  // 20px → 32px
            pt: from === 'questionnaire' ? { xl: '0rem' } : { sm: '2rem', md: '2rem'},  // 20px → 32px
            pb: from === 'questionnaire' ? { xl: '0rem' } : { sm: '2rem', md: '0rem'},  // 20px → 32px
            minHeight: from === 'questionnaire' ? { sm: 560, md: 640 } : { sm: 560, md: 640 },
            position: 'relative',

            ...(backgroundImage && from !== 'questionnaire'
              ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }
              : {}),
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}