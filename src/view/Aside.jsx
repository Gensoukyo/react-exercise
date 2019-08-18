import React from 'react';

import { Link } from 'react-router-dom'
import styles from '../css/aside.module.scss'

export default class Aside extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: JSON.parse(window.sessionStorage.getItem('user'))
		}
	}

	render() {
		return (
			<ul className={ styles.side }>
				<li className={ styles.user }>
					<Link to="/user">
						<img src={ this.state.user.avatar } alt="avatar"
							className={styles.img}
						/>
						<span className={ styles.name + ' textOverflow'  }>{ this.state.user.name }</span>
					</Link>
				</li>
				<li className={ styles.item } >
					<Link to='/user/follow'>关注</Link>
				</li>
				<li className={ styles.item } >
					<Link to='/user/fav'>收藏</Link>
				</li>
				<li className={ styles.item } >
					<Link to='/user/manage'>稿件</Link>
				</li>
			</ul>
		);
	}
}
