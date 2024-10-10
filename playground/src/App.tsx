import { useState } from 'react'

import { NumericField } from '../../src'
import PlayGround from './playground/Playground'
import RadioGroup, { RadioOption } from './radio-group/RadioGroup'

type INumericType = 'float' | 'integer'
type INumericSeparator = 'dot' | 'comma'

const typeOptions: RadioOption<INumericType>[] = [
  { label: 'Float', value: 'float' },
  { label: 'Integer', value: 'integer' },
]

const separatorOptions: RadioOption<INumericSeparator>[] = [
  { label: 'Comma (,)', value: 'comma' },
  { label: 'Dot (.)', value: 'dot' },
]

function App() {
  const [selectedType, setSelectedType] = useState<INumericType>('float')
  const [selectedSeparaor, setSelectedSeparaor] =
    useState<INumericSeparator>('dot')
  const [value, setValue] = useState<number | null>(null)

  return (
    <PlayGround title="Numeric Field">
      <RadioGroup
        name="exampleRadioGroup"
        options={typeOptions}
        selectedValue={selectedType}
        onChange={(value: INumericType) => setSelectedType(value)}
      />
      <RadioGroup
        name="exampleRadioGroup2"
        options={separatorOptions}
        selectedValue={selectedSeparaor}
        onChange={(value: INumericSeparator) => setSelectedSeparaor(value)}
        disabled={selectedType === 'integer'}
      />
      <NumericField
        type={selectedType}
        decimalSeparator={
          selectedType === 'integer' ? undefined : selectedSeparaor
        }
        scale={4}
        // value={value}
        onChange={(value) => {
          setValue(value)
        }}
        enableSeparator={true}
      />
      <input type="number" />
    </PlayGround>
  )
}

export default App
