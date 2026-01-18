import { Box } from '@mui/material'
import { RadarChart } from '@mui/x-charts/RadarChart'

type Props = {
  labels: string[]
  values: number[] // same length as labels
}

export function ProfileRadarCard({ labels, values }: Props) {
  return (
    <Box
      sx={{
        width:'38rem',
        height: '40vh',
      }}
    >
      <RadarChart
       highlight="series"
       sx={{  
        '& .MuiRadarGrid-stripe': {
          fill: 'rgba(64, 203, 232, 0.40)',
          strokeWidth: '1px',
          stroke: '#8C8C8C',
        },
        '& .MuiRadarGrid-radial': {
          fill: 'rgba(64, 203, 232, 0.40)',
          strokeWidth: '1px',
          stroke: '#8C8C8C',
          
        },

        '& svg text': {
            fill: '#fff !important',
            fontSize: '1rem !important',
            lineHeight: '1.5625rem !important',
            fontWeight: 400,
          },
          
        // If your version uses circle elements (fallback)
        '& .MuiChartsRadarSeries-root circle': {
          fill: 'rgba(64, 203, 232, 0.40)',
          stroke: '#40CBE8',
          strokeWidth: '2px',
        },
        '& .MuiRadarSeriesPlot-area': {
            strokeWidth: 2, 
            
          },
      }}
        series={[
          {
            data: values,
            color: '#40CBE8',   // series base color
            fillArea: true, 
          },
        ]}
        
        radar={{
          max: 5, // set your scale (e.g. 1–5)
          metrics: labels,
        }}
      />
    </Box>
  )
}