import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react'

import { validatorProps } from './types'

type ClipEvent = ClipboardEvent<HTMLInputElement>
type KeyEvent = KeyboardEvent<HTMLInputElement>
type ReformEvent = ChangeEvent<HTMLInputElement>

const Key = {
  DecimalPoint: '.',
  DecimalComma: ',',
  MinusSign: '-',
}

const Keys = {
  Navigation: [
    'Backspace', // Deletes the character before the cursor
    'Delete', // Deletes the character after the cursor
    'Tab', // Moves focus to the next form element
    'ArrowLeft', // Moves the cursor one character to the left
    'ArrowRight', // Moves the cursor one character to the right
    'Home', // Moves the cursor to the beginning of the input
    'End', // Moves the cursor to the end of the input
  ],
  FormControl: [
    'Enter', // Submits the form or input
    'Escape', // Cancels the current operation or closes dialogs
  ],
  Numbers: [
    '0', // Zero
    '1', // One
    '2', // Two
    '3', // Three
    '4', // Four
    '5', // Five
    '6', // Six
    '7', // Seven
    '8', // Eight
    '9', // Nine
  ],
  Operations: [
    'a', // Select all operation key (Ctrl/Cmd + A)
    'A', // Select all operation key (Ctrl/Cmd + A)
    'v', // Paste operation key (Ctrl/Cmd + V)
    'V', // Paste operation key (Ctrl/Cmd + V)
    'c', // Copy operation key (Ctrl/Cmd + V)
    'C', // Copy operation key (Ctrl/Cmd + V)
    'x', // Cut operation key (Ctrl/Cmd + V)
    'X', // Cut operation key (Ctrl/Cmd + V)
  ],
}

const allowedKeys = [
  ...Keys.Navigation,
  ...Keys.FormControl,
  ...Keys.Numbers,
  ...Object.values(Key),
]

export default class Validator {
  static isAnOperation = (event: KeyEvent): boolean => {
    return (
      (event.ctrlKey || event.metaKey) && Keys.Operations.includes(event.key)
    )
  }

  static getCaretPosition = (
    targetElement: HTMLInputElement,
    event: KeyEvent,
  ): number => {
    let caretPosition = targetElement.selectionStart ?? 0

    switch (event.key) {
      case 'ArrowLeft':
        caretPosition = Math.max(caretPosition - 1, 0)
        break
      case 'ArrowRight':
        caretPosition = Math.min(caretPosition + 1, targetElement.value.length)
        break
      case 'Backspace':
        caretPosition = Math.max(caretPosition - 1, 0)
        break
      case 'Delete':
        // The caret stays in place, so no adjustment is needed for Delete
        break
      default:
        // For other keys, we assume the key inserts one character, moving the caret forward
        if (event.key.length === 1) {
          // Only adjust for single character input
          caretPosition += 1
        }
        break
    }

    return caretPosition
  }

  static formatValue = (
    value: string | undefined,
    enableSeparator: boolean,
    key: string,
  ) => {
    const stringValue = value ?? ''

    const formatedCurrentValue =
      enableSeparator ? stringValue.replace(/\s+/g, '') : value

    // console.log({ stringValue, formatedCurrentValue })

    const suffix =
      [...Object.values(Key), ...Keys.Numbers].includes(key) ? key : ''

    return {
      currentValue: formatedCurrentValue,
      expectedValue: formatedCurrentValue + suffix,
    }
  }

