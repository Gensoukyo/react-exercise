import React from 'react';

import Card from '../components/Card.jsx'
import DCard from '../components/DCard.jsx'
import Pagination from '../components/Pagination.jsx'

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

	}

	render() {
		return (
			<div className={ styles.wraper }>
				<Pagination size={12} total={70} start={1} ></Pagination>
				<ul className={ styles.container }>
				
				</ul>
			</div>
		);
	}
}
