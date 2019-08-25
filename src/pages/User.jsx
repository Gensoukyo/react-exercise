import React from 'react';
import { NavLink } from 'react-router-dom'

import styles from '../css/user.module.css'
import Header from '../view/Header.jsx'
import Card from '../components/Card.jsx'
import DCard from '../components/DCard.jsx'

export default class User extends React.Component {
	constructor(props) {
		super(props);

		const mine = JSON.parse(window.sessionStorage.getItem('user'));
		const linkList = {
			upload: '首页',
			follow: '关注',
			fav: '收藏'
		}
		this.state = {
			...mine,
			outer: false,

			linkList: linkList,	// nav links

			uploadList: [],
			followList: [],
			favList: []
		};

		this.fetchTheUser = this.fetchTheUser.bind(this);
		this.initListOfUser = this.initListOfUser.bind(this);
		this.fectchList = this.fectchList.bind(this);
		this.handleSub = this.handleSub.bind(this);
		this.isParamsActive = this.isParamsActive.bind(this);
	}

	componentDidMount () {
		const params = new URLSearchParams(this.props.location.search);
		const uid = params.get('uid');

		if (uid && uid !== this.state.uid) {
			// 当前页不是本人的个人主页，需要重新获取userinfo
			return this.fetchTheUser(uid).then(this.initListOfUser);
		}
		this.initListOfUser();
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
		id = id.toString();
		return this.$axios[method]({ id }).then(data => {
			if (data.success) {
				const state = {};
				state[type] = this.dealRawData(type, data.data);
				this.setState(state);
			}
		})
	}

	initListOfUser () {
		this.state.uploads.length && this.fectchList('uploadList', 'postPicListById', this.state.uploads);
		this.state.subs.length && this.fectchList('followList', 'postUserListById', this.state.subs);
		this.state.favs.length && this.fectchList('favList', 'postPicListById', this.state.favs);
	}

	dealRawData(type, data) {
		const solve = {
			followList: () => {
				data.forEach(u => u.url = u.avatar);
				// DCard组件必须的prop
			}
		}
		if (type in solve) {
			solve[type]();
		}
		return data;
	}

	// 在他人主页关注
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

	isParamsActive(type) {
		if (this.props.match && this.props.match.params.type) {
			return this.props.match.params.type === type;
		}
		return type === Object.keys(this.state.linkList)[0];
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
				<ul className={ styles.tabList }>
					{
						Object.entries(this.state.linkList).map(link => {
							return (
								<li className={ styles.tabItem } key={ link[0] }>
									<NavLink to={ `/user/${link[0]}${this.props.location.search}` }
										className={ styles.link }
										activeClassName={ styles.linkActive }
										isActive={ this.isParamsActive.bind(this, link[0]) }
									>{ link[1] }</NavLink>
								</li>
							)
						})
					}
				</ul>
				<div className={ styles.listWraper }>
					{ this.state.uploads.length &&
						<ul className={ styles.listContainer +' '+
							(this.isParamsActive('upload')? styles.listActive:'') }>
							{
								this.state.uploadList.map(item => {
									return (
										<li className={ styles.item } key={item.pid}>
											<DCard {...item}
												imgHeight={200} 
												link={{
												pathname: '/detail',
											    search: `?pid=${item.pid}`,
											    state: item
											}}></DCard>
										</li>
									)
								})
							}
						</ul>
					}
					{ this.state.subs.length &&
						<ul className={ styles.listContainer +' '+
							(this.isParamsActive('follow')? styles.listActive:'') }>
							{
								this.state.followList.map(item => {
									return (
										<li className={ styles.item } key={item.uid}>
											<DCard imgHeight={200} {...item} link={`/user?uid=${item.uid}`}></DCard>
										</li>
									)
								})
							}
						</ul>
					}
					{ this.state.favs.length &&
						<ul className={ styles.listContainer +' '+
							(this.isParamsActive('fav')? styles.listActive:'') }>
							{
								this.state.favList.map(item => {
									return (
										<li className={ styles.item } key={item.pid}>
											<Card wraperWidth={200} {...item}></Card>
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
