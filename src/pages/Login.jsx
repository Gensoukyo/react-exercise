import React from 'react';

import styles from '../css/login.module.scss'

export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(this.props);
		console.log(styles);
	}

	render() {
		return (
			<div>
				<h1>Pix</h1>
				<div className={styles.signForm}>
					{this.props.location.pathname}
				</div>
			</div>
		);
	}
}
