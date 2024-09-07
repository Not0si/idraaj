import type { ClipboardEvent, FC, KeyboardEvent } from 'react'

import type { INumberInput } from './types'
import { ChangeProcessor, KeyDownProcessor, PastProcessor } from './utils'

const NumericField: FC<INumberInput> = ({
  type = 'float',
  onChange,
  max,
  disabled = false,
  enableSeparator = false,
  decimalSeparator = 'dot',
}) => {
  return (
    <input
      type="text"
      inputMode="numeric"
      aria-disabled={`${disabled}`}
      disabled={disabled}
      onPaste={(event: ClipboardEvent<HTMLInputElement>) => {
        if (PastProcessor.preventNonNumber(event, max)) return
      }}
      onKeyDown={(event: KeyboardEvent) => {
        if (KeyDownProcessor.preventNonNumeric(event)) return

        if (KeyDownProcessor.preventRepeat(event)) return

        if (
          KeyDownProcessor.preventDecimalSeparator(
            event,
            type,
            decimalSeparator,
          )
        )
          return

        if (KeyDownProcessor.preventMax(event, max)) return

        if (KeyDownProcessor.formatInput(event, enableSeparator)) return
      }}
      onChange={(event) => {
        ChangeProcessor.onChange(event, enableSeparator, onChange)
      }}
    />
  )
}

export default NumericField
