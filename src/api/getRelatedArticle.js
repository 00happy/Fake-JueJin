import httpServer from './index'
let getRelatedArticle = (data)=>{
  console.log("data:",data);
  return httpServer.post("/v2/article/relatedEntry",data)
}

export default getRelatedArticle