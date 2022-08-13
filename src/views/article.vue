<template>
  <div class="articleWrap" v-if="article.article_info">
    <div class="toolSide">
      <el-badge :value="article.article_info.digg_count" class="tool">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianzan_kuai"></use>
        </svg>
      </el-badge>
      <el-badge :value="article.article_info.comment_count" class="tool">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
      </el-badge>
      <div class="tool">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
      </div>

      <div class="tool">
        <el-popover trigger="hover" placement="right-start" popper-class="shareProper">
          <div class="share">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weixin"></use>
            </svg>
            <span>微信</span>
          </div>
          <div class="share">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xinlangweibo"></use>
            </svg>
            <span>新浪微博</span>
          </div>
          <div class="share">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-QQ"></use>
            </svg>
            <span>QQ</span>
          </div>

          <svg class="icon" aria-hidden="true" slot="reference">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
        </el-popover>
      </div>
      <el-divider></el-divider>
      <div class="tool">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinfangjubao"></use>
        </svg>
      </div>
      <div class="tool">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bg-fullscreen"></use>
        </svg>
      </div>
    </div>
    <div class="toolSpace"></div>
    <div class="article">
      <div class="contentWrap">
        <h1 v-copy="article.article_info.title">
          {{ article.article_info.title }}
        </h1>
        <div class="articleAvator">
          <div class="left">
            <img :src="article.author_user_info.avatar_large" alt="" />
            <div class="public">
              <div class="top">
                <span>{{ article.author_user_info.user_name }}</span>
                <img :src="require('@/assets/lv-' + article.author_user_info.level + '.png')" alt="" />
              </div>
              <div class="bottom">{{ formateDate }} · 阅读 {{ article.article_info.view_count }}</div>
            </div>
          </div>
          <el-button type="primary" size="small" icon="el-icon-plus" class="attention">关注</el-button>
        </div>
        <div class="coverImg">
          <img :src="article.article_info.cover_image" />
        </div>

        <div class="markWrap markdown-body">
          <VueMarkdown :source="article.article_info.mark_content" class="markContent markdown-body" ref="markRef"></VueMarkdown>
        </div>
        <div class="end">
          <span
            >分类:<el-button type="info" class="classify" size="small" @click="goto(article.category.category_id)">{{ article.category.category_name }}</el-button></span
          >
          <span
            >标签:<el-button type="primary" class="tag" size="small" v-for="item in article.tags" :key="item.id">{{ item.tag_name }}</el-button></span
          >
        </div>
      </div>
      <div class="comment">
        <h3>评论</h3>

        <div class="inputWrap">
          <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84d3d27a3c364a6b997dfa25d21351d8~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?" alt="" class="commentAvator" />
          <el-input type="textarea" :autosize="{ minRows: 2 }" placeholder="输入评论（Enter换行，Ctrl + Enter发送）" v-model="commentContent" class="inputArea"> </el-input>
        </div>
      </div>
      <div class="recommendWrap">
        <h4>相关推荐</h4>
        <List v-for="item in recommendList" :key="item.article_id" :itemInfo="item" :noImg="true" />
      </div>
    </div>
    <aside class="asside">
      <div class="authorDesc">
        <div class="authorTop">
          <img :src="article.author_user_info.avatar_large" alt="" />
          <div class="public">
            <div class="top">
              <span>{{ article.author_user_info.user_name }}</span>
              <img :src="require('@/assets/lv-' + article.author_user_info.level + '.png')" alt="" />
            </div>
            <div class="bottom">
              {{ article.author_user_info.job_title }} @
              {{ article.author_user_info.company }}
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="authorBottom">
          <div class="like">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianzan_kuai"></use>
            </svg>
            获得点赞<span>{{ article.author_user_info.got_digg_count.toLocaleString() }}</span>
          </div>
          <div class="see">
            <svg t="1659424002038" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1526" width="200" height="200">
              <path
                d="M513.986 183.877c-256.9 0-465.2 328.2-465.2 328.2s208.3 328.3 465.2 328.3 465.2-326.2 465.2-326.2-208.2-330.3-465.2-330.3z m0 466.5c-76.353 0-138.25-61.897-138.25-138.25s61.897-138.25 138.25-138.25c76.353 0 138.25 61.897 138.25 138.25s-61.896 138.25-138.25 138.25z"
                p-id="1527"
                fill="#7bb9ff"
              ></path>
            </svg>
            文章被阅读<span>{{ article.author_user_info.got_view_count.toLocaleString() }}</span>
          </div>
        </div>
      </div>
      <DownJuejin class="download" />
      <Advertise imgSrc="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d17b46ae3a64f7799ea474d0c5762c3~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?" />
      <div class="relateArticle">
        <span>相关文章</span>
        <el-divider></el-divider>
        <div class="articleList">
          <div class="item" v-for="item in relatedList" :key="item.article_id" @click="seeArticle(item)">
            <div class="title">{{ item.article_info.title }}</div>
            <span>{{ item.article_info.digg_count }}点赞 · {{ item.article_info.comment_count }}评论</span>
          </div>
        </div>
      </div>
      <div class="category" v-if="cateArr.length">
        <span>目录</span>
        <el-divider></el-divider>
        <Category :cateList="cateArr" :baseSize="baseSize" />
      </div>
    </aside>
  </div>
