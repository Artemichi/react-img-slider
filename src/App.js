import React from 'react'
import ImgSlider from './Components/Slider/ImgSlider'

function App() {
  const [images] = React.useState([
    'https://img5.goodfon.ru/original/1920x1080/d/d3/suslik-rastitelnost-fon-morda.jpg',
    'https://img2.goodfon.ru/original/1920x1080/1/9f/golub-ptitsa-progulka.jpg',
    'https://img5.goodfon.ru/original/1920x1080/9/b9/ptitsa-tupik-portret-fon-atlanticheskii.jpg',
    'https://img5.goodfon.ru/original/1920x1080/0/5d/lisa-ryzhaia-morda-profil-portret-fon.jpg',
  ])

  return (
    <div className='App'>
      <ImgSlider images={images} />
    </div>
  )
}

export default App
