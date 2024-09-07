import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type defaultType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type defaultClear = Omit<
  defaultType,
  'min' | 'max' | 'step' | 'type' | 'disabled' | 'onChange' | 'value'
>

export type INumberInput = defaultClear & {
  type?: 'float' | 'integer'
  value?: null | number
  onChange?: (value: number | null) => void
  max?: number
  disabled?: boolean
  enableSeparator?: boolean
  decimalSeparator?: 'dot' | 'comma'
}
