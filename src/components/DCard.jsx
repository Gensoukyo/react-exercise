import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from '../css/dCard.module.css'

export default class DCard extends React.Component {
	static propTypes = {
		wraperWidth: PropTypes.number
	};

	constructor(props) {
		super(props);

		const wraperStyle = this.props.wraperWidth && {
			width: this.props.wraperWidth + 'px'
		}

		this.state = {
			wraperStyle
		}
	}

	render() {
		return (
			<Link to={ `/tag${this.props.tid}` }
				className={ styles.collectionLink }
				style={ this.state.wraperWidth }
			>
				<img src={ this.props.url } alt={ this.props.name }
					className={ styles.collectionImg }
				/>
				<p className={ styles.collectionName }>{ this.props.name }</p>
			</Link>
		);
	}
}
