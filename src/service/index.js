const axios = require('axios')
const auth = require('../auth')

const http = axios.create({
  baseURL: '/',
  responseType: 'json',
  timeout: 10000,
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    config.headers.Authorization = auth[0].code   // 添加请求头
    return config
  },
  err => {
    return Promise.reject(error)
  },
)

// 返回拦截器
http.interceptors.response.use(
  res => {
    if (res.data.status == 200 || res.data.code == 200) {
      return Promise.resolve(res.data.data)
    }
    return Promise.reject(res)
  },
  error => {
    return Promise.reject(error)
  },
)

class Service {
  query(params) {
    let request = []
    params.forEach(item => {
      request.push(http.post(item.url, item.params, item.config))
    })
    return Promise.all(request).then(res => { // 为了达到聚合接口的效果，这里统一使用Promise.all
      return res
    })
  }
}

module.exports = new Service()
