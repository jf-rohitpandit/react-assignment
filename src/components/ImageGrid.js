import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import Image from './Image'
import Loading from './Loading'

const ImageGrid = ({
  setModelUrl,
  setIsModelOn,
  setPhotos,
  setLoading,
  photos,
  loading,
}) => {
  const [loadMore, setLoadMore] = useState(true)

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true)
      setLoadMore(true)
    }
  }, 100)

  const getImages = useCallback(async () => {
    try {
      const res = await axios.get(
        'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=10829aa124017c4b3e346c7b8f317c63&per_page=10&format=json&nojsoncallback=1',
      )

      console.log(res.data.photos)
      const newPhotos = res.data.photos.photo.map((singlePhotoData) => {
        return `https://live.staticflickr.com/${singlePhotoData.server}/${singlePhotoData.id}_${singlePhotoData.secret}_w.jpg`
      })

      console.log(newPhotos.length, newPhotos)
      setPhotos((photos) => [...photos, ...newPhotos])
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
    }
  }, [])

  useEffect(() => {
    if (loadMore === true) {
      getImages()
      setLoadMore(false)
    }
  }, [getImages, loadMore])

  return (
    <main>
      <div className=" fluid-container d-flex flex-wrap  m-1 overflow-hidden">
        {photos.length > 0 &&
          photos.map((photo, index) => (
            <Image
              key={index}
              setIsModelOn={setIsModelOn}
              setModelUrl={setModelUrl}
              url={photo}
            />
          ))}
      </div>
      {loading && <Loading />}
    </main>
  )
}

ImageGrid.propTypes = {
  setModelUrl: PropTypes.func.isRequired,
  setIsModelOn: PropTypes.func.isRequired,
  setPhotos: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
}

export default ImageGrid
