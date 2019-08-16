import React from 'react';

import styles from '../css/login.module.scss'

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		let path = this.props.location.pathname;
		const isLogin = path.includes('login'),
			isSignup = path.includes('signup'),
			isInit = !isLogin && !isSignup;
		const jmpPath = isLogin&&'/signup' || isSignup&&'/login',
			jmpName = isLogin&&'立即注册' || isSignup&&'立即登录';

		this.state = {
			isLogin,
			isSignup,
			isInit,
			jmpPath,
			jmpName,

			username: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		console.log(this.props);
	}

	handleChange(type, e) {
		const input = {};
		input[type] = e.target.value;
	    this.setState(input);
	}

	render() {
		return (
			<div>
				<header className="header">
					{ this.state.isInit &&
						<h1 className="logo">Pix</h1>
					}
					{ !this.state.isInit &&
						<a className={ styles.toggleBtn +' '+ styles[this.props.location.pathname.replace(/\W/,'')] }
							href={ this.state.jmpPath }
						>{ this.state.jmpName }</a>
					}
				</header>
				<main className={styles.signForm}>
					<div className={styles.signHead}>
						<h1>Pix</h1>
					</div>
					<div className={styles.signBody}>
						{!this.state.isInit &&
							<form action="" className={styles.inputFieldGroup}>
								<div className={styles.inputField}>
									<input type="text" autoComplete="username" placeholder={ '邮箱地址' + (this.state.isSignup? '/ID':'')} autoCapitalize="off"
										value={this.state.username}
										onChange={this.handleChange.bind(this, 'username')}
									/>
								</div>
								<div className={styles.inputField}>
									<input type="password" autoComplete="current-password" placeholder="密码" autoCapitalize="off"
										value={this.state.password}
										onChange={this.handleChange.bind(this, 'password')}
									/>
								</div>
							</form>
						}
						{!this.state.isSignup &&
							<button type="submit" className={styles.signupFormSubmit}>立即注册</button>
						}
						{!this.state.isLogin &&
							<button type="submit" className={styles.signupFormSubmit}>登录</button>
						}
					</div>
				</main>
			</div>
		);
	}
}
