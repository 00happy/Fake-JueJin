<template>
  <div id="app">
    <div class="appHeader">
      <Header class="header" :class="tabShow ? 'slideDowm' : 'slideUP'" />
      <div class="headerSpace"></div>
      <div class="tab" v-show="tabshow">
        <TabBar class="tabBarClass" :class="tabShow ? 'slideDowm' : 'slideUP'" />
        <div class="tabBarSpace"></div>
        <div class="tagButtons" v-show="tabIndex >= 0 && tabBtns">
          <button :class="tabBtnIndex == -1 ? 'activeButton' : ''" @click="switchBtns(-1)">全部</button>
          <button v-for="(item, index) in tabBtns" :key="item.tag_id" :class="tabBtnIndex == index ? 'activeButton' : ''" @click="switchBtns(index)">
            {{ item.tag_name }}
          </button>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="upTop" v-if="adShow" @click="handleTop">
      <svg t="1661050921239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4471" width="200" height="200">
        <path
          d="M832 64H192c-17.6 0-32 14.4-32 32s14.4 32 32 32h640c17.6 0 32-14.4 32-32s-14.4-32-32-32zM852.484 519.469L538.592 205.577a30.79 30.79 0 0 0-3.693-4.476c-6.241-6.241-14.556-9.258-22.899-9.09-8.343-0.168-16.658 2.849-22.899 9.09a30.778 30.778 0 0 0-3.693 4.476L171.419 519.566C164.449 525.448 160 534.228 160 544c0 0.058 0.004 0.115 0.004 0.172-0.124 8.285 2.899 16.529 9.096 22.727 6.202 6.202 14.453 9.224 22.743 9.096 0.066 0 0.131 0.005 0.197 0.005H352v320c0 35.2 28.8 64 64 64h192c35.2 0 64-28.8 64-64V576h160c0.058 0 0.115-0.004 0.172-0.004 8.285 0.124 16.529-2.899 22.727-9.096 6.198-6.198 9.22-14.442 9.096-22.727 0-0.058 0.004-0.115 0.004-0.172 0.001-9.826-4.489-18.65-11.515-24.532z"
          p-id="4472"
        ></path>
      </svg>
    </div>
    <div class="upmsg">
      <svg t="1661051684190" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9756" width="200" height="200">
        <path
          d="M939.776 249.088h-158.72l-1.28-1.664-2.176 1.664-0.128 0.128h-499.2v-0.128c-20.48 0-37.12 16.64-37.12 37.12v363.904l0.128-0.128v73.344c0 20.608 16.512 37.12 36.992 37.12h494.08c33.536 0 65.664 13.824 88.832 38.144l83.712 88.064c11.52 12.16 31.872 3.968 31.872-12.672V286.208h0.128c0-20.48-16.64-37.12-37.12-37.12z"
          fill="#BAE7FF"
          p-id="9757"
        ></path>
        <path d="M744.832 130.816H83.328c-20.48 0-37.12 16.64-37.12 37.12v587.776c0 16.768 20.48 24.832 31.872 12.672l83.712-88.064c23.168-24.32 55.296-38.144 88.832-38.144h494.08c20.48 0 37.12-16.64 37.12-37.12V167.808c0-20.352-16.512-36.992-36.992-36.992z m0 0" fill="#319EEC" p-id="9758"></path>
        <path
          d="M656.256 346.112H198.784c-14.848 0-27.008-12.032-27.008-27.008 0-14.848 12.032-27.008 27.008-27.008h457.472c14.848 0 27.008 12.032 27.008 27.008 0 14.976-12.032 27.008-27.008 27.008zM440.96 480.64H198.784c-14.848 0-27.008-12.032-27.008-27.008 0-14.848 12.032-27.008 27.008-27.008h242.176c14.848 0 27.008 12.032 27.008 27.008-0.128 14.976-12.16 27.008-27.008 27.008z m0 0"
          fill="#FFFFFF"
          p-id="9759"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import tabBarShow from '@/mixins/tabBarShow.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      adShow: false,
    }
  },
  components: {
    Header,
    TabBar,
  },
  methods: {
    switchBtns(index) {
      this.$store.commit('setTabBtnIndex', index)
    },
    handleScroll() {
      let scrollHeight = document.documentElement.scrollTop //滚动条高度
      if (scrollHeight > 1300) {
        this.adShow = true
      } else {
        this.adShow = false
      }
      console.log(scrollHeight)
    },
    handleTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      console.log(123)
    },
  },
  mixins: [tabBarShow],
  computed: {
    ...mapState(['tabIndex', 'tabBtns', 'tabBtnIndex']),
    tabshow() {
      return this.$router.currentRoute.meta.tabShow
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang="scss">
@import '@/assets/css/index.scss';
.upmsg {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
.upTop {
  position: fixed;
  bottom: 100px;
  right: 50px;
}
.upTop,
.upmsg {
  margin: 12px 0 0;
  padding: 0;
  width: 40px;
  height: 40px;
  line-height: 1;
  color: #909090;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgb(50 50 50 / 4%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  background-color: #f4f5f5;
  .appHeader {
    position: relative;
  }
  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    transition: all 0.3s;
  }
  .headerSpace {
    height: 60px;
  }
  .tabBarClass {
    position: fixed;
    left: 0;
    right: 0;
    top: 60px;
    z-index: 1;
  }
  .tabBarSpace {
    height: 50px;
  }
  .tagButtons {
    line-height: 35px;
    width: 960px;
    margin: 0px auto;
    position: relative !important;

    button {
      border: 0;
      border-radius: 12.5px;
      padding: 0px 9px;
      background-color: #fff;
      color: #909090;
      font-size: 14px;
      height: 25px;
      line-height: 25px;
      cursor: pointer;
      margin: 5px 8px;
    }
    button:hover {
      color: $theme-color;
    }
  }
  .activeButton {
    background-color: $theme-color !important;
    color: #fff !important;
  }
  .tabBarSpace2 {
    height: 130px;
  }
}
ul {
  list-style: none;
}
.slideUP {
  transform: translateY(-60px);
  transition: all 0.3s;
}
.slideDowm {
  transform: translateY(0);
  transition: all 0.3s;
}
@keyframes slideUP {
  from {
    transform: translateY();
  }
  to {
    transform: translateY(-60px);
  }
}
</style>
