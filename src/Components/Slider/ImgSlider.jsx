import React, { useState, useEffect, useReducer } from 'react'
import classes from './imgSlider.module.css'
import reducer from './imgSliderReducer'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ToggleOnOutlinedIcon from '@material-ui/icons/ToggleOnOutlined'
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import Indicators from './Indicators'
import { Motion, spring } from 'react-motion'

const ImgSlider = ({ images }) => {
  const [showControls, setShowControls] = useState(true)

  const [autoPlay, setAutoPlay] = useState(false)

  const [idx, dispatch] = useReducer(reducer, 0)

  useEffect(() => {
    const play = autoPlay
      ? setInterval(
          () => dispatch({ type: 'NEXT_IMG', payload: images.length }),
          3000
        )
      : null
    if (autoPlay) setShowControls(false)
    return () => {
      console.log('AUTO_PLAY: ', !autoPlay)
      clearInterval(play)
      setShowControls(true)
    }
  }, [autoPlay, images.length])

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
              <ArrowBackIcon fontSize='large' color='inherit' />
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
              <ArrowForwardIcon fontSize='large' color='inherit' />
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
              className={classes.showControlsButton}
              onClick={() => setShowControls((current) => !current)}>
              {showControls ? (
                <ToggleOnOutlinedIcon color='inherit' fontSize='large' />
              ) : (
                <ToggleOffOutlinedIcon color='action' fontSize='large' />
              )}
            </button>
          )}
        </Motion>
        {/* autoPlay */}
        <button
          className={classes.autoPlayButton}
          onClick={() => setAutoPlay((current) => !current)}>
          {autoPlay ? (
            <PauseCircleFilledIcon color='action' fontSize='large' />
          ) : (
            <PlayArrowIcon color='inherit' fontSize='large' />
          )}
        </button>
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
