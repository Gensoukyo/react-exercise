import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import UCard from '../components/UCard.jsx'
import TagList from '../components/TagList.jsx'
import Header from '../view/Header.jsx'
import Card from '../components/Card.jsx'
import DCard from '../components/DCard.jsx'

import styles from '../css/detail.module.css'

export default class Detail extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pic: this.props.location.state,
			owner: null,
			uploads: []
		}

		this.fetchThePic = this.fetchThePic.bind(this);
		this.fetchTheUser = this.fetchTheUser.bind(this);
		this.fetchTheRelateUserPic = this.fetchTheRelateUserPic.bind(this);
	}

	componentDidMount() {
		if (!this.state.pic) {
			this.fetchThePic()
				.then(this.fetchTheUser)
				.then(this.fetchTheRelateUserPic);
		} else {
			this.fetchTheUser()
				.then(this.fetchTheRelateUserPic);
		}
	}

	fetchTheUser() {
		const { uid } = this.state.pic,
			params = { uid };
		return this.$axios.getTheUser({ params })
			.then(data => {
				if (data.success) {
					this.setState({
						owner: data.data
					});
				}
				return data.data;
			})
	}

	fetchTheRelateUserPic(user) {
		const id = (user.uploads || []).toString();
		return this.$axios.postPicListById({ id })
			.then(data => {
				if (data.success) {
					this.setState({
						uploads: data.data
					});
				}
				return data.data;
			})
	}

	fetchThePic() {
		const params = new URLSearchParams(this.props.location.search);
		const id = params.get('pid').toString();
		return this.$axios.postPicListById({ id })
			.then(data => {
				if (data.success) {
					const pic = data.data.pop();
					this.setState({
						pic: pic
					});
				}
			})
	}

	render() {
		return ( this.state.pic &&
			<div>
				<Header />
				<div className={ styles.wraper }>
					<main className={ styles.main }>
						<a href={ this.state.pic.url }
							className={ styles.presentation }
							target="_blank"
						>
							<img src={ this.state.pic.url }
								alt={ this.state.pic.name }
								className={ styles.pic }
							/>
						</a>
						<div className={ styles.picInfo }>
							<h1 className={ styles.title }>{ this.state.pic.name }</h1>
							<TagList id={ this.state.pic.tid }
								className={ styles.tagWraper }
							></TagList>
							{ this.state.owner &&
								<div className={ styles.userDesc }>
									<UCard imgSize={50} {...this.state.owner} ></UCard>
									<a href={ `/user?uid=${this.state.owner.uid}` }
										className={ styles.userCheck }
									>查看全部作品</a>
								</div>
							}
						</div>
						{ this.state.uploads.length > 5 &&
							<ul className={ styles.uploadList }>
								{
									this.state.uploads.map(item => {
										return (
											<li className={ styles.uploadItem } key={item.pid}>
												<Card {...item}
													wraperWidth={140} 
												></Card>
											</li>
										)
									})
								}
							</ul>
						}
						<hr/>
						
					</main>
					<aside className={ styles.side }>
						{ this.state.owner &&
							<div className={ styles.userWraper }>
								<UCard imgSize={50} {...this.state.owner} ></UCard>
							</div>
						}
						<ul className={ styles.displayList }>
							<li className={ styles.displayTitle }>最新作品</li>
							{
								this.state.uploads.slice(0,3).sort().map(item => {
									return (
										<li className={ styles.displayItem } key={item.pid}>
											<DCard {...item}
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
					</aside>
				</div>
			</div>
		);
	}
}

