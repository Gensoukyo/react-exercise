import React from 'react';

import styles from '../css/user.module.css'
import Header from '../view/Header.jsx'

export default class User extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			...JSON.parse(window.sessionStorage.getItem('user')),
		}
	}

	render() {
		return (
			<div>
				<Header />
				<div className={ styles.banner }>
					<img className={ styles.bannerImg } src={ this.state.bannerUrl } alt="banner"/>
				</div>
				<div>
					<div className={ styles.wraper }>
						<img className={ styles.avatar } src={ this.state.avatar } alt={ this.state.name }/>
						<div className={ styles.layout }>
							<h1 className={ styles.name }>{ this.state.name }</h1>
							<div className={ styles.subBtn }>关注</div>
						</div>
					</div>
					<div className={ styles.descWraper }>
						<p>{ this.state.desc }</p>
					</div>
				</div>
			</div>
		);
	}
}
