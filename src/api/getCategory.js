import httpServer from './index'
let getCategory = httpServer.get("/v2/categories/entry?show_type=0")

export default getCategory