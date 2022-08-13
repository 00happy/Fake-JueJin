import throttle from '@/util/throttle.js'
export default {
  data(){
    return {
      tabShow:true,
      lastScrollHeight:0
    }
  },
  methods: {
    handleScroll:throttle(function(){
    let scrollHeight = document.documentElement.scrollTop//滚动条高度
    this.tabShow = (this.lastScrollHeight>=scrollHeight||scrollHeight<500)?true:false
    this.lastScrollHeight = scrollHeight
    },500,500),
    
  },
  mounted() {
    window.addEventListener("scroll",this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll",this.handleScroll)
  },
}