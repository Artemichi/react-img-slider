import React, { useState, useEffect, useReducer } from 'react'
import classes from './imgSlider.module.css'
import reducer from './imgSliderReducer'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ToggleOnOutlinedIcon from '@material-ui/icons/ToggleOnOutlined'
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import Badge from '@material-ui/core/Badge'
import Indicators from './Indicators'
import { Motion, spring } from 'react-motion'

const ImgSlider = ({ images, links, likes }) => {
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
      // console.log('AUTO_PLAY: ', !autoPlay)
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
        {/* PREV IMG */}
        <Motion
          defaultStyle={{ opacity: 0, x: -200 }}
          style={{
            opacity: spring(showControls ? 1 : 0),
            x: spring(showControls ? 0 : -200),
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
        {/* NEXT IMG */}
        <Motion
          defaultStyle={{ opacity: 0, x: 200 }}
          style={{
            opacity: spring(showControls ? 1 : 0),
            x: spring(showControls ? 0 : 200),
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
        {/* SETTINGS */}
        <div className={classes.settings}>
          {/* DOWNLOAD LINK */}
          <button
            className={classes.downloadLink}
            onClick={() => {
              const win = window.open(links[idx])
              win.focus()
            }}>
            <CloudDownloadOutlinedIcon color='inherit' fontSize='large' />
          </button>
          {/* toggle controls */}
          <button
            className={classes.showControlsButton}
            onClick={() => setShowControls((current) => !current)}>
            {showControls ? (
              <ToggleOnOutlinedIcon color='error' fontSize='large' />
            ) : (
              <ToggleOffOutlinedIcon color='inherit' fontSize='large' />
            )}
          </button>
          {/* AUTOPLAY BUTTON */}
          <button
            className={classes.autoPlayButton}
            onClick={() => setAutoPlay((current) => !current)}>
            {autoPlay ? (
              <PauseCircleFilledIcon color='inherit' fontSize='large' />
            ) : (
              <PlayArrowIcon color='error' fontSize='large' />
            )}
          </button>
        </div>

        {/* LIKES */}
        <div className={classes.likes}>
          <Badge badgeContent={likes[idx]} max={100} color='error'>
            {likes[idx] === 0 ? (
              <FavoriteBorderIcon color='error' fontSize='large' />
            ) : (
              <FavoriteIcon color='error' fontSize='large' />
            )}
          </Badge>
        </div>
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
