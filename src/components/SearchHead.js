import PropTypes from 'prop-types'

const SearchHead = ({ setLoading, setSearchText, searchText, setPhotos }) => {
  const searchTextChangeHandler = (e) => {
    setLoading(true)
    setPhotos((photos) => [])
    setSearchText(e.target.value)
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
  setSearchText: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
}

export default SearchHead
