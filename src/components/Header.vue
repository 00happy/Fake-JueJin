<template>
  <div class="headerWrap">
    <div class="img">
      <img src="@/assets/juejin.svg" alt="juejin" />
    </div>
    <ul class="tabBar">
      <li class="tab active">首页</li>
      <li class="tab">沸点</li>
      <el-badge value="上新" class="item"> 课程 </el-badge>
      <li class="tab">直播</li>
      <li class="tab">资讯</li>
      <li class="tab">活动</li>
      <el-popover placement="bottom" trigger="hover" :visible-arrow="false">
        <div class="trainMsg">
          <img src="@/assets/qingxun.svg" alt="" />
          <span>青训营社区</span>
        </div>
        <li class="open" slot="reference">
          开放社区
          <i class="el-icon-caret-bottom"></i>
        </li>
      </el-popover>
    </ul>
    <ul class="toolWrap">
      <li>商城</li>
      <li>APP</li>
      <li>插件</li>
    </ul>
    <el-popover placement="bottom" :popper-class="isFocus ? 'bigPopover' : 'searchPopover'" trigger="focus" :visible-arrow="false">
      <div class="historyWrap">
        <div class="head">
          <div>搜索历史</div>
          <div style="color: #007fff; cursor: pointer" @click="clearHistory">清空</div>
        </div>
        <ul>
          <li v-for="(item, index) in historyList" :key="index">{{ item }}</li>
        </ul>
      </div>
      <el-input
        slot="reference"
        :class="isFocus ? 'bigSearch' : 'search'"
        :placeholder="isFocus ? '搜索文章/小册/标签/用户' : '探索稀土掘金'"
        v-model="searchValue"
        @focus="
          () => {
            isFocus = true
          }
        "
      >
        <i slot="suffix" class="el-input__icon el-icon-search" :class="isFocus ? 'focusSearch' : ''"></i>
      </el-input>
    </el-popover>
    <div class="writerCenter" :class="isFocus ? 'disapear' : ''">
      <el-button class="writerCenterBtn">
        创作者中心
        <el-popover popper-class="popover" placement="bottom" trigger="click" :offset="-60" :visible-arrow="false">
          <div class="pop-item">
            <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/a0c8073862f04c2925249fd397763fd3.svg" alt="" />
            写文章
          </div>
          <div class="pop-item">
            <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e5381c85b5939d984a4b0c0edf102122.svg" alt="" />
            发沸点
          </div>
          <el-button class="btnMore" @click.capture="toggle" slot="reference"><i class="el-icon-caret-bottom" :class="writerFlag ? 'isWrite' : ''"></i></el-button>
        </el-popover>
      </el-button>
    </div>
    <div class="vipWrap">
      <img src="@/assets/会员.svg" alt="vip" />
    </div>
    <div class="vipText">会员</div>
    <div class="message">
      <el-badge value="6" class="item">
        <i class="el-icon-message-solid"></i>
      </el-badge>
    </div>
    <el-popover placement="bottom" width="200" trigger="click">
      <div class="avator" slot="reference">
        <img src="https://p9-passport.byteacctimg.com/img/mosaic-legacy/3791/5035712059~300x300.image" alt="" />
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  data() {
    return {
      writerFlag: false,
      isFocus: false,
      searchValue: '',
      historyList: ['sass', 'vue', 'react', 'js'],
    }
  },
  methods: {
    toggle() {
      this.writerFlag = !this.writerFlag
    },
    clearHistory() {
      this.isFocus = false
      this.historyList = []
    },
  },
  mounted() {
    document.addEventListener('mouseup', (e) => {
      var _con = document.getElementsByClassName('btnMore')[0]
      var _con2 = document.getElementsByClassName('bigSearch')[0]
      if (_con) {
        if (!_con.contains(e.target)) {
          this.writerFlag = false
        }
      }
      if (_con2) {
        if (!_con2.contains(e.target)) {
          this.isFocus = false
        }
      }
    })
  },
}
</script>
<style lang="scss">
@import '@/assets/css/index.scss';

.popover {
  transform-origin: center top;
  z-index: 2005;
  position: fixed;
  top: 48px !important;
  left: 1084px !important;
}

