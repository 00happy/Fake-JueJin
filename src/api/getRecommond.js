import httpServer from './index'
let getRecommond = (data)=>{
  return httpServer.post("/v2/article/indexList",data)
}

export default getRecommond
