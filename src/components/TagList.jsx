import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import styles from '../css/tagList.module.css'

export default class TagList extends React.Component {
	static propTypes = {
		id: PropTypes.array
	};

	constructor(props) {
		super(props);

		this.state = {
			list: []
		}
	}

	componentDidMount() {
		const id = this.props.id.toString();
		this.$axios.postTagListById({ id })
			.then(data => {
				if (data.success) {
					this.setState({
						list: data.data
					});
				}
			})
	}

	render() {
		return (
			<ul>
				{
					this.state.list.map(tag => {
						return (
							<li className={ styles.item }
								key={ tag.tid }
							>
								<Link to={ `/tag/tid=${tag.tid}` }>
									#{ tag.name }
								</Link>
							</li>
						)
					})
				}
			</ul>
		);
	}
}
