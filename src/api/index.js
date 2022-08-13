import axios from 'axios'

let baseUrl = "http://124.223.70.40:3456"
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.interceptors.request.use(
  config =>{
    config.headers = {
    }
    return config
  },
  err=>{
    return Promise.reject(err)
  }
)

let httpServer = {
  get(url,data){
    return axios.get(baseUrl+url,{params:data}).then((res)=>{
      return Promise.resolve(res.data)
    }).catch(err=>{
      return Promise.reject(err)
    })
  },
  post(url,data){
    return axios.post(baseUrl+url,data,this).then((res)=>{
      return Promise.resolve(res.data)
    }).catch(err=>{
      return Promise.reject(err)
    })
  }
}

export default httpServer