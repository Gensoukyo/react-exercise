import React from 'react';

import styles from '../css/main.module.scss'

export default class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			announce: '',

			picList: []
		}
	}

	render() {
		return (
			<div className={ styles.wraper }>
				{ this.state.announce &&
					<div className={ styles.container }>
						<h2>公告</h2>
						<p>{ this.state.announce }</p>
					</div>
				}
				<ul className={ styles.container }>
					{
						<li>
							<img width="120" height="120" alt=""/>
						</li>
					}
				</ul>
			</div>
		);
	}
}
