import axios from 'axios'
import Qs from 'qs'

const baseUrl = '/api'
const config = {
	postLogin: '/login',
	postSignup: '/signup',
	getRandomImg: '/random_img'
}

for (let [name, path] of Object.entries(config)) {
	let method = name.match(/^[a-z]+/)[0];
	if (['get','post'].includes(method)) {
		if (method === 'post') {
			axios[name] = (data) => axios[method](`${baseUrl}${path}`, Qs.stringify(data), {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			});
		} else {
			axios[name] = (data) => axios[method](`${baseUrl}${path}`, data);
		}
	}
}

// 添加响应拦截器
axios.interceptors.response.use(res => {
	return res.data;
}, err => {
	Promise.reject(err.response)
})

export default axios