  static onPaste = (event: ClipEvent, config: validatorProps): void => {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value
    const pastedText = event.clipboardData.getData('text')
    const { type, decimalSeparator, enableSeparator, scale, max } = config

    const caretPosition = inputElement.selectionStart

    const firstPart = inputValue.slice(0, caretPosition!)
    const secondPart = inputValue.slice(caretPosition!)

    const regex = new RegExp(enableSeparator ? ' ' : '', 'g')

    const expectedValue = (firstPart + pastedText + secondPart)
      .replace(regex, '')
      .replace(',', '.')

    const expectedNumber = Number(expectedValue.replace(',', '.'))

    if (isNaN(expectedNumber)) {
      return event.preventDefault()
    }

    if (max && expectedNumber > max) {
      return event.preventDefault()
    }

    const [integerPart, fractionalPart] = expectedValue
      .replace(',', '.')
      .split('.')

    if (type === 'float' && scale && (fractionalPart ?? '')?.length > scale) {
      return event.preventDefault()
    }

    if (enableSeparator) {
      const separator = decimalSeparator === 'comma' ? ',' : '.'

      const formattedInteger = integerPart!.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        enableSeparator ? ' ' : '',
      )

      inputElement.value =
        fractionalPart ?
          `${formattedInteger}${separator}${fractionalPart}`
        : formattedInteger

      return event.preventDefault()
    }
  }

  static onKeyDown = (event: KeyEvent, config: validatorProps): void => {
    const { type, decimalSeparator, enableSeparator, max, scale } = config

    /**
     *  **/
    if (!allowedKeys.includes(event.key) && !this.isAnOperation(event)) {
      return event.preventDefault()
    }

    if (
      type === 'integer' &&
      [Key.DecimalComma, Key.DecimalPoint].includes(event.key)
    ) {
      return event.preventDefault()
    }

    if (decimalSeparator === 'comma' && event.key === Key.DecimalPoint) {
      return event.preventDefault()
    }

    if (decimalSeparator === 'dot' && event.key === Key.DecimalComma) {
      return event.preventDefault()
    }

    /**
     *
     * **/
    if (event.repeat && !Keys.Navigation.includes(event.key)) {
      return event.preventDefault()
    }

    const targetElement = event.target as HTMLInputElement
    const { currentValue, expectedValue } = this.formatValue(
      targetElement.value,
      enableSeparator,
      event.key,
    )

    const caretPosition = this.getCaretPosition(targetElement, event)

    if (caretPosition !== 1 && event.key === '-') {
      return event.preventDefault()
    }

    if (event.key === Key.DecimalComma || event.key === Key.DecimalPoint) {
      if (!currentValue?.length) {
        return event.preventDefault()
      }

      if (currentValue[0] === '-' && currentValue.length === 1) {
        return event.preventDefault()
      }

      if (currentValue.includes('.') || currentValue.includes(',')) {
        return event.preventDefault()
      }
    }

    const expectedNumberValue = parseFloat(expectedValue)

    if (!isNaN(expectedNumberValue) && expectedNumberValue > max) {
      return event.preventDefault()
    }

    const [integerPart, fractionalPart] = expectedValue
      .replace(',', '.')
      .split('.')

    if (
      type === 'float' &&
      scale &&
      fractionalPart &&
      fractionalPart?.length > scale
    ) {
      return event.preventDefault()
    }

    if (enableSeparator && Keys.Numbers.includes(event.key)) {
      const separator = decimalSeparator === 'comma' ? ',' : '.'

      const formattedInteger = integerPart!.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        enableSeparator ? ' ' : '',
      )

      targetElement.value =
        fractionalPart ?
          `${formattedInteger}${separator}${fractionalPart}`
        : formattedInteger

      return event.preventDefault()
    }
  }

  static stringToNumber = (value: string, config: validatorProps) => {
    const { enableSeparator } = config

    const regex = new RegExp(enableSeparator ? ' ' : '', 'g')
    const formattedValue = value.replace(regex, '').replace(',', '.')

    const parsedValue = Number(formattedValue)

    return isNaN(parsedValue) ? null : parsedValue
  }

  static onChange = (event: ReformEvent, config: validatorProps): void => {
    const { onChange } = config
    const { value } = event.target

    if (!onChange) return

    onChange(this.stringToNumber(value, config), event)
  }

  static numberToString = (
    value: number | null,
    config: validatorProps,
  ): string => {
    if (!value) return ''
    const { enableSeparator, decimalSeparator } = config
    const separator = decimalSeparator === 'comma' ? ',' : '.'

    const [integerPart, fractionalPart] = value.toString().split('.')

    const formattedInteger = integerPart!
      .replace(/\s+/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, enableSeparator ? ' ' : '')

    return fractionalPart ?
        `${formattedInteger}${separator}${fractionalPart}`
      : formattedInteger
  }
}
