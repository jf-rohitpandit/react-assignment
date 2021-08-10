import PropTypes from 'prop-types'

const Image = ({ setModelUrl, setIsModelOn, url }) => {
  return (
    <div
      className="  mt-1 mx-3 flex-1 d-flex justify-content-center align-items-center "
      style={{ width: 400, height: 400 }}
      onClick={() => {
        setModelUrl(url)
        setIsModelOn(true)
      }}
    >
      <img
        alt="some "
        src={url}
        className=" shadow"
        style={{ objectFit: 'cover', maxWidth: 400, maxHeight: 400 }}
      />
    </div>
  )
}

Image.propTypes = {
  setModelUrl: PropTypes.func.isRequired,
  setIsModelOn: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
}
export default Image
