import React from 'react';
import { Link } from 'react-router-dom'

import Card from '../components/Card.jsx'
import styles from '../css/aside.module.scss'

export default class Aside extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: JSON.parse(window.sessionStorage.getItem('user')),
			picList: []
		}
	}

	componentDidMount() {
		this.$axios.getRankPicList().then(data => {
			if (data.success) {
				this.setState({
					picList: data.data
				});
			}
		})
	}

	render() {
		return (
			<div className={ styles.wraper }>
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
						<Link className={ styles.link } to='/user/follow'>关注</Link>
					</li>
					<li className={ styles.item } >
						<Link className={ styles.link } to='/user/fav'>收藏</Link>
					</li>
					<li className={ styles.item } >
						<Link className={ styles.link } to='/user/upload'>稿件</Link>
					</li>
				</ul>
				<ul className={ styles.side }>
					<li className={ styles.title }>今日排行榜</li>
					{
						this.state.picList.map(item => {
							return (
								<li className={ styles.item } key={item.pid}>
									<Card wraperWidth={197} imgSize={97} {...item}></Card>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
