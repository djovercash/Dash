import React from 'react'
import { Fade } from 'react-slideshow-image'

const DashSlideshow = () => {
  const images = [
    'promoPic2.jpg',
    'promoPic1.jpg',
    'promoPic3.jpg',
    'promoPic4.jpg',
    'promoPic5.jpg'
  ]

  return (
    <Fade
      images={images}
      duration={5000}
      transitionDuration={1000}
    />
  )

}

export default DashSlideshow
