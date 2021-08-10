import { useState } from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'

const Model = ({ modelUrl, setIsModelON }) => {
  const [loading, setLoading] = useState(true)
  const style = {
    marginTop: '3rem',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(50,50,50,.6)',
    overflow: 'hidden',
    zIndex: 'Infinity',
  }
  return (
    <div
      style={style}
      onClick={() => {
        setIsModelON(false)
      }}
    >
      <div
        className=" bg-white p-3 overflow-hidden"
        style={{ maxHeight: '75vh', maxWidth: '75vw' }}
      >
        {loading === true && <Loading />}
        <img
          alt="some "
          src={modelUrl}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
          onClick={(e) => {
            e.stopPropagation()
          }}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  )
}

Model.propTypes = {
  modelUrl: PropTypes.string.isRequired,
  setIsModelON: PropTypes.func.isRequired,
}

export default Model
