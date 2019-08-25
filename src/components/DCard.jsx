import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from '../css/dCard.module.css'

export default class DCard extends React.Component {
	static propTypes = {
		imgHeight: PropTypes.number,
		link: PropTypes.oneOfType([
		    PropTypes.string,
		    PropTypes.object
		])
	};

	constructor(props) {
		super(props);

		const imgStyle = this.props.imgHeight? {
			height: this.props.imgHeight
		}:{}

		this.state = {
			imgStyle
		}
	}

	render() {
		return (
			<React.Fragment>
				<Link to={ this.props.link }
					className={ styles.collectionLink }
					style={ this.state.imgStyle }
				>
					<img src={ this.props.url } alt={ this.props.name }
						className={ styles.collectionImg }
					/>
				</Link>
				<Link to={ this.props.link }
					className={ styles.collectionLink }
				>
					<p className={ styles.collectionName + ' textOverflow' }>{ this.props.name }</p>
				</Link>
			</React.Fragment>
		);
	}
}
