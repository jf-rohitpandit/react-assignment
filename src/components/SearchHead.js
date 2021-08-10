import PropTypes from 'prop-types'
import { useState } from 'react'
import { saveData } from '../utils/localStore'
import Suggestions from './Suggestions'

const SearchHead = ({
  setLoading,
  setSearchText,
  searchText,
  setPhotos,
  suggestions,
  setSuggestions,
}) => {
  const searchTextChangeHandler = (text) => {
    setLoading(true)
    setPhotos((photos) => [])
    setSearchText(text)
    saveData(text)

    if (suggestions.includes(text)) return

    setSuggestions((suggestions) => [...suggestions, text])
  }

  const [isFocus, setIsFocus] = useState(false)

  return (
    <section className="fluid-container d-flex flex-column bg-dark align-items-center p-3 sticky-top">
      <h2 className="text-white">Search photos</h2>

      <div
        onFocus={() => setIsFocus(true)}
        tabIndex="100"
        onBlur={() => setIsFocus(false)}
      >
        <input
          value={searchText}
          placeholder="Enter the text to search..."
          onChange={(e) => searchTextChangeHandler(e.target.value)}
        />
        <div
          className="bg-white p-3 shadow mt-1"
          style={{
            position: 'absolute',
            display: !isFocus && 'none',
            width: '16rem',
            cursor: 'pointer',
          }}
        >
          <Suggestions
            suggestionArray={suggestions}
            setSuggestions={setSuggestions}
            searchTextChangeHandler={searchTextChangeHandler}
            setIsFocus={setIsFocus}
          />
        </div>
      </div>
    </section>
  )
}

SearchHead.propTypes = {
  setPhotos: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setSearchText: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSuggestions: PropTypes.func.isRequired,
}

export default SearchHead
