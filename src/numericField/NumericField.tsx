import type { ClipboardEvent, FC, KeyboardEvent } from 'react'

import type { FloatProps, INumberInput } from './types'
import { IOProcessor, KeyDownProcessor, PastProcessor } from './utils'

const NumericField: FC<INumberInput> = (props) => {
  const type = props?.type ?? 'float'

  const {
    onChange,
    max,
    value,
    disabled,
    enableSeparator,
    decimalSeparator,
    ...rest
  } = {
    ...props,
    onChange: props?.onChange,
    max: props?.max ?? 9007199254740991,
    value: props?.value ?? null,
    disabled: Boolean(props?.disabled),
    enableSeparator: props?.enableSeparator ?? false,
    decimalSeparator:
      type === 'float' ?
        ((props as FloatProps)?.decimalSeparator ?? 'dot')
      : undefined,
  }

  const params = {
    type,
    onChange,
    max,
    value,
    disabled,
    enableSeparator,
    decimalSeparator,
  }

  return (
    <input
      {...rest}
      type="text"
      inputMode="numeric"
      aria-disabled={`${disabled}`}
      disabled={disabled}
      value={IOProcessor.formatInput(value, enableSeparator)}
      onPaste={(event: ClipboardEvent<HTMLInputElement>) =>
        PastProcessor.handleDefault(event, params)
      }
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
        KeyDownProcessor.handleDefault(event, params)
      }
      onChange={(event) =>
        IOProcessor.formatOutput(event, enableSeparator, onChange)
      }
    />
  )
}

export default NumericField
