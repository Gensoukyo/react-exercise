import React from 'react';

import Header from '../view/Header.jsx'
import Aside from '../view/Aside.jsx'
import Main from '../view/Main.jsx'

import styles from '../css/home.module.scss'

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Header />
				<main className={ styles.container }>
					<Main />
					<Aside />
				</main>
			</div>
		);
	}

	componentDidMount() {
		document.title = 'Pix';
		console.log(this.props);
	}
}
