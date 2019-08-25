import React from 'react';
import { Link, NavLink } from 'react-router-dom'

import styles from '../css/header.module.scss'
import SearchBar from '../components/SearchBar.jsx'

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	quipAccount() {
		window.sessionStorage.clear();
		window.location.href = '/login';
	}

	render() {
		return (
			<header className={ styles.header }>
				<div className={ styles.headerLayout }>
					<h1 className={ styles.logo +' '+'logo' }>Pix</h1>
					<div className={ styles.drop }>
						<div>设置 ▾</div>
						<ul className={ styles.dropList }>
							<li className={ styles.dropItem }>
								<Link to="/user/setting">用户设置</Link>
							</li>
							<li
								className={ styles.dropItem }
								onClick={ this.quipAccount }
							>退出账户</li>
						</ul>
					</div>
					<nav className={ styles.navList }>
						<ul className={ styles.menus }>
							<li className={ styles.home }>
								<NavLink to="/home" activeClassName={ styles.navActive }>
									<i className="iconfont i-homepage_fill"></i>首页
								</NavLink>
							</li>
							<li className={ styles.discovery }>
								<NavLink to="/discovery" activeClassName={ styles.navActive }>
									<i className="iconfont i-discovery"></i>发现
								</NavLink>
							</li>
							<li styles={ styles.upload }>
								<NavLink to="/upload" activeClassName={ styles.navActive }>
									<i className="iconfont i-upload"></i>作品投稿
								</NavLink>&nbsp;|&nbsp;
								<NavLink to="/user/upload" activeClassName={ styles.navActive }>管理</NavLink>
							</li>
							<li className={ styles.fav }>
								<NavLink to="/user/fav" activeClassName={ styles.navActive }>
									<i className="iconfont i-like_fill"></i>收藏
								</NavLink>
							</li>
						</ul>
					</nav>
					<SearchBar width={ 224 } className={ styles.searchBar }/>
				</div>
			</header>
		);
	}
}
