import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ImgSlider from './Components/Slider/ImgSlider'
import getImages from './Components/Slider/getImages'

function App() {
  const [images, setImages] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getImages(
      `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_KEY}&count=5&content_filter=high&orientation=landscape`
    ).then((imagesPaths) => {
      setImages(imagesPaths)
      setLoading(false)
    })
  }, [])

  return (
    <div className='App'>
      {loading ? (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffb74d',
          }}>
          <CircularProgress color='inherit' size={70} />
        </div>
      ) : (
        <ImgSlider images={images} />
      )}
    </div>
  )
}

export default App
