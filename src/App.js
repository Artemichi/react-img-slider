import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ImgSlider from './Components/Slider/ImgSlider'

function App() {
  const [images, setImages] = useState([])
  const [links, setLinks] = useState([])
  const [likes, setLikes] = useState([])
  const [info, setInfo] = useState([])
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

    const getImages = async (url) => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      const optimized = await json.map((e) => e.urls.regular)
      setLinks(await json.map((e) => e.urls.full))
      setLikes(await json.map((e) => e.likes))
      setInfo(
        await json.map((e) => {
          return {
            user: e.user.name,
            description: e.description,
            location: e.location.name,
          }
        })
      )
      const paths = await optimized.map(async (url) => {
        const res = await fetch(url)
        const blob = await res.blob()
        const path = URL.createObjectURL(blob)
        const img = new Image()
        img.src = path
        return path
      })
      return await Promise.all(paths)
    }

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
            color: '#f44336',
          }}
        >
          <CircularProgress color='inherit' size={70} />
        </div>
      ) : (
        <ImgSlider images={images} links={links} likes={likes} info={info} />
      )}
    </div>
  )
}

export default App
