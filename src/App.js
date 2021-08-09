import { useState } from 'react'
import ImageGrid from './components/ImageGrid'
import Model from './components/Model'
import SearchHead from './components/SearchHead'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [modelUrl, setModelUrl] = useState('')
  const [isModelOn, setIsModelOn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [photos, setPhotos] = useState([])
  const [isSearchText, setIsSearchText] = useState(false)

  return (
    <div>
      {isModelOn && <Model modelUrl={modelUrl} setIsModelON={setIsModelOn} />}
      <SearchHead setLoading={setLoading} setPhotos={setPhotos} />
      <ToastContainer />
      <ImageGrid
        setIsModelOn={setIsModelOn}
        setModelUrl={setModelUrl}
        setLoading={setLoading}
        loading={loading}
        photos={photos}
        setPhotos={setPhotos}
        isSearchText={isSearchText}
      />
    </div>
  )
}

export default App
