import React from 'react';

export default React.createClass({
	render() {
		return (
			<div id="app">
				{this.props.children}
			</div>
		)
	}
})
