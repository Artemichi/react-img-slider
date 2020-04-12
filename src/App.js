import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ImgSlider from './Components/Slider/ImgSlider'
import getImages from './Components/Slider/getImages'

function App() {
  const [images, setImages] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const BASE_URL = 'https://api.unsplash.com/'
    const RANDOM_PHOTO = 'photos/random'
    const KEY = process.env.REACT_APP_API_KEY
    const PARAMS = Object.values({
      count: '&count=8',
      filter: '&content_filter=high',
      orientation: '&orientation=landscape',
    }).join('')

    getImages(`${BASE_URL}${RANDOM_PHOTO}?client_id=${KEY}${PARAMS}`).then(
      (imagesPaths) => {
        setImages(imagesPaths)
        setLoading(false)
      }
    )
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