.headerWrap {
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 60px;
  color: $font-color;
  font-size: 14px;
  cursor: pointer;
  .img {
    line-height: 10px;
    img {
      width: 107px;
      height: 22px;
    }
  }
  .tabBar,
  .toolWrap {
    list-style: none;
    @include flexCss(space-between);
  }
  .tabBar {
    width: 25%;
    height: 100%;
    margin: 0 20px;
    .item {
      transform: scale(0.7);
      font-size: 20px;
    }
    .item::after {
      content: '';
      position: absolute;
      display: none;
      left: 0;
      right: 0;
      bottom: -27px;
      height: 2.5px;
      background-color: $theme-color;
    }
    .item:hover.item::after {
      display: block;
    }
    .tab {
      position: relative;
    }

    .tab::after {
      content: '';
      position: absolute;
      display: none;
      left: 0;
      right: 0;
      bottom: -19px;
      height: 2px;
      background-color: $theme-color;
    }

    .tab:hover.tab::after {
      display: block;
    }
  }
  .tabBar > li:hover {
    color: #111;
  }
  .open:hover {
    color: $theme-color;
    .el-icon-caret-bottom {
      transition: all 0.7s;
      transform: rotateZ(180deg);
    }
  }
  .toolWrap {
    width: 8%;
  }

  .el-button {
    background: $theme-color;
    color: #fff;
  }
  .el-button:hover {
    background-color: rgb(17, 113, 238);
  }
  .writerCenter {
    position: absolute;
    right: 19%;
    .writerCenterBtn {
      width: 115px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding-left: 25px;

      .el-popover__reference {
        height: 36px;
        width: 30px;
        border: none;
        margin: 0;
        border-radius: 0;
        border-left: 1px solid hsla(0, 0%, 100%, 0.1);
        position: relative;
        left: 5px;

        &:hover {
          background: rgb(17, 113, 238);
        }
      }
    }
  }

  .btnMore {
    display: inline-block;
    width: 21px;
    margin-left: -1px;
    text-align: center;
    padding-left: 0px;
    padding-right: 0px;
  }
  .vipWrap {
    position: absolute;
    right: 15%;
    margin-left: 25px;
  }
  .vipText {
    position: absolute;
    right: 12.5%;
  }
  .message {
    position: absolute;
    right: 8%;
    transform: scale(0.7);
    .el-icon-message-solid {
      margin-left: 25px;
      font-size: 32px;
      color: #8a919f;
    }
    .el-icon-message-solid:hover {
      color: #111;
    }
  }
}
.historyWrap {
  .head {
    @include flexCss(space-between);
    color: #869aab;
    font-size: 13px;
    height: 35px;
    line-height: 35px;
    position: relative;
    padding: 0 10px;
  }
  .head::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #ccc;
    transform: scaleY(0.2);
  }
  ul {
    li {
      padding: 0 10px;
      height: 35px;
      line-height: 35px;
      cursor: pointer;
    }
    li:hover {
      background-color: #eff2f5;
    }
  }
}
.avator {
  position: absolute;
  right: 3%;
  top: 22%;
  img {
    border-radius: 50%;
    width: 36px;
    height: 36px;
  }
}
.headerWrap::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  transform: scaleY(0.2);
}
.active {
  color: $theme-color;
}
.el-input__icon {
  height: 80%;
  margin-top: 4px;
  width: 40px;
  text-align: center;
  transition: all 0.3s;
  background: #eeeeee;
  border-radius: 5px;
  line-height: 30px;
}
.isWrite {
  transition: all 0.2s;
  transform: rotateZ(180deg);
}
.el-popover {
  min-width: 90px;
  padding: 5px;
}
.searchPopover {
  display: none;
}
.bigPopover {
  padding: 0;
  animation: beBig 0.6s;
  width: 332px;
}
.pop-item {
  @include flexCss(space-around);
  width: 90px;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
  border-radius: 4px;
  padding: 8px;
}
.pop-item:hover {
  background-color: #f3f3f3;
}
.disapear {
  display: none;
}
.focusSearch {
  background-color: #eaf2ff;
  color: $theme-color;
}
.search {
  display: inline-block;
  width: 282px;
  margin: 0 20px 0 120px;
}
@keyframes beBig {
  from {
    width: 182px;
  }
  to {
    width: 452px;
  }
}
.bigSearch {
  animation: beBig 0.6s;
  width: 452px;
  margin: 0 20px 0 120px;
}
.bigPopover {
  animation: beBig 0.6s;
  width: 452px;
}
.trainMsg {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  font-size: 16px;
  span {
    margin-left: 10px;
  }
}
.trainMsg:hover {
  background-color: #f7f8fa;
  cursor: pointer;
}
</style>
