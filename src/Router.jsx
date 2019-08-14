import React from 'react'
import { Router, Route, Link } from 'react-router'

import App from './App.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Detail from './pages/Detail.jsx'
import User from './pages/User.jsx'
import Search from './pages/Search.jsx'

React.render((
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="login" component={Login} />
			<Route path="detail" component={Detail} />
			<Route path="user" component={User} />
			<Route path="search" component={Search} />
		</Route>
	</Router>
), document.body)