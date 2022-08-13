// import throttle from '@/util/throttle.js'
export default {
  data() {
    return {
      childList:[]
    }
  },
  methods: {
    cateScroll:()=>{
      if(this.childList.length==0) return
      console.log("scroll:",this.childList);
      for(let i=0;i<this.childList.length;i++){
        let top = this.childList[i].getBoundingClientRect().top//距离窗口顶部
        if(top>0){
          this.$store.commit("setCategoryCursor",i)
          break
        }
      }
      
    }
    
  },
  mounted() {
    window.addEventListener("scroll",this.cateScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll",this.cateScroll)
  },
}