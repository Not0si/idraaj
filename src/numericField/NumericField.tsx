import { type FC, useEffect, useState } from 'react'

import type { FloatProps, INumericFieldProps } from './types'
import Validator from './validator'

const NumericField: FC<INumericFieldProps> = (props) => {
  const type = props?.type ?? 'float'
  const [localValue, setLocalValue] = useState<string>('')

  const {
    onChange,
    max,
    value,
    disabled,
    enableSeparator,
    decimalSeparator,
    scale,
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
    scale: type === 'float' ? (props as FloatProps)?.scale : undefined,
  }

  const params = {
    type,
    onChange,
    max,
    value,
    disabled,
    enableSeparator,
    decimalSeparator,
    scale,
  }

  // Sync inner state with outer state when outer state changes
  useEffect(() => {
    if (value !== Number(localValue)) {
      setLocalValue(value?.toString() ?? '')
    }
  }, [value])

  return (
    <input
      {...rest}
      type="text"
      inputMode="numeric"
      aria-disabled={`${disabled}`}
      disabled={disabled}
      // value={Validator.onValue(value, params)}
      value={localValue}
      // onPaste={(event: ClipboardEvent<HTMLInputElement>) =>
      //   PastProcessor.handleDefault(event, params)
      // }
      onKeyDown={(event) => Validator.onKeyDown(event, params)}
      onChange={(event) => {
        setLocalValue(event.target.value ?? '')
        Validator.onChange(event, params)
      }}
    />
  )
}

export default NumericField
