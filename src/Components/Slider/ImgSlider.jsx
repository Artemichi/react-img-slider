import React, { useState, useEffect, useReducer } from 'react'
import classes from './imgSlider.module.css'
import reducer from './imgSliderReducer'
import { useSpring, animated } from 'react-spring'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ToggleOffSharpIcon from '@material-ui/icons/ToggleOffSharp'
import ToggleOnSharpIcon from '@material-ui/icons/ToggleOnSharp'
import PlayCircleFilledSharpIcon from '@material-ui/icons/PlayCircleFilledSharp'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import FavoriteIcon from '@material-ui/icons/Favorite'
import SaveSharpIcon from '@material-ui/icons/SaveSharp'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import InfoSharpIcon from '@material-ui/icons/InfoSharp'
import Popover from '@material-ui/core/Popover'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Indicators from './Indicators'
import Slide from './Slide'

const ImgSlider = ({ images, links, likes, info }) => {
  const [showControls, setShowControls] = useState(() =>
    window.innerWidth > 767 ? true : false
  )
  const [autoPlay, setAutoPlay] = useState(false)
  const [idx, dispatch] = useReducer(reducer, 0)
  const controlsFade = useSpring({ opacity: showControls ? 1 : 0 })
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [dir, setDir] = useState('')

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

  const open = Boolean(anchorEl)
  const id = open ? 'popover' : undefined

  return (
    <React.Fragment>
      <Slide
        idx={idx}
        images={images}
        dispatch={dispatch}
        autoPlay={autoPlay}
        dir={dir}
        setDir={setDir}
      />
      {/* CONTROLS */}
      <animated.div style={controlsFade}>
        <div className={`${classes.control} ${classes.prev}`}>
          <IconButton
            aria-label='prev'
            color='inherit'
            onClick={() => {
              setDir('right')
              dispatch({
                type: 'PREV_IMG',
                payload: { index: idx, last: images.length - 1 },
              })
            }}
          >
            <ArrowBackIcon fontSize='large' />
          </IconButton>
        </div>
        <div className={`${classes.control} ${classes.next}`}>
          <IconButton
            aria-label='next'
            color='inherit'
            onClick={() => {
              setDir('left')
              dispatch({ type: 'NEXT_IMG', payload: images.length })
            }}
          >
            <ArrowForwardIcon fontSize='large' />
          </IconButton>
        </div>
      </animated.div>

      {/* SETTINGS */}
      <div className={classes.settings}>
        <IconButton
          aria-describedby={id}
          aria-label='info'
          color='inherit'
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <InfoSharpIcon fontSize='large' />
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Card className={classes.root}>
            <CardContent>
              <Typography color='textSecondary'>Автор</Typography>
              <Typography variant='h6' component='h2'>
                {info[idx].user}
              </Typography>
              <Divider />

              {info[idx].description ? (
                <>
                  <Typography color='textSecondary'>Описание</Typography>
                  <Typography variant='h6' component='h2'>
                    {info[idx].description}
                  </Typography>
                  <Divider />
                </>
              ) : null}

              <Typography variant='body2' component='p'>
                {info[idx].location}
              </Typography>
            </CardContent>
          </Card>
        </Popover>

        <IconButton
          aria-label='download'
          color='inherit'
          onClick={() => {
            const win = window.open(links[idx])
            win.focus()
          }}
        >
          <SaveSharpIcon fontSize='large' />
        </IconButton>
        <IconButton
          aria-label='controls'
          color='inherit'
          onClick={() => setShowControls((current) => !current)}
        >
          {showControls ? (
            <ToggleOnSharpIcon fontSize='large' />
          ) : (
            <ToggleOffSharpIcon fontSize='large' />
          )}
        </IconButton>
        <IconButton
          aria-label='play'
          color='inherit'
          onClick={() => setAutoPlay((current) => !current)}
        >
          {autoPlay ? (
            <PauseCircleFilledIcon fontSize='large' />
          ) : (
            <PlayCircleFilledSharpIcon fontSize='large' />
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
      <Indicators
        imgs={images}
        index={idx}
        dispatch={dispatch}
        setDir={setDir}
      />
    </React.Fragment>
  )
}

export default ImgSlider
