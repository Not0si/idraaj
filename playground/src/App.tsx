import { NumericField } from '../../src'
import PlayGround from './playground/Playground'

function App() {
  return (
    <PlayGround title="Numeric Field">
      <NumericField
        // decimalSeparator="comma"
        // max={600000}
        enableSeparator={true}
      />
      <input type="number" />
    </PlayGround>
  )
}

export default App
