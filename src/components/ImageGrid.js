import { useCallback, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import Image from './Image'
import Loading from './Loading'

const PER_PAGE = 10 //Image results per page

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
  const pageNumber = useRef(1) // for the api call
  const [isMoreResult, setIsMoreResult] = useState(true) // checking for more result  from api

  //Infinite Scroll
  window.onscroll = debounce(() => {
    if (
      isMoreResult &&
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
    ) {
      setLoading(true)
      setLoadMore(true)
      pageNumber.current = pageNumber.current + 1
    }
  }, 100)

  //custom URL based on Search or Default URL
  const getSearchUrl = useCallback(() => {
    if (searchText === '') {
      return `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=10829aa124017c4b3e346c7b8f317c63&safe_search=3&page=${pageNumber.current}&per_page=${PER_PAGE}&format=json&nojsoncallback=1`
    }

    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10829aa124017c4b3e346c7b8f317c63&safe_search=3&text=${searchText}&page=${pageNumber.current}&per_page=10&format=json&nojsoncallback=1`
  }, [searchText, pageNumber])

  //Gets the photos from the api and stores them in State(Photos)
  const getImages = useCallback(async () => {
    try {
      const res = await axios.get(getSearchUrl())

      //Generting image Url from the result data
      const newPhotos = res.data.photos.photo.map((singlePhotoData) => {
        return `https://live.staticflickr.com/${singlePhotoData.server}/${singlePhotoData.id}_${singlePhotoData.secret}_w.jpg`
      })

      //Checks for no result
      if (
        res.data.photos.total === 0 ||
        res.data.photos.total === photos.length
      ) {
        console.log('hwllo', res.data.photos.total, photos.length)
        setIsMoreResult(false)
      }

      console.log(newPhotos.length, newPhotos)
      setPhotos((photos) => [...photos, ...newPhotos])

      setLoading(false)
    } catch (error) {
      toast.error(error.message)
    }
  }, [getSearchUrl, photos, setLoading, setPhotos])

  //Triggers when some entry on Search bar is changed
  useEffect(() => {
    setLoading(true)
    setLoadMore(true)
  }, [searchText, setLoading, setLoadMore])

  // gets the Images loaded
  useEffect(() => {
    if (loadMore === true && loading === true) {
      getImages()
      setLoadMore(false)
    }
  }, [getImages, loadMore, loading, setLoadMore])

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
      {!isMoreResult && !loading && (
        <div className=" d-flex justify-content-center align-items-center">
          <p>Thats all for now!</p>
        </div>
      )}
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
