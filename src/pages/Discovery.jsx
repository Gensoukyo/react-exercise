import React from 'react';

import Card from '../components/Card.jsx'
import DCard from '../components/DCard.jsx'

import styles from '../css/discovery.module.scss'

export default class Discovery extends React.Component {
	constructor(props) {
		super(props);

		const types = {
			recommend:  (item) => (<Card wraperWidth={200} {...item}></Card>),
			collection: (item) => (<DCard wraperWidth={372} {...item}></DCard>),
			rank: (item) => (<Card wraperWidth={372} imgWidth={100} {...item}></Card>)
		}
		const type = (this.props.match.params.type in types)
			?types[this.props.match.params.type]
			:types.recommend;

		this.state = {
			type,
			list: []
		}
	}

	componentDidMount() {
		this.$axios.
	}

	render() {
		return (
			<div className={ styles.wraper }>
				<ul>
					
				</ul>
				<ul className={ styles.container }>
					{
						this.state.recommendPicList.map(item => {
							return (
								<li className={ styles.item } key={item.pid}>
									<Card wraperWidth={180} {...item}></Card>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
