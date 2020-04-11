import React, { useState, useReducer } from 'react'
import classes from './imgSlider.module.css'
import reducer from './imgSliderReducer'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Indicators from './Indicators'
import { Motion, spring } from 'react-motion'

const ImgSlider = ({ images }) => {
  const [showControls, setShowControls] = useState(true)

  const [idx, dispatch] = useReducer(reducer, 0)

  return (
    <React.Fragment>
      {/* IMAGE */}
      <div
        className={classes.carusel}
        style={{ backgroundImage: `url(${images[idx]})` }}>
        {/* CONTROLS */}
        {/* prev */}
        <Motion
          defaultStyle={{ opacity: 0, x: -200 }}
          style={{
            opacity: spring(showControls ? 1 : 0, { stiffness: 30 }),
            x: spring(showControls ? 0 : -200, { stiffness: 100 }),
          }}>
          {(style) => (
            <button
              style={{
                opacity: style.opacity,
                transform: `translateX(${style.x}px)`,
              }}
              className={`${classes.control} ${classes.prev}`}
              onClick={() =>
                dispatch({
                  type: 'PREV_IMG',
                  payload: { index: idx, last: images.length - 1 },
                })
              }>
              <ArrowBackIcon fontSize='large' color='action' />
            </button>
          )}
        </Motion>
        {/* next */}
        <Motion
          defaultStyle={{ opacity: 0, x: 200 }}
          style={{
            opacity: spring(showControls ? 1 : 0, { stiffness: 30 }),
            x: spring(showControls ? 0 : 200, { stiffness: 100 }),
          }}>
          {(style) => (
            <button
              style={{
                opacity: style.opacity,
                transform: `translateX(${style.x}px)`,
              }}
              className={`${classes.control} ${classes.next}`}
              onClick={() =>
                dispatch({ type: 'NEXT_IMG', payload: images.length })
              }>
              <ArrowForwardIcon fontSize='large' color='action' />
            </button>
          )}
        </Motion>
        {/* toggle */}
        <Motion
          defaultStyle={{ opacity: 0 }}
          style={{ opacity: spring(1, { stiffness: 50 }) }}>
          {(style) => (
            <button
              style={{ opacity: style.opacity }}
              className={classes.showToggle}
              onClick={() => setShowControls((current) => !current)}>
              {showControls ? 'скрыть' : 'показать'}
            </button>
          )}
        </Motion>
        {/* INDICATORS */}
        <Indicators
          imgs={images}
          index={idx}
          dispatch={dispatch}
          show={showControls}
        />
      </div>
    </React.Fragment>
  )
}

export default ImgSlider
