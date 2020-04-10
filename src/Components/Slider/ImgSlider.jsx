import React from 'react'
import classes from './imgSlider.module.css'
import reducer from './imgSliderReducer'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Indicators from './Indicators';

const ImgSlider = () => {
	const [images] = React.useState([
		'https://img5.goodfon.ru/original/1920x1080/d/d3/suslik-rastitelnost-fon-morda.jpg',
		'https://img2.goodfon.ru/original/1920x1080/1/9f/golub-ptitsa-progulka.jpg',
		'https://img5.goodfon.ru/original/1920x1080/9/b9/ptitsa-tupik-portret-fon-atlanticheskii.jpg',
		'https://img5.goodfon.ru/original/1920x1080/0/5d/lisa-ryzhaia-morda-profil-portret-fon.jpg'
	])

	const [idx, dispatch] = React.useReducer(reducer, 0)

	return (
		<React.Fragment>
			<div className={classes.carusel} style={{
				backgroundImage: `url(${images[idx]})`,
			}}>
				<button className={`${classes.control} ${classes.prev}`} onClick={() => dispatch({ type: 'PREV_IMG', payload: { index: idx, last: images.length - 1 } })}>
					<ArrowBackIcon fontSize='large' color='action' />
				</button>
				<button className={`${classes.control} ${classes.next}`} onClick={() => dispatch({ type: 'NEXT_IMG', payload: images.length })}>
					<ArrowForwardIcon fontSize='large' color='action' />
				</button>
				<Indicators imgs={images} index={idx} dispatch={dispatch} />
			</div>
		</React.Fragment>
	)
}

export default ImgSlider
