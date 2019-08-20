import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from '../css/card.module.css'

export default class Card extends React.Component {
	static propTypes = {
		wraperWidth: PropTypes.number,
		imgWidth: PropTypes.number
	};

	constructor(props) {
		super(props);

		const wraperStyle = this.props.wraperWidth && {
			width: this.props.wraperWidth+'px'
		}
		const imgStyle = this.props.imgWidth && {
			width: this.props.imgWidth+'px',
			marginRight: '8px'
		}
		const nameStyle = imgStyle? {
			width: (this.props.wraperWidth - this.props.imgWidth -8) + 'px',
			textAlign: 'left',
			boxSizing: 'border-box'
		}:{
			width: '100%'
		}
		this.state = {
			user: JSON.parse(window.sessionStorage.getItem('user')),

			defaultUrl: '//wx4.sinaimg.cn/mw690/006RXp8Mgy1g64zq9z8ldg306s06sqgc.gif',
			wraperStyle: wraperStyle,
			imgStyle: imgStyle,
			nameStyle: nameStyle,

			faved: false
		}

		this.handleFav = this.handleFav.bind(this);
	}

	handleFav(e) {
		e.preventDefault();
		this.$axios.postUserFav({
			uid: this.state.user.uid,
			pid: this.props.pid
		}).then(data => {
			if (data.success) {
				this.setState({
					faved: !this.state.faved
				});
			}
		})
		return false;
	}

	render() {
		return (
			<div className={ styles.card } style={ this.state.wraperStyle }>
				<Link to={ `/detail?pid=${this.props.pid}` } className={ styles.link }
					style={ this.state.imgStyle }
				>
					<img src={ this.props.url || this.state.defaultUrl } alt={ this.props.name }
						className={ styles.img }
					/>
					<i className={ 'iconfont ' + (this.state.faved? 'i-like_fill':'i-like') }
						onClick={ this.handleFav }
					></i>
				</Link>
				<Link to={ `/detail?pid=${this.props.pid}` }
					className={ styles.name +' '+ styles.firstName + ' textOverflow' }
					style={ this.state.nameStyle }
				>{ this.props.name }</Link>
				<div className={ styles.nameWraper }
					style={ this.state.nameStyle }
				>
					<span className={ styles.nameby }>by</span>
					<Link to={ `/user?uid=${this.props.uid}` }
						className={ styles.name + ' textOverflow' }
					> { this.props.author } </Link>
				</div>
				{ this.state.imgStyle &&
					<span className={ styles.rank }>{ this.props.index + 1 }</span>
				}
			</div>
		);
	}
}
