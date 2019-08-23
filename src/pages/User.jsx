import React from 'react';

import styles from '../css/user.module.css'
import Header from '../view/Header.jsx'

export default class User extends React.Component {
	constructor(props) {
		super(props);

		const mine = JSON.parse(window.sessionStorage.getItem('user'));
		this.state = {
			...mine,
			outer: false
		};

		this.fetchUser = this.fetchUser.bind(this);
	}

	componentDidMount() {
		const params = new URLSearchParams(this.props.location.search);
		const uid = params.uid;
		if (uid && uid !== this.state.uid) {
			this.fetchTheUser(uid)
		}
	}

	fetchTheUser(uid) {
		this.$axios.getTheUser({ uid })
			.then(data => {
				if (data.success) {
					data.data.outer = true;
					data.data.subed = this.state.subs.includes(uid);
					this.setState(data.data);
				}
			})
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
							{ this.state.outer &&
								<div className={ styles.subBtn }>{
									this.state.subed? '关注中':'关注'
								}</div>
							}
						</div>
					</div>
					<div className={ styles.descWraper }>
						<p>个人介绍：{ this.state.desc }</p>
					</div>
				</div>
			</div>
		);
	}
}
