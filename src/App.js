import { useState } from 'react'
import ImageGrid from './components/ImageGrid'
import Model from './components/Model'
import SearchHead from './components/SearchHead'

function App() {
  const [modelUrl, setModelUrl] = useState('')
  const [isModelOn, setIsModelOn] = useState(false)

  return (
    <>
      <div>
        {isModelOn && <Model modelUrl={modelUrl} setIsModelON={setIsModelOn} />}
        <SearchHead />
        <ImageGrid setIsModelOn={setIsModelOn} setModelUrl={setModelUrl} />
      </div>
    </>
  )
}

export default App
