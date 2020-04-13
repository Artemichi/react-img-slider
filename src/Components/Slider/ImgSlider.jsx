import React, { useState, useEffect, useReducer } from 'react'
import classes from './imgSlider.module.css'
import reducer from './imgSliderReducer'
import { useSwipeable } from 'react-swipeable'
import { useSpring, animated } from 'react-spring'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ToggleOnOutlinedIcon from '@material-ui/icons/ToggleOnOutlined'
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Indicators from './Indicators'

const ImgSlider = ({ images, links, likes }) => {
  const [showControls, setShowControls] = useState(() =>
    window.innerWidth > 767 ? true : false
  )
  const [autoPlay, setAutoPlay] = useState(false)
  const [idx, dispatch] = useReducer(reducer, 0)
  const controlsFade = useSpring({ opacity: showControls ? 1 : 0 })
  const sliderFade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
  })

  useEffect(() => {
    const play = autoPlay
      ? setInterval(
          () => dispatch({ type: 'NEXT_IMG', payload: images.length }),
          4000
        )
      : null
    if (autoPlay) setShowControls(false)
    return () => {
      clearInterval(play)
      setShowControls(() => (window.innerWidth > 767 ? true : false))
    }
  }, [autoPlay, images.length])

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch({ type: 'NEXT_IMG', payload: images.length }),
    onSwipedRight: () =>
      dispatch({
        type: 'PREV_IMG',
        payload: { index: idx, last: images.length - 1 },
      }),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
  })

  return (
    <React.Fragment>
      {/* SLIDER */}
      <animated.div
        {...handlers}
        className={classes.carusel}
        style={{
          backgroundImage: `url(${images[idx]})`,
          opacity: sliderFade.opacity,
        }}>
        {/* CONTROLS */}
        <animated.div style={controlsFade}>
          <div className={`${classes.control} ${classes.prev}`}>
            <IconButton
              aria-label='prev'
              color='inherit'
              onClick={() =>
                dispatch({
                  type: 'PREV_IMG',
                  payload: { index: idx, last: images.length - 1 },
                })
              }>
              <ArrowBackIcon fontSize='large' />
            </IconButton>
          </div>
          <div className={`${classes.control} ${classes.next}`}>
            <IconButton
              aria-label='next'
              color='inherit'
              onClick={() =>
                dispatch({ type: 'NEXT_IMG', payload: images.length })
              }>
              <ArrowForwardIcon fontSize='large' />
            </IconButton>
          </div>
        </animated.div>

        {/* SETTINGS */}
        <div className={classes.settings}>
          <IconButton
            aria-label='download'
            color='inherit'
            onClick={() => {
              const win = window.open(links[idx])
              win.focus()
            }}>
            <CloudDownloadOutlinedIcon fontSize='large' />
          </IconButton>
          <IconButton
            aria-label='controls'
            color='inherit'
            onClick={() => setShowControls((current) => !current)}>
            {showControls ? (
              <ToggleOnOutlinedIcon fontSize='large' />
            ) : (
              <ToggleOffOutlinedIcon color='action' fontSize='large' />
            )}
          </IconButton>
          <IconButton
            aria-label='play'
            color='inherit'
            onClick={() => setAutoPlay((current) => !current)}>
            {autoPlay ? (
              <PauseCircleFilledIcon color='action' fontSize='large' />
            ) : (
              <PlayArrowIcon fontSize='large' />
            )}
          </IconButton>
        </div>

        {/* LIKES */}
        <div className={classes.likes}>
          <Badge badgeContent={likes[idx]} max={100} color='primary'>
            {likes[idx] === 0 ? (
              <FavoriteBorderIcon color='error' fontSize='large' />
            ) : (
              <FavoriteIcon color='error' fontSize='large' />
            )}
          </Badge>
        </div>

        {/* INDICATORS */}
        <Indicators imgs={images} index={idx} dispatch={dispatch} />
      </animated.div>
    </React.Fragment>
  )
}

export default ImgSlider
