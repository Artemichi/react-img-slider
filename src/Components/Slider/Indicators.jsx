import React from 'react'
import classes from './imgSlider.module.css'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { animated, useSpring } from 'react-spring'

const Indicators = ({ imgs, index, dispatch }) => {
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
            onClick={() => dispatch({ type: 'JUMP_TO', payload: i })}>
            {i === index ? (
              <RadioButtonCheckedIcon color='inherit' />
            ) : (
              <RadioButtonUncheckedIcon color='action' />
            )}
          </div>
        ))}
      </animated.div>
    </React.Fragment>
  )
}

export default Indicators
