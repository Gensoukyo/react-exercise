import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import routes from './Router.jsx'
import './css/common.css'

export default class App extends React.Component {
    render() {
        return (
			<Router>
				<Switch>{
					routes.map((route,index) => {
						return(
							<Route
								key={index}
								path={route.path}
								exact={route.exact}
								component={route.component}
							/>
						)
					})
				}</Switch>
			</Router>
        );
    }
}