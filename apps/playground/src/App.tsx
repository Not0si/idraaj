import NumericField from '@repo/ui/numericField'

import PlayGround from './playground/Playground'

function App() {
  return (
    <PlayGround title="Numeric Field">
      <NumericField />
      <input type="number" />
    </PlayGround>
  )
}

export default App
