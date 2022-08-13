import httpServer from './index'
let getRecByTagIds = (data)=>{
  return httpServer.post("/v2/article/recommendEntryByTagIds",data)
}

export default getRecByTagIds
