<template>
  <div class="wrap">
    <div class="tabWrap">
      <ul class="tabBar">
        <li :class="tabIndex == -2 ? 'active' : ''" @click="switchCate('', -2)">综合</li>
        <li :class="tabIndex == -1 ? 'active' : ''" @click="switchCate('', -1)">关注</li>
        <el-popover placement="bottom-start" width="340" trigger="hover" :visible-arrow="false" v-for="(item, index) in categoryList" :key="item.id" :class="tabIndex == index ? 'active' : ''">
          <div v-show="tagsList.length">
            <button v-for="(item2, index2) in tagsList" :key="item2.tag_id" @click="switchTags(item.category_id, index, index2)" :class="tabBtnIndex == index2 && tabIndex == index ? 'btnActive' : ''">{{ item2.tag_name }}</button>
          </div>
          <li slot="reference" @mouseenter="hoverTags(item.category_id)" @click="switchCate(item.category_id, index)">{{ item.category_name }}</li>
        </el-popover>
      </ul>
      <div class="tag">标签管理</div>
    </div>
  </div>
</template>

<script>
import getCategory from '@/api/getCategory'
import getTags from '@/api/getTags'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      categoryList: [],
      tagsList: [],
      tagButtons: [],
    }
  },
  methods: {
    hoverTags(cate_id) {
      this.tagsList = []
      getTags(cate_id).then((res) => {
        this.tagsList = res.data
      })
    },
    switchCate(cate_id, index, index2 = -1) {
      this.$store.commit('setTabIndex', { tabIndex: index })
      this.$store.commit('setCateId', { cate_id: cate_id })
      this.$store.commit('setTabBtnIndex', index2)
      if (index < 0) {
        this.tagButtons = []
        return
      }
      getTags(cate_id).then((res) => {
        this.tagButtons = res.data
        this.$store.commit('setTabBtns', this.tagButtons)
      })
    },
    switchTags(cate_id, index, index2) {
      if (this.tabIndex == index) this.$store.commit('setTabBtnIndex', index2)
      else {
        this.switchCate(cate_id, index, index2)
      }
    },
  },
  created() {
    getCategory.then((res) => {
      this.categoryList = res.data
      if (this.tabIndex >= 0) {
        let cate_id = this.categoryList[this.tabIndex].category_id
        // console.log(this.categoryList)
        getTags(cate_id).then((res) => {
          this.tagButtons = res.data
        })
      }
    })
  },
  computed: mapState(['tabIndex', 'tabBtnIndex']),
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/index.scss';
.wrap {
  background-color: #fff;
  .tabWrap {
    background-color: #fff;
    @include flexCss(space-between);
    color: #71777c;
    font-size: 14px;
    cursor: pointer;
    height: 50px;
    width: 960px;
    margin: 0 auto;
    .tabBar {
      @include flexCss(space-between);
      width: 63%;
      display: flex;
      justify-content: space-between;
      li:hover {
        color: $theme-color;
      }
    }
    .tag:hover {
      color: $theme-color;
    }
  }
}
.active {
  color: $theme-color;
}
button {
  border: 0;
  border-radius: 12.5px;
  padding: 5px 9px;
  background-color: #f4f5f5;
  color: #5f6679;
  font-size: 14px;
  height: 25px;
  cursor: pointer;
  margin: 5px 8px;
}
button:hover {
  color: $theme-color;
}
.hide {
  height: 0;
}
.btnActive {
  color: #fff;
  background-color: $theme-color;
}
</style>
