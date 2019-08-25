import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from '../css/searchBar.module.scss'

export default class searchBar extends React.Component {
	static propTypes = {
		width: PropTypes.number,
		className: PropTypes.string
	};

	constructor(props) {
		super(props);

		this.state = {
			keyword: '',
			list: {
				tags: [],
				pics: []
			},

			tick: null,
			listViewStyle: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
	    this.setState({
	    	keyword: e.target.value
	    });
	    this.state.tick && clearTimeout(this.state.tick);
	    const tick = setTimeout(this.handleSubmit, 200);
	    this.setState({ tick });
	}

	handleSubmit() {
		const keyword = this.state.keyword.trim();
		keyword && this.$axios.getSearch({
			params: { keyword }
		}).then(data => {
			if (data.success) {
				this.setState({
					list: data.data
				})
			}
		})
		return false;
	}

	handleSearch() {
		const keyword = this.state.keyword.trim();
		if (keyword) {
			window.location.href = `/search?keyword=${keyword}`;
		}
	}

	switchList(listViewStyle) {
		listViewStyle = listViewStyle? '':'hidden';
		this.setState({ listViewStyle });
	}

	render() {
		return (
			<div className={ styles.wraper +' '+this.props.className }
				style={ {width: this.props.width } }
			>
				<form className={ styles.bar }
					onSubmit={ this.handleSearch }
				>
					<input type="text" id="keyword" name="word" value={ this.state.keyword } placeholder="搜索" autoComplete="off"
						onChange={ this.handleChange }
						onFocus={ this.switchList.bind(this, true) }
						onBlur={ this.switchList.bind(this, false) }
					/>
					<div className={ styles.submit }
						onClick={ this.handleSearch }
					><i className="iconfont i-search"></i></div>
				</form>
				<ul className={ styles.result +' '+this.state.listViewStyle }>
					{
						this.state.list.tags.map(item => (<li className={ styles.resultItem }
							key={ `tag${item.tid}` }
						>
							<Link to={ `/search?tag=${item.tid}` }>{ item.name }</Link>
						</li>)) 
					}
					{
						this.state.list.pics.map(item => (<li className={ styles.resultItem }
							key={ `pic${item.pid}` }
						>
							<Link to={{
								pathname: '/detail',
							    search: `?pid=${item.pid}`,
							    state: item
							}}>{ item.name }</Link>
						</li>)) 
					}
				</ul>
			</div>
		);
	}
}
