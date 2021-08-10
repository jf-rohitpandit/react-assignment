import { useState } from 'react'
import ImageGrid from './components/ImageGrid'
import Model from './components/Model'
import SearchHead from './components/SearchHead'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [modelUrl, setModelUrl] = useState('')
  const [isModelOn, setIsModelOn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [photos, setPhotos] = useState([])
  const [searchText, setSearchText] = useState('')

  return (
    <div>
      {isModelOn && <Model modelUrl={modelUrl} setIsModelON={setIsModelOn} />}
      <SearchHead
        setLoading={setLoading}
        setPhotos={setPhotos}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <ToastContainer />
      <ImageGrid
        setIsModelOn={setIsModelOn}
        setModelUrl={setModelUrl}
        setLoading={setLoading}
        loading={loading}
        photos={photos}
        setPhotos={setPhotos}
        searchText={searchText}
      />
    </div>
  )
}

export default App
