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
  </div>
</template>
<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import tabBarShow from '@/mixins/tabBarShow.js'
import { mapState } from 'vuex'
export default {
  components: {
    Header,
    TabBar,
  },
  methods: {
    switchBtns(index) {
      this.$store.commit('setTabBtnIndex', index)
    },
  },
  mixins: [tabBarShow],
  computed: {
    ...mapState(['tabIndex', 'tabBtns', 'tabBtnIndex']),
    tabshow() {
      return this.$router.currentRoute.meta.tabShow
    },
  },
  // watch: {
  //   tabIndex(newVal) {
  //     console.log(newVal)
  //   },
  //   tabBtns(newVal) {
  //     console.log(newVal)
  //   },
  // },
  mounted() {
    console.log(this.$router.currentRoute.meta.tabShow)
  },
}
</script>
<style lang="scss">
@import '@/assets/css/index.scss';
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
    transition: all 1s;
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
    width: 850px;
    margin: 10px auto;
    margin-left: 145px;
    position: relative !important;
    button {
      border: 0;
      border-radius: 12.5px;
      padding: 5px 9px;
      background-color: #fff;
      color: #515767;
      font-size: 14px;
      height: 25px;
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
</style>
