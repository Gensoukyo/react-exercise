import React from 'react'
import Loadable from 'react-loadable'
import { Redirect } from 'react-router-dom'

// import Home from './pages/Home.jsx'
// import Login from './pages/Login.jsx'
// import Detail from './pages/Detail.jsx'
// import User from './pages/User.jsx'
// import Search from './pages/Search.jsx'

function loadable(filename) {
	return Loadable({
	    loader:() => import(`./pages/${filename}.jsx`),
	    loading:() => (<div>Loading...</div>)
	});
}


function requireAuth(Layout, path = '/login') {
    window.sessionStorage.getItem('uerId') ?
        (<Layout />) :
        (<Redirect to={path} />)
}

const routes = [
	{
		path: '/',
		exact: true,
		component: requireAuth(loadable('Home'))
	},
    { 
    	path: '/home',
    	component: requireAuth(loadable('Home'))
    },
	{
		path: '/(login|signup)',
		component: window.sessionStorage.getItem('uerId')
			?(<Redirect to='/home' />)
			:loadable('Login')
	},
    {
    	path: '/detail',
    	component: loadable('Detail')
    },
    {
    	path: '/user',
    	component: requireAuth(loadable('User'))
    },
    {
    	path: '/(search|tag)',
    	component: loadable('Search')
    }
];

export default routes