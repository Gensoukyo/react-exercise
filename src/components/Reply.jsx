import React from 'react'
import PropTypes from 'prop-types'

import styles from '../css/reply.module.css'

export default class Reply extends React.Component {
	static propTypes = {
		uid: PropTypes.string.isRequired,
		targetUid: PropTypes.string.isRequired,
		addMsg: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			msg: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit() {
		const t = new Date().getTime();
		const msg = {
			uid: this.props.uid,
			targetUid: this.props.targetUid,
			msg: this.state.msg,
			date: t
		}
		this.$axios.postReply(msg)
			.then(data => {
				if (data.success) {
					this.props.addMsg(msg);	// 父组件发送消息
					this.setState({
						msg: '' 
					});
				}
		})
	}

	handleChange(e) {
		const msg = {
			msg: e.target.value
		}
		this.setState({msg});
	}

	render() {
		return (
			<div>
				<div className={ styles.barWraper }>
					<textarea placeholder="回复..." maxlength="140" rows="1"
						className={ styles.inputBar }
						onChange={ this.handleChange }
						value={this.state.msg }
					></textarea>
					<button type="submit" onClick={ this.handleSubmit }>发送</button>
				</div>
			</div>
		);
	}
}
