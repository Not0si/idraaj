import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react'

const navigationEditingKeys = [
  'Backspace', // Deletes the character before the cursor
  'Delete', // Deletes the character after the cursor
  'Tab', // Moves focus to the next form element
  'ArrowLeft', // Moves the cursor one character to the left
  'ArrowRight', // Moves the cursor one character to the right
  'Home', // Moves the cursor to the beginning of the input
  'End', // Moves the cursor to the end of the input
]

const formControlKeys = [
  'Enter', // Submits the form or input
  'Escape', // Cancels the current operation or closes dialogs
]

const specialCharacters = [
  '.', // Decimal point for floating-point numbers
  ',', // Decimal comma for floating-point numbers
  '-', // Minus sign for negative numbers
]

const numberKeys = [
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
]

const operationCharacters = [
  'a', // Select all operation key (Ctrl/Cmd + A)
  'A', // Select all operation key (Ctrl/Cmd + A)
  'v', // Paste operation key (Ctrl/Cmd + V)
  'V', // Paste operation key (Ctrl/Cmd + V)
  'c', // Copy operation key (Ctrl/Cmd + V)
  'C', // Copy operation key (Ctrl/Cmd + V)
  'x', // Cut operation key (Ctrl/Cmd + V)
  'X', // Cut operation key (Ctrl/Cmd + V)
]

const isAnOperation = (event: KeyboardEvent): Boolean => {
  return (
    (event.ctrlKey || event.metaKey) && operationCharacters.includes(event.key)
  )
}

export class PastProcessor {
  static preventNonNumber(
    event: ClipboardEvent<HTMLInputElement>,
    max?: number,
  ) {
    const pastedText = event.clipboardData.getData('text')
    const pastedNumber = Number(pastedText)

    if (!pastedNumber) {
      event.preventDefault()
      return true
    }

    if (max && pastedNumber > max) {
      event.preventDefault()

      return true
    }
  }
}

export class ChangeProcessor {
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

export class KeyDownProcessor {
  static allowedKeys = [
    ...navigationEditingKeys,
    ...formControlKeys,
    ...specialCharacters,
    ...numberKeys,
  ]

  static preventNonNumeric = (event: KeyboardEvent): boolean => {
    if (this.allowedKeys.includes(event.key) || isAnOperation(event)) {
      return false
    }

    event.preventDefault()
    return true
  }

  static preventRepeat = (event: KeyboardEvent): boolean => {
    if (
      event.repeat &&
      !navigationEditingKeys.includes(event.key) &&
      !formControlKeys.includes(event.key)
    ) {
      event.preventDefault()
      return true
    }

    return false
  }

  static preventDecimalSeparator = (
    event: KeyboardEvent,
    type: 'float' | 'integer',
    decimalSeparator: 'dot' | 'comma',
  ): boolean => {
    if (event.key !== '.' && event.key !== ',') {
      return false
    }

    if (type === 'integer') {
      event.preventDefault()
      return true
    }

    const value = (event.target as HTMLInputElement).value

    if (
      !value?.length ||
      (value.length === 1 && value[0] === '-') ||
      value.includes('.') ||
      value.includes(',')
    ) {
      event.preventDefault()
      return true
    }

    if (
      (decimalSeparator === 'comma' && event.key === '.') ||
      (decimalSeparator === 'dot' && event.key === ',')
    ) {
      event.preventDefault()
      return true
    }

    return false
  }

  static preventMax = (event: KeyboardEvent, max?: number): boolean => {
    if (!max) return false

    const input = event.target as HTMLInputElement
    const expectedString = (input.value + event.key).replace(',', '.')

    // Check if the expected value exceeds the maximum
    const expectedValue = parseFloat(expectedString)

    if (!isNaN(expectedValue) && expectedValue > max) {
      event.preventDefault() // Prevent the default action if it exceeds max
      return true
    }

    return false
  }

  static formatInput = (
    event: KeyboardEvent,
    enableSeparator: boolean,
  ): boolean => {
    if (!numberKeys.includes(event.key)) return true

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
}
