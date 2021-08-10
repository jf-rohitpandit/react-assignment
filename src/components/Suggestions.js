import PropTypes from 'prop-types'
import { removeData } from '../utils/localStore'

const Suggestions = ({
  suggestionArray,
  setSuggestions,
  searchTextChangeHandler,
  setIsFocus,
}) => {
  const clearSuggestionHandler = () => {
    removeData()
    setSuggestions([])
  }

  const onClickHandler = (suggestion) => {
    searchTextChangeHandler(suggestion)
    setIsFocus(false)
  }
  return (
    <>
      {suggestionArray &&
        suggestionArray.length > 0 &&
        suggestionArray.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onClickHandler(suggestion)}
            className=" bg-white m-0 p-0"
          >
            <p className="">{suggestion}</p>
          </div>
        ))}
      <button
        className="btn btn-danger p-1 float-end"
        onClick={clearSuggestionHandler}
      >
        Clear
      </button>
    </>
  )
}

Suggestions.propTypes = {
  suggestionArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSuggestions: PropTypes.func.isRequired,
  searchTextChangeHandler: PropTypes.func.isRequired,
  setIsFocus: PropTypes.func.isRequired,
}

export default Suggestions
