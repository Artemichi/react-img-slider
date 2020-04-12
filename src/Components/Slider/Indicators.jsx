import React from 'react'
import classes from './imgSlider.module.css'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { Motion, spring } from 'react-motion'

const Indicators = ({ imgs, index, dispatch, show }) => {
  return (
    <React.Fragment>
      <Motion
        defaultStyle={{ opacity: 0, y: 200 }}
        style={{
          opacity: spring(show ? 1 : 0),
          y: spring(show ? 0 : 200),
        }}>
        {(style) => (
          <ul
            className={classes.indicatorsList}
            style={{
              opacity: style.opacity,
              transform: `translateY(${style.y}px)`,
            }}>
            {imgs.map((e, i) => {
              return (
                <li
                  key={i}
                  onClick={() => dispatch({ type: 'JUMP_TO', payload: i })}>
                  {i === index ? (
                    <RadioButtonCheckedIcon color='error' fontSize='small' />
                  ) : (
                    <RadioButtonUncheckedIcon
                      color='inherit'
                      fontSize='small'
                    />
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </Motion>
    </React.Fragment>
  )
}

export default Indicators
