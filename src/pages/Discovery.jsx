import React from 'react';
import { NavLink } from 'react-router-dom'

import Header from '../view/Header.jsx'
import Card from '../components/Card.jsx'
import DCard from '../components/DCard.jsx'
import Pagination from '../components/Pagination.jsx'

import styles from '../css/discovery.module.scss'

export default class Discovery extends React.Component {
	constructor(props) {
		super(props);

		const types = {
			recommend:  (item) => (<Card wraperWidth={200} {...item}></Card>),
			collection: (item) => (<DCard wraperWidth={372} {...item}></DCard>),
			rank: (item) => (<Card wraperWidth={372} imgWidth={100} {...item}></Card>)
		}
		const queryUrls = {
			recommend: 'getRecommendPicList',
			collection: 'getSpecialPicList',
			rank: 'getRankPicList'
		}
		const linkList = {
			recommend: '推荐作品',
			collection: '精选合辑',
			rank: '今日排行榜'
		}
		let { type } = this.props.match.params;
		let component = types[type],
			queryUrl = queryUrls[type];

		// 非匹配路由重定向到推荐作品
		!component && window.location.replace('/discovery/recommend');

		component = component || types.recommend;
		queryUrl = queryUrl || queryUrls.recommend;

		this.state = {
			cur: 1,
			size: 12,
			component: component,
			queryUrl: queryUrl,
			list: [],
			linkList: linkList
		}

		this.onCurrentPageChange = this.onCurrentPageChange.bind(this);
		this.fetchList = this.fetchList.bind(this);
	}

	componentDidMount() {
		this.fetchList();
	}

	onCurrentPageChange(cur) {
		this.setState({ cur });
		this.fetchList();
	}

	fetchList() {
		const params = {
			page: this.state.cur,
			limit: this.state.size
		}
		this.$axios[this.state.queryUrl]({ params }).then(data => {
			if (data.success) {
				this.setState({
					list: data.data
				});
			}
		})
	}

	render() {
		return (
			<div>
				<Header />
				<div className={ styles.wraper }>
					<ul className={ styles.container }>
						<li className={ styles.linkGrounp }>
							{
								Object.entries(this.state.linkList).map(link => {
									return (
										<NavLink to={ `/discovery/${link[0]}` }
											className={ styles.link }
											activeClassName={ styles.linkActive }
											key={ link[0] }
										>{ link[1] }</NavLink>
									)
								})
							}
						</li>
						{
							this.state.list.map(item => {
								return (
									<li className={ styles.item } key={item.pid}>
										{ this.state.component(item) }
									</li>
								)
							})
						}
					</ul>
					<div className={ styles.pagination }>
						<Pagination cur={ this.state.cur } size={ this.state.size } total={70} start={1} onCurrentPageChange={ this.onCurrentPageChange }></Pagination>
					</div>
				</div>
			</div>
		);
	}
}
