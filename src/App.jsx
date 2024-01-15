import { useState } from 'react'
import CodeSight from './components/CodeSight'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CodeSight/>
    </>
  )
}

export default App
