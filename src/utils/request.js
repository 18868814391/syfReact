import axios from 'axios'

// 创建axios实例
if (process.env.NODE_ENV == 'development') { // 测试用
  // https://merchant-api-f.netmi.com.cn
  // https://merchant-api-test.netmi.com.cn
  // https://royal-home-test.ysjp2018.com
  // axios.defaults.baseURL = '/'
} else {
  axios.defaults.baseURL = window.location.origin
}
const service = axios.create({
    timeout: 20000 // 请求超时时间;
  })
  service.interceptors.request.use(
    config => {
      return config
    },
    error => {
      Promise.reject(error)
    }
  )
  service.interceptors.response.use(
    response => {
      const res = response.data 
      if (res.errcode !== 0) {
        // if (res.errcode == 10000 || res.errcode == 10001 || res.errcode == 10002) {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // }
        return Promise.reject(res)
      }
      else { 
        if (response.data.data) {
          return response.data
        } else {
          response.data['data'] = ''
          return response.data
        }
      }   
    },
    error => {
      return Promise.reject(error)
    }
  )
  export default service