</template>

<script>
import Advertise from '@/components/Advertise.vue'
import VueMarkdown from 'vue-markdown'
import DownJuejin from '@/components/DownJuejin.vue'
import getArticleDetails from '@/api/getArticleDetails.js'
import getRelatedArticle from '@/api/getRelatedArticle.js'
import getRecByTagIds from '@/api/getRecByTagIds.js'
import getBottom from '@/mixins/getBottom'
import List from '@/components/list.vue'
import Category from '@/components/Category.vue'
export default {
  data() {
    return {
      article: {},
      relatedList: [],
      recommendList: [],
      cateArr: [],
      commentContent: '',
      cursor: '',
      baseSize: 1,
      childList: [],
    }
  },
  mixins: [getBottom],
  methods: {
    getList() {
      let item_id = this.$router.currentRoute.query.id
      let cursor = this.cursor
      let sort_type = 200
      let tag_ids = this.$store.getters.getTag_ids
      getRecByTagIds({ item_id, cursor, sort_type, tag_ids }).then((res) => {
        this.recommendList = this.recommendList.concat(res.data)
        this.cursor = res.cursor
      })
    },
    seeArticle(itemInfo) {
      let id = itemInfo.article_id
      let tag_ids = itemInfo.tags.map((el) => el.tag_id)
      let user_id = itemInfo.author_user_info.user_id
      this.$store.commit('setUser_id', user_id)
      this.$store.commit('setTag_ids', tag_ids)
      let routeData = this.$router.resolve({
        name: 'article',
        query: { id: id },
      })
      window.open(routeData.href, '_blank')
    },
    cateScroll() {
      if (this.childList && this.childList.length == 0) return

      for (let i = 0; i < this.childList.length; i++) {
        let topCur = this.childList[i].getBoundingClientRect().top //当前元素距离窗口顶部
        if (i == this.childList.length - 1) {
          this.$store.commit('setCategoryCursor', i)
        } else {
          if (i == 0 && topCur > 0) {
            this.$store.commit('setCategoryCursor', 0)
            break
          }
          let topNext = this.childList[i + 1].getBoundingClientRect().top //下一个元素距离窗口顶部
          if (topCur <= 0 && topNext > 0) {
            this.$store.commit('setCategoryCursor', i)
            break
          }
        }
      }
    },
  },
  components: {
    VueMarkdown,
    Advertise,
    DownJuejin,
    List,
    Category,
  },
  created() {
    let id = this.$router.currentRoute.query.id
    let tag_ids = this.$store.getters.getTag_ids
    let user_id = this.$store.getters.getUser_id
    getArticleDetails(id).then((res) => {
      this.article = res.data

      // console.log(this.article)
    })
    getRelatedArticle({ item_id: id, tag_ids, user_id }).then((res) => {
      this.relatedList = res.data
      // console.log(res.data)
      setTimeout(() => {
        this.$nextTick(() => {
          let childList = this.$refs.markRef.$el.children
          let arr = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']

          childList = Array.from(childList).filter((el) => {
            return arr.indexOf(el.nodeName) > -1 && el.innerText.indexOf('theme') == -1
          })
          this.childList = childList
          childList.forEach((el, index) => {
            let obj = {}
            obj.nodeName = el.nodeName
            obj.text = el.innerText
            el.id = 'cateHref' + index
            this.cateArr.push(obj)
            this.baseSize = parseInt(childList[index].nodeName.substr(-1, 1))
          })
        })
      }, 0)
    })
    this.getList()
  },
  mounted() {
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = 'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css'
    document.head.appendChild(link)
    window.addEventListener('scroll', this.cateScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.cateScroll)
  },
  computed: {
    formateDate() {
      let mtime = new Date(this.article.article_info.mtime * 1000)

      let year = mtime.getFullYear()
      let month = String(mtime.getMonth() + 1).padStart(2, '0')
      let day = String(mtime.getDay()).padStart(2, '0')
      let hour = String(mtime.getHours()).padStart(2, '0')
      let minutes = String(mtime.getMinutes()).padStart(2, '0')
      return `${year}年${month}月${day}日  ${hour}:${minutes}`
    },
    categoryCursor() {
      return this.$store.getters.getCategoryCursor
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/index.scss';
.articleWrap {
  position: relative;
  @include flexCss(space-evenly, stretch);
  margin-top: 20px;
  .toolSide {
    position: fixed;
    left: 100px;
    .tool {
      width: 48px;
      height: 48px;
      background-color: #fff;
      border-radius: 50%;
      margin: 20px 0;
      cursor: pointer;
      @include flexCss();
      .icon {
        color: #8a919f;
        font-size: 18px;
      }
    }
    .tool:hover {
      .icon {
        color: #111;
      }
    }
  }
  .toolSpace {
    width: 48px;
    height: 100vh;
  }
  .article {
    .contentWrap {
      padding: 40px 30px;
      width: 50rem;
      background-color: #fff;
      .articleAvator {
        @include flexCss(space-between);
        margin: 20px 0;
        .left {
          display: flex;
          align-items: center;
          img {
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }
          .public {
            margin-left: 5px;
            div {
              margin: 5px;
            }
            .top {
              span {
                vertical-align: middle;
              }
              img {
                width: 35px;
                height: 16px;
                display: inline-block;
                vertical-align: middle;
              }
            }
            .bottom {
              @include fontCss();
              color: grey;
            }
          }
        }
        .attention {
          color: #1e80ff;
          background: rgba(30, 128, 255, 0.05);
          font-size: 14px;
        }
        .attention:hover {
          background-color: rgba(30, 128, 255, 0.1);
        }
      }
      .coverImg {
        margin: 10px auto;
        text-align: center;
        img {
          width: 50rem;
        }
      }
      .markWrap {
        width: 100%;
        .markdown-body {
          background-color: #fff;
          pre {
            background: #f8f8f8;
          }
        }
      }
      .end {
        margin: 20px 0;
        font-size: 14px;
        span {
          margin-right: 35px;
          @include fontCss();
          button:first-child {
            margin-left: 15px;
          }
          .classify {
            background-color: #f2f3f5;
            border-color: #f2f3f5;
            color: #111;
          }
          .classify:hover {
            background-color: #e4e6eb;
          }
          .tag {
            background-color: #eaf2ff;
            color: #1e80ff;
            margin-right: 5px;
          }
          .tag:hover {
            background-color: rgba(30, 128, 255, 0.16);
          }
        }
      }
    }
    .comment {
      margin: 20px 0;
      background-color: #fff;
      padding: 20px;
      .inputWrap {
        @include flexCss(space-between);
        margin: 20px 0;
        .commentAvator {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .inputArea {
          width: 90%;
          .el-textarea__inner {
            background-color: #f4f5f5;
          }
        }
      }
    }
    .recommendWrap {
      background-color: #fff;
      h4 {
        padding: 20px;
        position: relative;
      }
      h4:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 20px;
        height: 1px;
        background-color: #ccc;
        transform: scaleY(0.2);
      }
    }
  }
  .asside {
    width: 300px;
    transform: translateX(-40px);
    .el-divider {
      transform: scaleY(0.5);
      margin-bottom: 10px;
    }
    .authorDesc {
      background-color: #fff;
      padding: 10px 0 1px 15px;
      .authorTop {
        display: flex;
        align-items: center;
        // padding-top: 15px;
        // padding-left: 10px;
        img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
        .public {
          margin-left: 5px;
          div {
            margin: 5px;
          }
          .top {
            span {
              vertical-align: middle;
            }
            img {
              width: 35px;
              height: 16px;
              display: inline-block;
              vertical-align: middle;
            }
          }
          .bottom {
            @include fontCss();
            color: grey;
          }
        }
      }
      .el-divider--horizontal {
        margin: 10px 0;
      }
      .authorBottom {
        div {
          @include flexCss(flex-start);
          margin-bottom: 10px;
          @include fontCss();
          .icon {
            margin-right: 5px;
            padding: 6px;
            border-radius: 50%;
            font-size: 15px;
            color: #7bb9ff;
            background-color: #e1efff;
          }
          span {
            margin: 0 5px;
          }
        }
      }
    }
    .download {
      margin: 20px 0;
    }
    .relateArticle {
      margin: 20px 0;
      padding: 20px;
      background-color: #fff;
      .el-divider {
        margin: 15px 0;
      }
      .articleList {
        .item {
          cursor: pointer;
          margin: 20px 0;
          .title {
            font-size: 14.5px;
            margin-bottom: 5px;
          }
          span {
            @include fontCss();
          }
        }
        .item:hover {
          color: $theme-color;
        }
      }
    }
    .category {
      position: -webkit-sticky;
      position: sticky;
      top: 64px;
      margin: 20px 0;
      padding: 20px 0;
      background-color: #fff;
      span {
        padding-left: 20px;
      }
      .el-divider {
        width: 85%;
        margin: 20px auto;
      }
    }
  }
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

<style lang="scss">
.tool > .el-badge__content {
  background-color: #c2c8d1;
  min-width: 13px;
  height: 15px;
  padding: 1px 3px;
  top: 6px;
  right: 11px;
}
.shareProper {
  left: 55px !important;
  margin: 0;
  padding: 10px 0;
  .share {
    padding: 10px 15px;
    cursor: pointer;
    .icon {
      font-size: 25px;
      color: #8a919f;
    }
  }
  .share:hover {
    background-color: #eee;
    .icon {
      color: #111;
    }
  }
}
</style>

<!-- 页面结构样式 -->
<style lang="scss" scoped>
::v-deep .markdown-body {
  hr:first-child,
  hr:first-child + h2 {
    display: none;
  }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin-top: 32px;
    margin-bottom: 32px;
    height: 0px;
  }
  blockquote {
    color: #666;
    padding: 1px 23px;
    margin: 22px 0;
    border-left: 4px solid #cbcbcb;
    background-color: #f8f8f8;
    p {
      font-size: 16px;
      margin: 10px 0;
    }
  }
  ul {
    li {
      list-style: disc;
    }
  }
}
</style>
