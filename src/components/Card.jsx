import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from '../css/card.module.css'

export default class Card extends React.Component {
	static propTypes = {
		imgSize: PropTypes.number
	};

	constructor(props) {
		super(props);

		const imgStyle = {
			width: this.props.imgSize,
			height: this.props.imgSize
		}
		const nameStyle = this.props.imgSize? {
			marginLeft: this.props.imgSize + 8,
			textAlign: 'left',
			height: this.props.imgSize
		}:{
			clear: 'both'
		}
		this.state = {
			user: JSON.parse(window.sessionStorage.getItem('user')),

			defaultUrl: '//wx4.sinaimg.cn/mw690/006RXp8Mgy1g64zq9z8ldg306s06sqgc.gif',
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
			<div className={ styles.card }>
				<Link to={{
					pathname: '/detail',
				    search: `?pid=${this.props.pid}`,
				    state: this.props
				}} className={ styles.link }
					style={ this.state.imgStyle }
				>
					<img src={ this.props.url || this.state.defaultUrl } alt={ this.props.name }
						className={ styles.img }
					/>
					<i className={ 'iconfont ' + (this.state.faved? 'i-like_fill':'i-like') }
						onClick={ this.handleFav }
					></i>
				</Link>
				<div style={ this.state.nameStyle }>
					<Link to={{
						pathname: '/detail',
					    search: `?pid=${this.props.pid}`,
					    state: this.props
					}} className={ styles.name +' '+ styles.firstName + ' textOverflow' }
					>{ this.props.name }</Link>
					<div className={ styles.nameWraper }
					>
						<span className={ styles.nameby }>by</span>
						<Link to={ `/user?uid=${this.props.uid}` }
							className={ styles.nameAs + ' textOverflow' }
						> { this.props.author } </Link>
					</div>
					{ this.props.imgSize &&
						<span className={ styles.rank }>{ this.props.order }</span>
					}
				</div>
			</div>
		);
	}
}
