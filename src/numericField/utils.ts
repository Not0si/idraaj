import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react'

import { processorParams } from './types'

const keys = {
  navigation: [
    'Backspace', // Deletes the character before the cursor
    'Delete', // Deletes the character after the cursor
    'Tab', // Moves focus to the next form element
    'ArrowLeft', // Moves the cursor one character to the left
    'ArrowRight', // Moves the cursor one character to the right
    'Home', // Moves the cursor to the beginning of the input
    'End', // Moves the cursor to the end of the input
  ],
  formControl: [
    'Enter', // Submits the form or input
    'Escape', // Cancels the current operation or closes dialogs
  ],
  special: [
    '.', // Decimal point for floating-point numbers
    ',', // Decimal comma for floating-point numbers
    '-', // Minus sign for negative numbers
  ],
  numbers: [
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
  operations: [
    'a', // Select all operation key (Ctrl/Cmd + A)
    'A', // Select all operation key (Ctrl/Cmd + A)
    'v', // Paste operation key (Ctrl/Cmd + V)
    'V', // Paste operation key (Ctrl/Cmd + V)
    'c', // Copy operation key (Ctrl/Cmd + V)
    'C', // Copy operation key (Ctrl/Cmd + V)
    'x', // Cut operation key (Ctrl/Cmd + V)
    'X', // Cut operation key (Ctrl/Cmd + V)
  ],
  isAnOperation: (event: KeyboardEvent): Boolean => {
    return (
      (event.ctrlKey || event.metaKey) && keys.operations.includes(event.key)
    )
  },
}

interface EventWithPreventDefault {
  preventDefault(): void
}

const executer = <T extends EventWithPreventDefault>(
  handlers: Array<(event: T, params: processorParams) => boolean>,
  params: processorParams,
  event: T,
) => {
  handlers.forEach((handler) => {
    const shouldPreventDefault = handler(event, params)
    if (shouldPreventDefault && event) {
      event.preventDefault()
    }
  })
}

export class PastProcessor {
  static handleDefault = (
    event: ClipboardEvent<HTMLInputElement>,
    params: processorParams,
  ) =>
    executer<ClipboardEvent<HTMLInputElement>>(
      [this.preventNonNumber],
      params,
      event,
    )

  static preventNonNumber(
    event: ClipboardEvent<HTMLInputElement>,
    { max }: processorParams,
  ) {
    const pastedText = event.clipboardData.getData('text')
    const pastedNumber = Number(pastedText)

    if (!pastedNumber) return true

    if (max && pastedNumber > max) return true

    return false
  }
}

export class IOProcessor {
  static formatInput = (
    value: number | null,
    enableSeparator: boolean,
  ): string | undefined => {
    if (!value) return undefined

    const [integerPart, fractionalPart] = value.toString().split('.')

    const formattedInteger = integerPart!
      .replace(/\s+/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, enableSeparator ? ' ' : '')

    const newValue =
      fractionalPart ?
        `${formattedInteger}.${fractionalPart}`
      : formattedInteger

    // console.log({ integerPart, fractionalPart, newValue })

    return newValue
  }

  static formatOutput = (
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

    const parsedValue = Number(formattedValue.replace(',', '.'))
    func(isNaN(parsedValue) ? null : parsedValue)
  }
}

export class KeyDownProcessor {
  static allowedKeys = [
    ...keys.navigation,
    ...keys.formControl,
    ...keys.special,
    ...keys.numbers,
  ]

  static handleDefault = (
    event: KeyboardEvent<HTMLInputElement>,
    params: processorParams,
  ) =>
    executer<KeyboardEvent<HTMLInputElement>>(
      [
        this.preventNonNumeric,
        this.preventRepeat,
        this.preventDecimalSeparator,
        this.preventMax,
        this.preventSpecial,
        this.formatInput,
      ],
      params,
      event,
    )

  static preventNonNumeric = (event: KeyboardEvent): boolean => {
    if (this.allowedKeys.includes(event.key) || keys.isAnOperation(event))
      return false

    return true
  }

  static preventRepeat = (event: KeyboardEvent): boolean => {
    if (
      event.repeat &&
      !keys.navigation.includes(event.key) &&
      !keys.formControl.includes(event.key)
    )
      return true

    return false
  }

  static preventDecimalSeparator = (
    event: KeyboardEvent,
    { type, decimalSeparator }: processorParams,
  ): boolean => {
    if (event.key !== '.' && event.key !== ',') {
      return false // Initialized to an empty string
    }

    if (type === 'integer') {
      return true
    }

    const value = (event.target as HTMLInputElement).value

    if (
      !value?.length ||
      (value.length === 1 && value[0] === '-') ||
      value.includes('.') ||
      value.includes(',')
    ) {
      return true
    }

    if (
      (decimalSeparator === 'comma' && event.key === '.') ||
      (decimalSeparator === 'dot' && event.key === ',')
    ) {
      return true
    }

    return false
  }

  static preventMax = (
    event: KeyboardEvent,
    { max }: processorParams,
  ): boolean => {
    if (!keys.numbers.includes(event.key)) return false

    const input = event.target as HTMLInputElement
    const expectedString = (input.value + event.key)
      .replace(/\s+/g, '')
      .replace(',', '.')

    const expectedValue = parseFloat(expectedString)

    if (!isNaN(expectedValue) && expectedValue > max) {
      return true
    }

    return false
  }

  static preventSpecial = (event: KeyboardEvent): boolean => {
    const value = (event.target as HTMLInputElement).value

    if (value?.length !== 0 && event.key === '-') {
      return true
    }

    if (value?.[0] === '0' && event.key === '0') {
      return true
    }

    return false
  }

  static formatInput = (
    event: KeyboardEvent,
    { enableSeparator, decimalSeparator }: processorParams,
  ): boolean => {
    if (keys.numbers.includes(event.key)) {
      const input = event.target as HTMLInputElement

      // Delay the formatting to allow the default input to occur first
      // setTimeout(() => {
      const expectedString = input.value

      // Split the input string into integer and fractional parts
      const [integerPart, fractionalPart] = expectedString
        .replace(',', '.')
        .split('.')

      // Use a regular expression to add the separator every 3 digits
      const formattedInteger = integerPart!
        .replace(/\s+/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, enableSeparator ? ' ' : '')

      input.value =
        fractionalPart ?
          `${formattedInteger}${decimalSeparator ? decimalSeparator : ''}${fractionalPart}`
        : formattedInteger
    }

    return false
  }
}
