import loader from '../loader.gif'

const Loading = () => {
  return (
    <div
      style={{ width: 400, height: 400, margin: 'auto' }}
      className="d-flex justify-content-center align-items-center"
    >
      <img src={loader} alt="loading..." width="60" />
    </div>
  )
}

export default Loading
