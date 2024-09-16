# Idraaj

UI input components library designed to extend and fix some issues in standard HTML input elements

## Numeric Field

```typescript
import { numericField } from 'idraaj'
import { useState } from 'react'

function Component() {
  const [value, setValue] = useState<null | number>(324221)


  console.log({ value })


  return (
    <NumericField
      value={value}
      onChange={(val) => setValue(val)}
      decimalSeparator="comma"
      max={600000}
      enableSeparator={true}
    />
  )
}

export default Component
```
