import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type defaultType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type defaultClear = Omit<
  defaultType,
  'min' | 'max' | 'step' | 'type' | 'disabled' | 'onChange' | 'value'
>

export type decimalSeparatorType = 'dot' | 'comma'

type IntegerProps = {
  type?: 'integer'
}

export type FloatProps = {
  type?: 'float'
  decimalSeparator?: decimalSeparatorType
}

export type INumberInput = defaultClear & {
  value?: null | number
  onChange?: (value: number | null) => void
  max?: number
  disabled?: boolean
  enableSeparator?: boolean
} & (IntegerProps | FloatProps)

export type processorParams = {
  type: 'float' | 'integer'
  value?: null | number
  onChange?: (value: number | null) => void
  max: number
  disabled: boolean
  enableSeparator: boolean
  decimalSeparator?: decimalSeparatorType
}
