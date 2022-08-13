<template>
  <div class="ad">
    <i class="el-icon-close" @click="closeAd"></i>
    <img :src="imgSrc" alt="" />
    <div class="btnbox" @mouseover="enter" @mouseout="out">
      <el-button size="mini" class="adBtn" v-show="show">广告</el-button>
      <el-button size="mini" class="adBtn2" v-show="!show">投放 广告</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: String,
  },
  data() {
    return {
      show: true,
    }
  },
  methods: {
    closeAd(e) {
      e.target.parentElement.style = 'display:none'
    },
    enter() {
      this.show = false
    },
    out() {
      this.show = true
    },
  },
}
</script>

<style lang="scss" scoped>
.ad {
  cursor: pointer;
  position: relative;
  border-radius: 2px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }

  .btnbox {
    position: absolute;
    right: -5px;
    bottom: 5px;
  }
  .el-icon-close {
    position: absolute;
    top: 5px;
    right: 5px;
    display: none;
    color: grey;
  }

  .adBtn,
  .adBtn2 {
    font-size: 18px;
    transform: scale(0.6);
    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .adBtn2 {
    transform: translateX(8.3px) scale(0.6);
  }
}
</style>
