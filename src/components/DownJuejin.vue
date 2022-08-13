<template>
  <div class="down">
    <div class="code">
      <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png" alt="" />
    </div>
    <div class="right">
      <p>下载稀土掘金APP</p>
      <p class="p2">一个帮助开发者成长的社区</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/css/index.scss';
.down {
  border-radius: 2px;

  padding: 10px;
  @include flexCss(space-between);
  background-color: #fff;
  img {
    width: 50px;
    height: 50px;
  }
  p {
    font-size: 14px;
  }
  .p2 {
    margin-top: 10px;
    @include fontCss();
    font-size: 13px;
  }
}
</style>
