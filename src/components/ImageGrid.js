import { useCallback, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import Image from './Image'
import Loading from './Loading'
import throttle from 'lodash.throttle'

const PER_PAGE = 10

const ImageGrid = ({
  setModelUrl,
  setIsModelOn,
  setPhotos,
  setLoading,
  photos,
  loading,
  searchText,
}) => {
  const [loadMore, setLoadMore] = useState(true)
  const pageNumber = useRef(1)

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true)
      setLoadMore(true)
      pageNumber.current = pageNumber.current + 1
    }
  }, 100)

  const getSearchUrl = useCallback(() => {
    if (searchText === '') {
      return `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=10829aa124017c4b3e346c7b8f317c63&safe_search=3&page=${pageNumber.current}&per_page=${PER_PAGE}&format=json&nojsoncallback=1`
    }

    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10829aa124017c4b3e346c7b8f317c63&safe_search=3&text=${searchText}&page=${pageNumber.current}&per_page=10&format=json&nojsoncallback=1`
  }, [searchText, pageNumber])

  const getImages = async () => {
    try {
      const res = await axios.get(getSearchUrl())

      console.log(res.data.photos)
      const newPhotos = res.data.photos.photo.map((singlePhotoData) => {
        return `https://live.staticflickr.com/${singlePhotoData.server}/${singlePhotoData.id}_${singlePhotoData.secret}_w.jpg`
      })

      console.log(newPhotos.length, newPhotos)
      setPhotos((photos) => [...photos, ...newPhotos])
    } catch (error) {
      toast.error(error.message)
    }
  }

  const optimisedGetImage = useRef(
    throttle(useCallback(getImages, [getSearchUrl]), 1000, { trailing: false }),
  )

  useEffect(() => {
    setLoading(true)
    setLoadMore(true)
  }, [searchText])

  useEffect(() => {
    if (loadMore === true && loading === true) {
      getImages()
      setLoadMore(false)
      setLoading(false)
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
  searchText: PropTypes.string.isRequired,
}

export default ImageGrid
