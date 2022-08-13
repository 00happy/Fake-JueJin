export default {
  setCateId(state,payload){
    state.cate_id = payload.cate_id
  },
  setTabIndex(state,payload){
    state.tabIndex = payload.tabIndex
  },
  setSortType(state,sortType){
    state.sortType = sortType
  },
  setCursor(state,cursor){
    state.cursor = cursor
  },
  setTabBtns(state,tabBtns){
    state.tabBtns = tabBtns
  },
  setTabBtnIndex(state,tabBtnIndex){
    state.tabBtnIndex = tabBtnIndex
  },
  setUser_id:(state,user_id)=>{
    state.user_id = user_id
  },
  setTag_ids:(state,tag_ids)=>{
    state.tag_ids = tag_ids
  },
  setCategoryCursor:(state,categoryCursor)=>{
    state.categoryCursor = categoryCursor
  }
}