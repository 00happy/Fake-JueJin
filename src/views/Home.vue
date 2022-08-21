<template>
  <div class="home">
    <div class="listWrap">
      <div class="listHead">
        <span :class="sortType == 200 ? 'active' : ''" @click="selectType(200)">推荐</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="selectType(300)" :class="sortType == 300 ? 'active' : ''">最新</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="selectType(3)" :class="sortType != 200 && sortType != 300 ? 'active' : ''">热榜</span>
        <el-select v-model="value" placeholder="请选择" class="selector" popper-class="selectPopper" @change="selectType" v-show="sortType != 200 && sortType != 300" name="selcetInputName">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div class="article" v-if="articleList.length">
        <List v-for="(item, index) in articleList" :key="item.id" :itemInfo="item.item_info || item" :data-index="index" />
      </div>
      <div class="skeWrap">
        <el-skeleton :rows="4" animated />
      </div>
    </div>
    <aside v-if="!adShow">
      <div class="top">
        <div class="head">
          <div>
            <img src="@/assets/date.svg" alt="" />
            <h3>上午好!</h3>
          </div>
          <el-button round class="signin" size="small">去签到</el-button>
        </div>
        <p>点亮你在社区的每一天</p>
      </div>
      <Advertise v-for="(item, index) in adList" :key="index" :imgSrc="item" />
      <DownJuejin />
      <div class="writeRank">
        <div class="head">🎖️作者榜</div>
        <div class="author">
          <img src="https://p9-passport.byteacctimg.com/img/user-avatar/be943b52b5091019bf92eeec817413c9~300x300.image" alt="" />
          <div class="right">
            <div class="name">
              清秋
              <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e108c685147dfe1fb03d4a37257fb417.svg" alt="" />
            </div>
            <div class="bottom">Web前端 @ 公众号：Frontend Radio</div>
          </div>
        </div>
        <div class="author">
          <img src="https://p9-passport.byteacctimg.com/img/user-avatar/be943b52b5091019bf92eeec817413c9~300x300.image" alt="" />
          <div class="right">
            <div class="name">
              清秋
              <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e108c685147dfe1fb03d4a37257fb417.svg" alt="" />
            </div>
            <div class="bottom">Web前端 @ 公众号：Frontend Radio</div>
          </div>
        </div>
        <div class="author">
          <img src="https://p9-passport.byteacctimg.com/img/user-avatar/be943b52b5091019bf92eeec817413c9~300x300.image" alt="" />
          <div class="right">
            <div class="name">
              清秋
              <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e108c685147dfe1fb03d4a37257fb417.svg" alt="" />
            </div>
            <div class="bottom">Web前端 @ 公众号：Frontend Radio</div>
          </div>
        </div>
        <p>完整榜单 <i class="el-icon-arrow-right"></i></p>
      </div>
    </aside>
    <aside v-if="adShow" class="adshow">
      <Advertise v-for="(item, index) in adList" :key="index" :imgSrc="item" />
      <DownJuejin />
    </aside>
  </div>
</template>

