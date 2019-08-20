import React from 'react'
import Loadable from 'react-loadable'
import { BrowserRouter, Redirect } from 'react-router-dom'

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
    return window.sessionStorage.getItem('user') ?
        loadable(Layout) :
        () => (<Redirect to={path} />)
}

const routes = [
	{
		path: '/',
		exact: true,
		component: window.sessionStorage.getItem('user')
            ?loadable('Home')
            :loadable('Login')
	},
    {
    	path: '/home',
    	component: requireAuth('Home')
    },
	{
		path: '/(login|signup)',
		component: window.sessionStorage.getItem('user')
			?() => (<Redirect to='/home' />)
			:loadable('Login')
	},
    {
    	path: '/detail',
    	component: loadable('Detail')
    },
    {
        path: '/discovery',
        component: loadable('Discovery')
    },
    {
    	path: '/user',
    	component: requireAuth('User')
    },
    {
    	path: '/(search|tag)',
    	component: loadable('Search')
    }
];

export default routes