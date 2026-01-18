import { Tooltip } from '@mui/material'

export function DownloadIcon() {
    return (
        <Tooltip 
            title="Print or save your results" 
            arrow 
            placement="bottom"
            slotProps={{
                tooltip: {
                    sx: {
                        bgcolor: '#2B2D38',
                        color: '#ECECEC',
                        fontSize: '0.75rem',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        '& .MuiTooltip-arrow': {
                            color: '#2B2D38',
                        },
                    },
                },
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path d="M17.4583 5L17.4583 20.64M17.4583 20.64L10.5833 14.0584M17.4583 20.64L24.3333 14.0584M28 22.48L28 28L6 28L6 22.48" stroke="#E9E9E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Tooltip>
    )
}