const Image = ({ setModelUrl, setIsModelOn }) => {
  return (
    <div
      className="mt-1 mx-3"
      onClick={() => {
        setModelUrl('https://picsum.photos/600/600?random=3')
        setIsModelOn(true)
      }}
    >
      <img
        alt="some "
        src="https://picsum.photos/600/600?random=3"
        width="400"
        height="400"
      />
    </div>
  )
}
export default Image
