import React from 'react'
import PropTypes from 'prop-types'

import dateFormat from '../config/date-format.js'
import styles from '../css/commmentItem.module.css'

function CommentItem(props) {
	return (
		<div>
			<Link to={{
				pathname: '/user',
			    search: `?uid=${props.user.uid}`,
			    state: props.user
			}}>
				<img className={ styles.avatar }
					src={ props.user.avatar }
					alt={ props.user.name }
				/>
			</Link>
			<div>
				<h1 className={ styles.name }>{ props.user.name }</h1>
				<h2>{ props.msg }</h2>
				<div>
					<span>{ dateFormat(props.date) }</span>
					<span>·</span>
					<span onClick={ props.handleReply } >回信</span>
				</div>
			</div>
		</div>
	);
}

CommentItem.propTypes = {
	user: PropTypes.object,
	msg: PropTypes.string,
	date: PropTypes.number,
	handleReply: PropTypes.func
};

export default CommentItem;
