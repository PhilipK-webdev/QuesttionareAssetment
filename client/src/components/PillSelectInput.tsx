import { Box, FormControl, FormHelperText, MenuItem, Select, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import type { Control, FieldError, FieldValues, FieldPath } from 'react-hook-form'
import { ArrowDownRegistrationIcon } from './icons/ArrowDownRegistrationIcon'

type Option = {
  value: string
  label: string
}

type Props<T extends FieldValues> = {
  label: string
  name: FieldPath<T>
  control: Control<T>
  options: Option[]
  placeholder: string
  required?: boolean
  error?: FieldError
}

export function PillSelectInput<T extends FieldValues>({
  label,
  name,
  control,
  options,
  placeholder,
  required,
  error,
}: Props<T>) {
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

      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => (
          <FormControl fullWidth error={!!error}>
            <Select
            IconComponent={ArrowDownRegistrationIcon}
              {...field}
              displayEmpty
              sx={{
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.92)',
              
                '& .MuiSelect-select': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: field.value ? '#000' : '#414141',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  lineHeight: '1.5rem',
                  pr: '3rem', // ✅ give space for the icon
                },
              
                // ✅ icon wrapper (this is what MUI rotates)
                '& .MuiSelect-icon': {
                  color: '#414141',
                  right: '1rem',
                  top: 'calc(50% - 0.5em)', // ✅ centers better for custom icons
                  transformOrigin: '50% 50%',
                  transition: 'transform 200ms ease',
                  fontSize: '1rem',
                },
              
                // ✅ make sure the svg behaves well inside the wrapper
                '& .MuiSelect-icon > *': {
                  display: 'block',
                },
              
                // ✅ rotate ONLY when the menu is open
                '&[aria-expanded="true"] .MuiSelect-icon': {
                  transform: 'rotate(180deg)',
                },
              }}
              renderValue={(val) => {
                const v = String(val ?? '')
                return v ? options.find((o) => o.value === v)?.label : placeholder
              }}
            >
              <MenuItem value="">{placeholder}</MenuItem>
              {options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </Box>
  )
}