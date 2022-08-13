import httpServer from './index'
let getCategory = (cate_id)=>{
  return httpServer.post(`/v2/categories/tags`,{
    "cate_id":cate_id
  })
}

export default getCategory