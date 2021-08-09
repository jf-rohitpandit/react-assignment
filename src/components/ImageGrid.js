import Image from './Image'

const ImageGrid = ({ setModelUrl, setIsModelOn }) => {
  return (
    <main className=" fluid-container d-flex flex-wrap justify-content-evenly m-1 overflow-hidden">
      <Image setIsModelOn={setIsModelOn} setModelUrl={setModelUrl} />
      <div
        className="mt-1 mx-3"
        onClick={() => {
          setModelUrl('https://picsum.photos/900/900?random=1')
          setIsModelOn(true)
        }}
      >
        <img
          alt="some "
          src="https://picsum.photos/900/900?random=1"
          width="400"
          height="400"
        />
      </div>
      <div
        className="mt-1 mx-3"
        onClick={() => {
          setModelUrl('https://picsum.photos/600/600?random=2')
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
      <div
        className="mt-1 mx-3"
        onClick={() => {
          setModelUrl('https://picsum.photos/600/600?random=2')
          setIsModelOn(true)
        }}
      >
        <img
          alt="some "
          src="https://picsum.photos/300/300?random=5"
          width="400"
          height="400"
        />
      </div>
      <div
        className="mt-1 mx-3"
        onClick={() => {
          setModelUrl('https://picsum.photos/300/300?random=2')
          setIsModelOn(true)
        }}
      >
        <img
          alt="some "
          src="https://picsum.photos/600/600?random=5"
          width="400"
          height="400"
        />
      </div>
    </main>
  )
}

export default ImageGrid
