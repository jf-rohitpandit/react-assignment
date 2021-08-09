import { useState } from 'react'

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
    backgroundColor: 'rgba(200,200,200,.4)',
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
        className=" border border-3 border-dark"
        style={{ maxHeight: '75vh', maxWidth: '75vw', overflow: 'hidden' }}
      >
        {loading === true && (
          <div className="">
            <h2>Loading....</h2>
          </div>
        )}
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

export default Model
