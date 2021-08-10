import loader from '../loader.gif'

const Loading = () => {
  return (
    <div
      style={{ maxWidth: '80vw', width: 400, height: 400 }}
      className="d-flex justify-content-center align-items-center m-auto"
    >
      <img src={loader} alt="loading..." width="60" className="m-auto" />
    </div>
  )
}

export default Loading
