import React from 'react'
import classes from './imgSlider.module.css'
import { useSwipeable } from 'react-swipeable'
import { useTransition, animated } from 'react-spring'

const Slide = ({ idx, images, dispatch, autoPlay, dir, setDir }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setDir('left')
      dispatch({ type: 'NEXT_IMG', payload: images.length })
    },
    onSwipedRight: () => {
      setDir('right')
      dispatch({
        type: 'PREV_IMG',
        payload: { index: idx, last: images.length - 1 },
      })
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  })

  const transitions = useTransition(images[idx], idx, {
    from: { opacity: 0, transform: 'scale(1)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.7)' },
  })

  return transitions.map(({ item, props, key }) => (
    <animated.div
      key={key}
      {...handlers}
      className={classes.carusel}
      style={{
        ...props,
        backgroundImage: `url(${item})`,
        transformOrigin: autoPlay ? 'left' : dir,
      }}
    ></animated.div>
  ))
}

export default Slide
