import type { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

type IHTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type IHTMLInputPropsCleared = Omit<
  IHTMLInputProps,
  'min' | 'max' | 'step' | 'type' | 'disabled' | 'onChange' | 'value'
>

export type decimalSeparatorType = 'dot' | 'comma'

type IntegerProps = {
  type?: 'integer'
}

export type FloatProps = {
  type?: 'float'
  decimalSeparator?: decimalSeparatorType
  scale?: number
}

type BaseProps = {
  value?: null | number
  onChange?: (
    value: number | null,
    event: ChangeEvent<HTMLInputElement>,
  ) => void
  max?: number
  disabled?: boolean
  enableSpacing?: boolean
}

export type INumericFieldProps = IHTMLInputPropsCleared &
  (IntegerProps | FloatProps) &
  BaseProps

export type IInternalProps = IHTMLInputPropsCleared &
  BaseProps & {
    type: 'float' | 'integer'
    decimalSeparator: decimalSeparatorType | undefined
    scale: number | undefined
  }

export type validatorProps = {
  type: 'float' | 'integer'
  value?: null | number
  onChange?: (
    value: number | null,
    event: ChangeEvent<HTMLInputElement>,
  ) => void
  max: number
  disabled: boolean
  enableSpacing: boolean
  decimalSeparator?: decimalSeparatorType
  scale?: number
}
