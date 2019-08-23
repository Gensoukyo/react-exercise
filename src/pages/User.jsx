import React from 'react';
import { NavLink } from 'react-router-dom'

import styles from '../css/user.module.css'
import Header from '../view/Header.jsx'
import Card from '../components/Card.jsx'
import DCard from '../components/DCard.jsx'
import MCard from '../components/MCard.jsx'

export default class User extends React.Component {
	constructor(props) {
		super(props);

		const mine = JSON.parse(window.sessionStorage.getItem('user'));
		const linkList = {
			manage: '首页',
			follow: '关注',
			fav: '收藏'
		}
		this.state = {
			...mine,
			outer: false,

			linkList: linkList,

			uploadList: [],
			followList: [],
			favList: [],
		};

		this.fetchTheUser = this.fetchTheUser.bind(this);
		this.handleSub = this.handleSub.bind(this);
	}

	componentDidMount() {
		// fetch user info
		const params = new URLSearchParams(this.props.location.search);
		const uid = params.get('uid');
		let p;

		if (uid && uid !== this.state.uid) {
			p = this.fetchTheUser(uid)
		}
		// fectch lists
		p.then(() => {
			this.fectchList('uploadList', 'postPicListById', this.state.uploads);
			this.fectchList('followList', 'postUserListById', this.state.subs);
			this.fectchList('favList', 'postPicListById', this.state.favs);
		})

		/*
			更新api
			新增MCard
			css 及 过渡
		 */
	}

	fetchTheUser(uid) {
		const params = { uid };
		return this.$axios.getTheUser({ params })
			.then(data => {
				if (data.success) {
					data.data.outer = true;
					data.data.subed = this.state.subs.includes(uid);
					this.setState(data.data);
				}
			})
	}

	fectchList(type, method, id) {
		this.$axios[method]({ id }).then(data => {
			if (data.success) {
				const state = {};
				state[type] = data.data;
				this.setState(state);
			}
		})
	}

	handleSub() {
		if (!this.state.subed) {
			const user = JSON.parse(window.sessionStorage.getItem('user'));
			this.$axios.postUserSub({
				uid: user.uid,
				sub: this.state.uid
			}).then(data => {
				if (data.success) {
					this.setState({
						subed: true 
					});
				}
			})
		}
	}

	isParamsActive() {

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
								<div className={ styles.subBtn }
									onClick={ this.handleSub }
								>{
									this.state.subed? '关注中':'关注'
								}</div>
							}
						</div>
					</div>
					<div className={ styles.descWraper }>
						<p>个人介绍：{ this.state.desc }</p>
					</div>
				</div>
				<ul>
					{
						Object.entries(this.state.linkList).map(link => {
							return (
								<li>
									<NavLink to={ `/user/${link[0]}` }
										className={ styles.link }
										activeClassName={ styles.linkActive }
										isActive={ this.isParamsActive }
										key={ link[0] }
									>{ link[1] }</NavLink>
								</li>
							)
						})
					}
				</ul>
				<div>
					{ this.state.uploads.length &&
						<ul>
							{
								this.state.uploadList.map(item => {
									return (
										<li className={ styles.item } key={item.pid}>
											<DCard wraperWidth={372} {...item} link={`/detail?=${item.pid}`}></DCard>
										</li>
									)
								})
							}
						</ul>
					}
					{ this.state.subs.length &&
						<ul>
							{
								this.state.followList.map(item => {
									return (
										<li className={ styles.item } key={item.uid}>
											<MCard></MCard>
										</li>
									)
								})
							}
						</ul>
					}
					{ this.state.favs.length &&
						<ul>
							{
								this.state.favList.map(item => {
									return (
										<li className={ styles.item } key={item.pid}>
											<Card wraperWidth={372} {...item}></Card>
										</li>
									)
								})
							}
						</ul>
					}
				</div>
			</div>
		);
	}
}
