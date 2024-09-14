import { useEffect, useState } from 'react'

import { NumericField } from '../../src'
import PlayGround from './playground/Playground'

function App() {
  const [value, setValue] = useState<null | number>(324221)

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
