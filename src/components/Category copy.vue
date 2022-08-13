<template>
  <div class="cateWrap" v-if="cateList.length" @scroll="sideScroll">
    <a class="tab" v-for="(item, index) in cateList" :key="index" :style="cateCss(item.nodeName)" @click="switchCursor(index)" :class="index == categoryCursor ? 'active' : ''">{{ item.text }} </a>
    <!-- <div class="tab" :style="tabCss"></div> -->
  </div>
</template>

<script>
export default {
  props: {
    cateList: [],
    baseSize: Number,
  },
  computed: {
    cateCss() {
      return function (Name) {
        let ml = parseInt(Name.substr(-1, 1))
        return `margin-left:${(ml - this.baseSize) * 15}px`
      }
    },
    categoryCursor() {
      return this.$store.getters.getCategoryCursor
    },
    tabCss() {
      let cursor = this.categoryCursor
      return `top:${cursor * 40 + 85}px`
    },
  },
  watch: {
    categoryCursor(newVal) {
      console.log(newVal)
    },
  },
  // created(){
  //   document.getElementsByClassName("cateWrap")[0].addEventListener("scroll",this.sideScroll)
  // },
  // beforeDestroy(){
  //   document.getElementsByClassName("cateWrap")[0].removeEventListener("scroll",this.sideScroll)
  // },
  methods: {
    switchCursor(index) {
      event.target.href = '#cateHref' + index
      this.$store.commit('setCategoryCursor', index)
    },
    sideScroll() {
      let activeTop = document.getElementsByClassName('cateWrap')[0].getBoundingClientRect().top
      console.log(activeTop)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/index.scss';
.cateWrap {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  max-height: 70vh;
  .active {
    color: $theme-color;
  }
  .tab {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 0px;
      margin-top: 7px;
      width: 4px;
      height: 16px;
      background: #1e80ff;
      border-radius: 0 4px 4px 0;
    }
  }

  a {
    display: block;
    color: #111;
    text-decoration: none;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 40px;
    font-size: 14px;
    padding: 0 10px;
    cursor: pointer;
  }

  a:hover {
    background-color: #f7f8fa;
  }
}
</style>
