import React from 'react';

import Card from '../components/Card.jsx'
import DCard from '../components/DCard.jsx'
import styles from '../css/main.module.scss'

export default class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			announce: '',

			recommendPicList: [],
			freshPicList: [],
			specialPicList: [],
		}
	}

	componentDidMount() {
		// 推荐图片
		this.$axios.getRecommendPicList().then(data => {
			if (data.success) {
				this.setState({
					recommendPicList: data.data
				});
			}
		})
		// 最新图片
		this.$axios.getFreshPicList().then(data => {
			if (data.success) {
				this.setState({
					freshPicList: data.data
				});
			}
		})
		// 精选合辑
		this.$axios.getSpecialPicList().then(data => {
			if (data.success) {
				this.setState({
					specialPicList: data.data
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
				<ul className={ styles.container +' '+ styles.head }>
					<li className={ styles.title }>推荐作品</li>
					{
						this.state.recommendPicList.map(item => {
							return (
								<li className={ styles.item } key={item.pid}>
									<Card {...item}></Card>
								</li>
							)
						})
					}
				</ul>
				<ul className={ styles.container }>
					<li className={ styles.title }>最新作品</li>
					{
						this.state.freshPicList.map(item => {
							return (
								<li className={ styles.item } key={item.pid}>
									<Card {...item}></Card>
								</li>
							)
						})
					}
				</ul>
				<ul className={ styles.container }>
					<li className={ styles.title }>精选特辑</li>
					{
						this.state.specialPicList.map(item => {
							return (
								<li className={ styles.spItem } key={item.tid}>
									<DCard {...item} link={ `/tag?tid=${item.tid}` }></DCard>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
