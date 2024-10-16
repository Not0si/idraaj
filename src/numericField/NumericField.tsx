import { type FC, useEffect, useState } from 'react'

import type { FloatProps, INumericFieldProps } from './types'
import Validator from './validator'

const NumericField: FC<INumericFieldProps> = (props) => {
  const [localValue, setLocalValue] = useState<string>('')
  const type = props?.type ?? 'float'
  const {
    onChange,
    max,
    value,
    disabled,
    enableSpacing,
    decimalSeparator,
    scale,
    ...rest
  } = {
    ...props,
    onChange: props?.onChange,
    max: props?.max ?? 9007199254740991,
    value: props?.value ?? null,
    disabled: Boolean(props?.disabled),
    enableSpacing: props?.enableSpacing ?? false,
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
    enableSpacing,
    decimalSeparator,
    scale,
  }

  // Sync inner state with outer state when outer state changes
  useEffect(() => {
    if (value !== Validator.stringToNumber(localValue, params)) {
      setLocalValue(Validator.numberToString(value, params))
    }
  }, [value])

  return (
    <input
      {...rest}
      type="text"
      inputMode="numeric"
      aria-disabled={`${disabled}`}
      disabled={disabled}
      value={localValue}
      onPaste={(event) => Validator.onPaste(event, params)}
      onKeyDown={(event) => Validator.onKeyDown(event, params)}
      onChange={(event) => {
        setLocalValue(event.target.value ?? '')
        Validator.onChange(event, params)
      }}
    />
  )
}

export default NumericField
