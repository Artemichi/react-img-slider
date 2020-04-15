import React from 'react'
import classes from './imgSlider.module.css'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { animated, useSpring } from 'react-spring'

const Indicators = ({ imgs, index, dispatch, setDir }) => {
  const swingUP = useSpring({
    from: { transform: `translateY(200px)` },
    transform: `translateY(0px)`,
  })

  return (
    <React.Fragment>
      <animated.div style={swingUP} className={classes.indicatorsList}>
        {imgs.map((e, i) => (
          <div
            key={i}
            onClick={() => {
              setDir(() => (index > i ? 'right' : 'left'))
              dispatch({ type: 'JUMP_TO', payload: i })
            }}
          >
            {i === index ? (
              <RadioButtonCheckedIcon color='inherit' />
            ) : (
              <RadioButtonUncheckedIcon color='inherit' />
            )}
          </div>
        ))}
      </animated.div>
    </React.Fragment>
  )
}

export default Indicators
