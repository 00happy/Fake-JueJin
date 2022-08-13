<template>
  <div class="listItem" @click="seeArticle">
    <div class="listWrap">
      <div class="left">
        <div class="top">
          <div>{{ itemInfo.author_user_info.user_name }}</div>
          <el-divider direction="vertical"></el-divider>
          <div>{{ differTime }}</div>
          <el-divider direction="vertical"></el-divider>
          <div class="tag" v-for="tag in itemInfo.tags" :key="tag.id" @click.stop="goTag(tag)">
            {{ tag.tag_name }}
            <span class="tagDot">·</span>
          </div>
        </div>
        <h4 class="title" :class="itemInfo.article_info.cover_image ? '' : 'noImg'">
          {{ itemInfo.article_info.title }}
        </h4>
        <div v-if="!noImg" class="desc" :class="itemInfo.article_info.cover_image && !noImg ? '' : 'noImg'">
          {{ itemInfo.article_info.brief_content }}
        </div>
        <div class="bottom">
          <div class="viewNum">
            <img src="@/assets/see.png" alt="" />
            <span>{{ itemInfo.article_info.view_count / 10000 >= 1 ? (itemInfo.article_info.view_count / 10000).toFixed(1) + 'w' : itemInfo.article_info.view_count }}</span>
          </div>
          <div class="likeNum">
            <img src="@/assets/like.png" alt="" />
            <span>{{ itemInfo.article_info.digg_count || '点赞' }}</span>
          </div>
          <div class="commentNum">
            <img src="@/assets/comment.png" alt="" />
            <span>{{ itemInfo.article_info.comment_count || '评论' }}</span>
          </div>
        </div>
      </div>
      <div class="right" v-if="itemInfo.article_info.cover_image && !noImg">
        <img v-lazyLoad="itemInfo.article_info.cover_image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemInfo: Object,
    noImg: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    seeArticle() {
      let id = this.itemInfo.article_id
      let tag_ids = this.itemInfo.tags.map((el) => el.tag_id)
      let user_id = this.itemInfo.author_user_info.user_id
      this.$store.commit('setUser_id', user_id)
      this.$store.commit('setTag_ids', tag_ids)
      let routeData = this.$router.resolve({
        name: 'article',
        query: { id: id },
      })
      window.open(routeData.href, '_blank')
    },
    goTag(tag) {
      console.log(tag)
    },
  },
  computed: {
    differTime() {
      let mtime = this.itemInfo.article_info.mtime
      let now = Date.parse(new Date()) / 1000
      let diff = (now - mtime) * 1000
      let oneday = 24 * 60 * 60 * 1000
      let year = Math.floor(diff / (oneday * 365))
      let month = Math.floor(diff / (oneday * 30))
      let day = Math.floor(diff / oneday)
      let hour = Math.floor(diff / (oneday / 24))
      let minutes = Math.floor(diff / (oneday / (24 * 60)))
      if (year > 0) {
        return year + '年前'
      } else if (month > 0) {
        return month + '月前'
      } else if (day > 0) {
        return day + '天前'
      } else if (hour > 0) {
        return hour + '小时前'
      } else {
        return minutes + '分钟前'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/index.scss';
.listItem {
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}
.listItem::after {
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
.listItem:hover {
  background-color: #fafafa;
}
.listWrap {
  @include flexCss(space-between);
  .left {
    .top {
      display: flex;
      font-size: 14px;
      color: #515767;
      cursor: pointer;
      .tag {
        .tagDot {
          margin: 0 4px;
        }
      }
      .tag:hover:not(span) {
        color: $theme-color;
      }
      .tag:last-child > .tagDot {
        display: none;
      }
    }
    .title {
      margin: 9px 0;
      width: 30rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .desc {
      white-space: nowrap;
      line-height: 20px;
      width: 30rem;
      overflow: hidden;
      text-overflow: ellipsis;
      @include fontCss();
      margin: 9px 0;
    }
    .noImg {
      width: 40rem !important;
    }
    .bottom {
      display: flex;
      @include fontCss();
      margin-bottom: 5px;
      img {
        width: 16px;
        height: 16px;
      }
      div {
        display: flex;
        align-items: center;
        margin-right: 22px;
        span {
          margin-left: 4px;
        }
      }
      div:not(:first-child):hover {
        color: $theme-color;
      }
    }
  }
  .right > img {
    width: 120px;
    height: 80px;
    border-radius: 2px;
  }
}
.el-divider {
  margin: 0;
}
.el-divider--vertical {
  margin: 0 10px;
  height: 1.3em;
}
</style>
