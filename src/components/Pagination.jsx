import React from 'react';
import PropTypes from 'prop-types'

export default class Pagination extends React.Component {
	static propTypes = {
		cur: PropTypes.number,
		start: PropTypes.number,
	};

	static defaultProps = {

	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div></div>
		);
	}
}