<script>
import List from '@/components/list.vue'
import Advertise from '@/components/Advertise.vue'
import DownJuejin from '@/components/DownJuejin.vue'
import getRecommond from '@/api/getRecommond.js'
import getBottom from '@/mixins/getBottom.js'
export default {
  components: {
    List,
    Advertise,
    DownJuejin,
  },
  data() {
    return {
      adList: ['https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d17b46ae3a64f7799ea474d0c5762c3~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?', 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d17b46ae3a64f7799ea474d0c5762c3~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?'],
      articleList: [],
      cate_id: '',
      sortType: 200,
      options: [
        {
          value: '3',
          label: '3天内',
        },
        {
          value: '7',
          label: '7天内',
        },
        {
          value: '30',
          label: '30天内',
        },
        {
          value: 'all',
          label: '全部',
        },
      ],
      value: '3天内',
      adShow: false,
    }
  },
  methods: {
    getList(cursor, flag) {
      this.cate_id = this.$store.getters.getCateId || ''
      getRecommond({
        cate_id: this.cate_id,
        limit: 20,
        sort_type: this.sortType,
        feed_type: this.cate_id.length ? 'cate' : 'all',
        cursor: String(cursor),
      }).then((res) => {
        this.$store.commit('setCursor', res.cursor)
        if (this.cate_id) {
          if (flag == 'bottom') this.articleList = this.articleList.concat(res.data)
          else {
            this.articleList = res.data
          }
        } else {
          if (flag == 'bottom') {
            this.articleList = this.articleList.concat(
              res.data.filter((el) => {
                return el.item_type == 2
              })
            )
          } else {
            this.articleList = res.data.filter((el) => {
              return el.item_type == 2
            })
          }
        }

        // console.log(this.articleList)
      })
    },
    selectType(sortType) {
      if (sortType == this.sortType) return
      this.articleList = []
      this.sortType = parseInt(sortType)
      this.$store.commit('setSortType', parseInt(sortType))
      this.getList()
    },
    handleScroll() {
      let scrollHeight = document.documentElement.scrollTop //滚动条高度
      if (scrollHeight > 1300) {
        this.adShow = true
      } else {
        this.adShow = false
      }
    },
  },
  created() {
    this.getList()
    this.sortType = parseInt(this.$store.getters.getSortType)
    window.addEventListener('scroll', this.scrollChange)
  },
  computed: {
    cateId() {
      return this.$store.getters.getCateId
    },
  },
  watch: {
    cateId(newVal) {
      this.articleList = []
      this.cate_id = newVal
      this.getList()
    },
  },
  mixins: [getBottom],
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/index.scss';
.adshow {
  position: sticky;
  top: 64px;
  right: 0;
}
.home {
  border-radius: 2px;
  @include flexCss();
  align-items: flex-start;
  margin-top: 15px;
  .listWrap {
    background-color: #fff;
    .listHead {
      width: 40rem;
      line-height: 30px;
      padding: 10px 20px;
      border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
      @include fontCss();
      span:hover {
        color: $theme-color;
      }
    }
    .skeWrap {
      padding: 15px 55px 10px 15px;
    }
  }
  aside {
    margin-left: 20px;
    width: 16rem;
    > div:not(:first-child, .el-divider) {
      margin-top: 10px;
      // background-color: #fff;
    }
    .top {
      background-color: #fff;
      padding: 15px;
      .head {
        @include flexCss(space-between);
        div {
          width: 40%;
          @include flexCss(space-between);
        }
        h3 {
          font-weight: normal;
        }
        .signin {
          color: $theme-color;
          border-color: $theme-color;
        }
      }
      p {
        text-align: center;
        @include fontCss();
        margin: 8px 0;
      }
    }
    .writeRank {
      border-radius: 2px;
      background-color: #fff;

      .head {
        border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
        padding: 10px 15px;
        font-stretch: 15px;
      }
      .author {
        border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 10px;
        overflow: hidden;
        img {
          border-radius: 50%;
          width: 45px;
          height: 45px;
        }
        .right {
          width: 80%;
          margin-left: 10px;
          .name {
            font-size: 15px;
            img {
              width: 23px;
              height: 14px;
            }
          }
          .bottom {
            @include fontCss();
            font-size: 13px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .author:hover {
        background-color: #fbfbfb;
      }
      p {
        cursor: pointer;
        font-size: 15px;
        padding: 10px;
        text-align: center;
        color: $theme-color;
      }
    }
  }
}
.active {
  color: $theme-color;
}
.el-divider {
  margin: 0;
}
.el-divider--vertical {
  margin: 0 20px;
  height: 1.3em;
}
</style>
<style>
.selectPopper {
  top: 169px !important;
  font-size: 12px;
}
.el-input__inner[name='selcetInputName'] {
  width: 86px;
  height: 25px;
  margin-left: 15px;
  font-size: 12px;
}
.el-input__inner[name='selcetInputName'] + span {
  transform: scale(0.5);
  margin-right: -10px;
}
</style>
