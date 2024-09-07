import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type defaultType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type defaultClear = Omit<
  defaultType,
  'min' | 'max' | 'step' | 'type' | 'disabled'
>

export type INumberInput = defaultClear & {
  type?: 'float' | 'integer'
  onChange?: (value: number | null) => void
  max?: number
  disabled?: boolean
  enableSeparator?: boolean
  separator?: ' ' | '_'
  decimalSeparator?: 'dot' | 'comma'
}
