import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'
import styles from '../css/uCard.module.css'

export default class UCard extends React.Component {
	static propTypes = {
		imgSize: PropTypes.number
	};

	constructor(props) {
		super(props);

		const mine = JSON.parse(window.sessionStorage.getItem('user'));
		const imgStyle = this.props.imgSize && {
			width: this.props.imgSize,
			height: this.props.imgSize
		}
		this.state = {
			subed: mine.subs.includes(this.props.uid),
			imgStyle: imgStyle
		}

		this.handleSub = this.handleSub.bind(this);
	}

	handleSub() {
		const mine = JSON.parse(window.sessionStorage.getItem('user'));
		this.$axios.postUserSub({
			uid: mine.uid,
			sub: this.props.uid
		}).then(data => {
			if (data.success) {
				this.setState({
					subed: !this.state.subed 
				});
			}
		})
	}

	render() {
		return (
			<div className={ styles.wraper }>
				<Link to={{
						pathname: '/user',
					    search: `?uid=${this.props.uid}`,
					    state: this.props
					}}>
					<img className={ styles.avatar }
						src={ this.props.avatar }
						alt={ this.props.name }
						style={ this.state.imgStyle }
					/>
				</Link>
				<h1 className={ styles.name }>{ this.props.name }</h1>
				{ !this.props.inner &&
					<div className={ styles.subBtn }
						onClick={ this.handleSub }
					>{
						this.state.subed? '关注中':'关注'
					}</div>
				}
			</div>
		);
	}
}