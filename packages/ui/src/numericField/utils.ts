import type { ChangeEvent, KeyboardEvent } from 'react'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

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
}

export default class InputNumberUtils {
  static actionKeys = ['Delete', 'Backspace', 'ArrowLeft', 'ArrowRight']
  static modifiedKeys = ['a', 'A', 'v', 'V', 'c', 'C', 'x', 'X']
  static numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  static preventRepeat = (event: KeyboardEvent<HTMLInputElement>): boolean => {
    if (event.repeat && !this.actionKeys.includes(event.key)) {
      event.preventDefault()

      return true
    }

    return false
  }

  static preventNonNumbers = (
    event: KeyboardEvent<HTMLInputElement>,
    type: 'float' | 'integer',
  ): boolean => {
    const allow: string[] = [...this.numberKeys, ...this.actionKeys, '-']

    if (type === 'float') {
      allow.push('.')
    }

    if (
      allow.includes(event.key) ||
      (event.ctrlKey && this.modifiedKeys.includes(event.key)) ||
      (event.altKey && this.modifiedKeys.includes(event.key))
    ) {
      return false
    }

    event.preventDefault()
    return true
  }

  static preventMax = (
    event: KeyboardEvent<HTMLInputElement>,
    max: number,
  ): boolean => {
    const input = event.target as HTMLInputElement
    const expectedString = input.value + event.key

    // Check if the expected value exceeds the maximum
    const expectedValue = parseFloat(expectedString)

    if (!isNaN(expectedValue) && expectedValue > max) {
      event.preventDefault() // Prevent the default action if it exceeds max
      return true
    }

    return false
  }

  static formatInput = (
    event: KeyboardEvent<HTMLInputElement>,
    enableSeparator: boolean,
  ): boolean => {
    if (!this.numberKeys.includes(event.key)) return true

    const input = event.target as HTMLInputElement

    // Delay the formatting to allow the default input to occur first
    setTimeout(() => {
      const expectedString = input.value

      // Split the input string into integer and fractional parts
      const [integerPart, fractionalPart] = expectedString.split('.')

      // Use a regular expression to add the separator every 3 digits
      const formattedInteger = integerPart!
        .replace(/\s+/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, enableSeparator ? ' ' : '')

      input.value =
        fractionalPart ?
          `${formattedInteger}.${fractionalPart}`
        : formattedInteger
    }, 0)

    return true
  }

  static onChange = (
    event: ChangeEvent<HTMLInputElement>,
    enableSeparator: boolean,
    func?: (value: number | null) => void,
  ): void | null => {
    const { value } = event.target

    if (!func) return

    const trimmedValue = value?.trim()

    if (!trimmedValue) {
      return func(null)
    }

    const regex = new RegExp(enableSeparator ? ' ' : '', 'g')
    const formattedValue = trimmedValue.replace(regex, '')

    func(Number(formattedValue))
  }
}

/*
 *
 * Resources :
 * https://www.magentaa11y.com/checklist-web/number-input
 * https://stackoverflow.blog/2022/12/26/why-the-number-input-is-the-worst-input
 *https://stackoverflow.com/questions/59584061/why-is-unidentified-returned-on-keyboard-input-on-mobile
 */
