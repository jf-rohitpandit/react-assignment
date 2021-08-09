import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

const SearchHead = ({ setPhotos, setLoading }) => {
  const [searchText, setSearchText] = useState('')

  const searchTextChangeHandler = (e) => {
    setSearchText(e.target.value)
    getSearchResult(e.target.value)
  }

  const getSearchResult = async (text) => {
    try {
      if (text === '') return

      setLoading(true)
      const res = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10829aa124017c4b3e346c7b8f317c63&text=${text}&per_page=10&format=json&nojsoncallback=1`,
      )

      console.log(res.data.photos)
      const newPhotos = res.data.photos.photo.map((singlePhotoData) => {
        return `https://live.staticflickr.com/${singlePhotoData.server}/${singlePhotoData.id}_${singlePhotoData.secret}_w.jpg`
      })
      setPhotos(newPhotos)
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <section className="fluid-container d-flex flex-column bg-dark align-items-center p-3 sticky-top">
      <h2 className="text-white">Search photos</h2>

      <input
        value={searchText}
        placeholder="Enter the text to search..."
        onChange={searchTextChangeHandler}
      />
    </section>
  )
}

SearchHead.propTypes = {
  setPhotos: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default SearchHead
