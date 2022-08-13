import throttle from '@/util/throttle.js'
export default {
  methods: {
    getList(){
      console.log("get");
    },
    handleScroll:throttle(function(){
      let clientHeight = document.documentElement.clientHeight//可视区域高度
      let scrollHeight = document.documentElement.scrollTop//滚动条高度
      let totalHeight = document.documentElement.scrollHeight//文档高度
      if(clientHeight+scrollHeight+100>=totalHeight){
        let cursor = this.$store.getters.getCursor
        
        this.getList(cursor,'bottom')
      }
    },500,500),
    
  },
  mounted() {
    window.addEventListener("scroll",this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll",this.handleScroll)
  },
}