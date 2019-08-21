import React from 'react';
import PropTypes from 'prop-types'

import styles from '../css/pagination.module.scss' 

export default class Pagination extends React.Component {
	static propTypes = {
		cur: PropTypes.number,
		start: PropTypes.number,
		size: PropTypes.number,
		total: PropTypes.number,
		view: PropTypes.number,
		onCurrentPageChange: PropTypes.func
	};

	static defaultProps = {
		cur: 1,
		start: 1,
		view: 5
	};

	constructor(props) {
		super(props);

		this.state = {
			start: this.props.start,
			count: Math.ceil(this.props.total / this.props.size)
		}
	}

	handleClick(list, go) {
		let { start } = this.state,
			center = this.props.view-2;
		if (go === 1) {
			start = 1;
		}
		if (go === this.state.count) {
			start = this.state.count - center;
		}
		if (go === 'pre') {
			go = this.props.cur - 1;
			if (go < 1) return ;
			if (go - center <= 1) {
				start = 1;
			} else if(go < start) {
				start = go - center + 1;
			}
		} else if (go === 'next') {
			go = this.props.cur + 1;
			if (go > this.state.count) return ;
			if (go + center >= this.state.count) {
				start = this.state.count - center;
			} else if(go >= start + center) {
				start = go;
			}
		}
		this.setState({
			start: start
		});
		this.props.onCurrentPageChange(go);
	}

	render() {
		let start = this.state.start, center = this.props.view-2;
		const list = this.state.count<=5
			? Array(this.state.count).fill().map((p,i) => i+1)
			: start === 1
				?Array(4).fill().map((p,i) => i+1)
				:(start + center >= this.state.count)
					?Array(4).fill().map(() => start++)
					:Array(center).fill().map(() => start++);
		return (
			<ul className={ styles.list }>
				<li onClick={ this.handleClick.bind(this, list, 'pre') }
					className={ styles.item }
				>
					<i className="iconfont i-pre"></i>
				</li>
				{ (this.state.count > 5 && this.state.start >1) &&
					<React.Fragment>
						<li onClick={ this.handleClick.bind(this, list, 1) }
							className={ styles.item }
						>1</li>
						<li>...</li>
					</React.Fragment>
					
				}
				{
					list.map((num) => (
						<li onClick={ this.handleClick.bind(this, list, num) }
							className={ styles.item +' '+ (num === this.props.cur? styles.cur:'') }
							key={ String(num) }
						>{ num }</li>
					))
				}
				{ this.state.count > 5 && (this.state.start + center < this.state.count) &&
					<React.Fragment>
						<li>...</li>
						<li onClick={ this.handleClick.bind(this, list, this.state.count) }
							className={ styles.item }
						>{ this.state.count }</li>
					</React.Fragment>
				}
				<li onClick={ this.handleClick.bind(this, list, 'next') }
					className={ styles.item }
				>
					<i className="iconfont i-next"></i>
				</li>
			</ul>
		);
	}
}

// <=5, all view
// >5, for cur in: 1~5..,...N-5~N, ,1,2... start~start+2...N-1,N