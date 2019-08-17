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
			jmpName = isLogin&&'立即注册' || isSignup&&'登录';

		this.state = {
			isLogin,
			isSignup,
			isInit,
			jmpPath,
			jmpName,

			username: '',
			password: '',

			globalStyle: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const params = {
			w: document.documentElement.scrollWidth,
			h: document.documentElement.scrollHeight
		}
		this.$axios.getRandomImg({ params })
			.then(data => {
				if (data.success) {
					const globalStyle = {
						height: params.h + 'px',
						background: `url(${data.data})`,
						backgroundSize: 'cover'
					}
					this.setState({globalStyle});
				}
			})
	}

	handleChange(type, e) {
		const input = {};
		input[type] = e.target.value;
	    this.setState(input);
	}

	handleSubmit(type) {
		if (this.state.isInit) {
			window.location.replace('/'+type.toLowerCase());
		} else {
			this.submit(type)
		}
	}

	submit(type) {
		this.$axios[`post${type}`]({
			username: this.state.username,
			password: this.state.password
		}).then(data => {
			if (data.success) {
				window.sessionStorage.setItem('userId', data.data.uid);
				window.location.href = '/home';
			}
		})
	}

	render() {
		return (
			<div style={ this.state.globalStyle }>
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
						<h1 className={styles.signHeadTitle}>Pix</h1>
						<span>oOps! Let's enjoy the pictrues</span>
					</div>
					<div className={styles.signBody}>
						{!this.state.isInit &&
							<form action="" className={styles.inputFieldGroup}>
								<div className={styles.inputField}>
									<input type="text" autoComplete="username" placeholder={ '邮箱地址' + (this.state.isLogin? '/ID':'')} autoCapitalize="off"
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
						{!this.state.isLogin &&
							<button
								className={styles.signupFormSubmit}
								onClick={this.handleSubmit.bind(this, 'Signup')}
							>立即注册</button>
						}
						{!this.state.isSignup &&
							<button 
								className={styles.signupFormSubmit}
								onClick={this.handleSubmit.bind(this, 'Login')}
							>登录</button>
							
						}
					</div>
				</main>
			</div>
		);
	}
}
