import React from 'react';
import PropTypes from 'prop-types'

import styles from '../css/pagination.module.scss' 

export default class Pagination extends React.Component {
	static propTypes = {
		cur: PropTypes.number,
		start: PropTypes.number,
		size: PropTypes.number,
		total: PropTypes.number,
		view: PropTypes.number
	};

	static defaultProps = {
		cur: 1,
		start: 1,
		view: 5
	};

	constructor(props) {
		super(props);

		this.state = {
			cur: this.props.cur,
			start: this.props.start,
			count: Math.ceil(this.props.total / this.props.size)
		}
	}

	handleClick(list, go) {
		if (go<1 || go>this.props.total) return ;
		let { start } = this.state;
		if (go < list[0]) {
			start -=3;
			start = start<=5? 1:start;
		} else if (go > list[list.length-1]){
			start++;
		}
		this.setState({
			cur: go,
			start 
		});
	}

	render() {
		let start = this.state.start, center = this.props.view-2;
		const list = this.props.total<=5 || start <=5
			? Array(this.props.total<=5? this.props.total:5).fill().map((p,i) => i+1)
			: (start + center <= this.props.total)
				?Array(this.props.total - start + 1).fill().map(() => start++)
				:Array(center).fill().map(() => start++);
		return (
			<ul className={ styles.list }>
				<li onClick={ this.handleClick.bind(this, list, this.state.cur - 1) }>pre</li>
				{ this.state.start > 5 &&
					<React.Fragment>
						<li onClick={ this.handleClick.bind(this, list, 1) }></li>
						<li>...</li>
					</React.Fragment>
					
				}
				{
					list.map((num) => (
						<li onClick={ this.handleClick.bind(this, list, num) }
							className={ num === this.state.cur? styles.cur:'' }
							key={ String(num) }
						>{ num }</li>
					))
				}
				{ this.state.start > 5 && (this.state.start + center > this.props.total) && (this.state.start < this.props.total - 5) &&
					<React.Fragment>
						<li>...</li>
						<li onClick={ this.handleClick.bind(this, list, this.props.total) }></li>
					</React.Fragment>
					
				}
				<li onClick={ this.handleClick.bind(this, list, this.state.cur + 1) }>next</li>
			</ul>
		);
	}
}

// <=5, all view
// >5, for cur in: 1~5..,...N-5~N, ,1,2... start~start+2...N-1,N