import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import dateFormat from '../config/date-format.js'
import Reply from './Reply.jsx'
import styles from '../css/comment.module.css'

export default class Comment extends React.Component {
	static propTypes = {
		id: PropTypes.array
	};

	constructor(props) {
		super(props);

		const mine = JSON.parse(window.sessionStorage.getItem('user'));
		this.state = {
			uid: mine.uid,
			list: [],
			isReplyShow: false
		}

		this.fetchComment = this.fetchComment.bind(this);
		this.fetchCommentUser = this.fetchCommentUser.bind(this);
	}

	componentDidMount() {
		this.fetchComment
			.then(this.fetchCommentUser);
	}

	fetchComment() {
		const id = this.props.id.toString();
		return this.$axios.postCommentListById({ id })
			.then(data => {
				if (data.success) {
					// this.setState({
					// 	list: data.data
					// });
					return data.data;
				}
				return [];
			})
	}

	fetchCommentUser(list) {
		const id = list.map(comment => comment.uid).toString();
		return this.$axios.postUserListById({ id }).then(data => {
			if (data.success) {
				list = list.map(comment => comment.user = data.data);
				this.setState({ list });
			}
		})
	}

	handelReply() {
		this.setState({
			isReplyShow: !this.state.isReplyShow 
		});
	}

	addMsg() {
		
	}

	render() {
		return (
			<ul>
				{
					this.state.list.map(item => {
						return (
							<li className={ styles.item }
								key={ item.cid }
							>
								<Link to={{
										pathname: '/user',
									    search: `?uid=${this.item.uid}`,
									    state: item.user
									}}>
									<img className={ styles.avatar }
										src={ item.user.avatar }
										alt={ item.user.name }
									/>
								</Link>
								<div>
									<h1 className={ styles.name }>{ item.user.name }</h1>
									<h1>{ item.msg }</h1>
									<div>
										<span>{ dateFormat(item.date) }</span>
										<span>·</span>
										<span onClick={ this.handelReply } >回信</span>
									</div>
								</div>
								{ this.state.isReplyShow &&
									<div>
										<Reply uid={ this.state.uid }
											targetUid={ item.uid }
											addMsg={ this.addMsg }
										></Reply>
									</div>
								}
							</li>
						)
					})
				}
			</ul>
		);
	}
}
