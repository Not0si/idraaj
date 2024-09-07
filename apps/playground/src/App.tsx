import NumericField from '@repo/ui/numericField'

import { useEffect, useState } from 'react'

import PlayGround from './playground/Playground'

function App() {
  const [value, setValue] = useState<null | number>(null)

  useEffect(() => {
    console.log({ value })
  }, [value])

  return (
    <PlayGround title="Numeric Field">
      <NumericField
        value={value}
        onChange={(val) => setValue(val)}
        decimalSeparator="comma"
        max={600000}
        enableSeparator={true}
      />
      <input type="number" />
    </PlayGround>
  )
}

export default App
