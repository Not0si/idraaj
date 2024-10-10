import { useId } from 'react'

import styles from './styles.module.scss'

export interface RadioOption<T> {
  label: string
  value: T
}

interface RadioGroupProps<T> {
  name: string
  options: RadioOption<T>[]
  selectedValue: T
  onChange: (value: T) => void
  disabled?: boolean
}

const RadioGroup = <T,>({
  name,
  options,
  selectedValue,
  onChange,
  disabled,
}: RadioGroupProps<T>) => {
  const id = useId()

  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <label key={index} className={styles.option}>
          <label htmlFor={id + index} className={styles.label}>
            {option.label}
          </label>
          <input
            id={id + index}
            className={styles.input}
            type="radio"
            name={name}
            disabled={disabled}
            value={String(option.value)}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
        </label>
      ))}
    </div>
  )
}

export default RadioGroup
