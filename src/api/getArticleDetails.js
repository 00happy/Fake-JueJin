import httpServer from './index'
let getArticleDetails = (article_id)=>{
  return httpServer.get(`/v2/article/detail?article_id=${article_id}`)
}

export default getArticleDetails