import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Reply from './Reply.jsx'
import CommentItem from './CommentItem.jsx'
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
			replyList: [],
			isreplyShowList: [],
			isReplyBarShow: []
		}

		this.fetchComment = this.fetchComment.bind(this);
		this.fetchCommentUser = this.fetchCommentUser.bind(this);
		this.handelReply = this.handelReply.bind(this);
	}

	componentDidMount() {
		this.fetchComment(this.props.id)
			.then(list => {
				const cids = list.map(comment => comment.uid)
				this.fetchCommentUser(cids).then(data => {
					list = list.map((comment,i) => comment.user = data[i]);
					const replyList = Array(list.length).fill(null);
					const isReplyBarShow = Array(list.length).fill(false);
					const isreplyShowList = Array(list.length).fill(false);
					this.setState({
						list,
						replyList,
						isreplyShowList,
						isReplyBarShow
					});
				});

				const pcids = list.map(comment => comment.pcid);
				this.fetchReplyUser(pcids);
			});
	}

	fetchComment(ids) {
		const id = ids.toString();
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

	fetchCommentUser(cids) {
		const id = cids.toString();
		return this.$axios.postUserListById({ id }).then(data => {
			if (data.success) {
				return data.data;
			}
			return [];
		})
	}

	fetchReplyUser(pcids) {
		return this.fetchComment(pcids)
	}

	handelReply(index) {
		const isReplyBarShow = Array.from(this.state.isReplyBarShow);
		isReplyBarShow[index] = !isReplyBarShow[index];
		this.setState({ isReplyBarShow });
	}

	addMsg() {
		
	}

	render() {
		return (
			<ul>
				{
					this.state.list.map((item, index) => {
						return (
							<li className={ styles.item }
								key={ item.cid }
							>
								<CommentItem {...item } handelReply={ this.handelReply.bind(this, index) }></CommentItem>
								<div>
									
								{ item.pcid.length &&
									<div className={ styles.replyViewBtn }>
										<button>查看回信</button>
									</div>
								}
								{ this.state.isreplyShowList[index] &&
									<Reply></Reply>
								}

								</div>
								{ this.state.isReplyBarShow[index] &&
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
