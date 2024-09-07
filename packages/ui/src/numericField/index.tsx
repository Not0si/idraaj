import { type ClipboardEvent, type FC, type KeyboardEvent } from 'react'

import InputNumberUtils, { INumberInput } from './utils'

const NumericField: FC<INumberInput> = ({
  type = 'float',
  onChange,
  max,
  disabled = false,
  enableSeparator = false,
}) => {
  return (
    <input
      type="text"
      inputMode="numeric"
      aria-disabled={`${disabled}`}
      disabled={disabled}
      onPaste={(event: ClipboardEvent<HTMLInputElement>) => {
        const pastedText = event.clipboardData.getData('text')
        const pastedNumber = Number(pastedText)

        if (!pastedNumber) {
          return event.preventDefault()
        }

        if (max && pastedNumber > max) {
          return event.preventDefault()
        }
      }}
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
        if (InputNumberUtils.preventRepeat(event)) return

        if (InputNumberUtils.preventNonNumbers(event, type)) return

        if (max && InputNumberUtils.preventMax(event, max)) return

        if (InputNumberUtils.formatInput(event, enableSeparator)) return
      }}
      onChange={(event) => {
        InputNumberUtils.onChange(event, enableSeparator, onChange)
      }}
    />
  )
}

export default NumericField
