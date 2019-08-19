import React from 'react';

import Card from '../components/Card.jsx'
import styles from '../css/main.module.scss'

export default class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			announce: '',

			picList: []
		}
	}

	componentDidMount() {
		this.$axios.getRecommendPicList().then(data => {
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
				{ this.state.announce &&
					<div className={ styles.container }>
						<h2>公告</h2>
						<p>{ this.state.announce }</p>
					</div>
				}
				<ul className={ styles.container }>
					<li className={ styles.title }>推荐作品</li>
					{
						this.state.picList.map(item => {
							return (
								<li className={ styles.item } key={item.pid}>
									<Card wraperWidth={180} {...item}></Card>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
