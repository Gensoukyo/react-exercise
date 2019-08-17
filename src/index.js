import React from 'react'
import ReactDOM from 'react-dom'

import axios from './config/api.js'
import App from './App.jsx'

React.Component.prototype.$axios = axios;

ReactDOM.render(<App />, document.getElementById('app'));