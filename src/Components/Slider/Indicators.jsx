import React from 'react'
import classes from './imgSlider.module.css'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const Indicators = ({ imgs, index, dispatch }) => {
	return (
		<React.Fragment>
			<ul className={classes.indicatorsList}>
				{
					imgs.map((e, i) => {
						return (
							<li key={i} onClick={() => dispatch({ type: 'JUMP_TO', payload: i })}>
								{
									i === index ?
										<RadioButtonCheckedIcon color='inherit' fontSize='small' />
										:
										<RadioButtonUncheckedIcon color='action' fontSize='small' />
								}
							</li>
						)
					})
				}
			</ul>
		</React.Fragment>
	)
}

export default Indicators
