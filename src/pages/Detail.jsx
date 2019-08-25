import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import UCard from '../components/UCard.jsx'
import TagList from '../components/TagList.jsx'
import Header from '../view/Header.jsx'
import styles from '../css/detail.module.css'

export default class Detail extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pic: this.props.location.state,
			owner: null
		}

		this.fetchThePic = this.fetchThePic.bind(this);
		this.fetchTheUser = this.fetchTheUser.bind(this);
	}

	componentDidMount() {
		if (!this.state.pic) {
			this.fetchThePic().then(this.fetchTheUser);
		} else {
			this.fetchTheUser();
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
					</main>
					<aside className={ styles.side }>
						{ this.state.owner &&
							<div className={ styles.userWraper }>
								<UCard imgSize={50} {...this.state.owner} ></UCard>
							</div>
						}
					</aside>
				</div>
			</div>
		);
	}
}

