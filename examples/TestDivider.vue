<template>
  <div class="bu-divider-wrapper">
    <div class="type-wrapper">
      <h3>基本用法</h3>
      <span>我下面有一条分割线</span>
      <bu-divider></bu-divider>
      <span>我上面有一条分割线</span>
    </div>
    <div class="type-wrapper">
      <h3>设置文案</h3>
      <div class="row">
        <bu-divider content-position="right">这是在右边哦</bu-divider>
      </div>
      <div class="row">
        <bu-divider content-position="left">这是在左边哦</bu-divider>
      </div>
      <div class="row">
        <bu-divider>默认在中间哦</bu-divider>
      </div>
    </div>
    <div class="type-wrapper">
      <h3>垂直分割</h3>
      <div>
        <span>分割我</span>
        <bu-divider direction="vertical"></bu-divider>
        <span>分割我</span>
        <bu-divider direction="vertical"></bu-divider>
        <span>分割我</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .type-wrapper {
    margin: 50px 0;
    padding: 30px;
    border: 1px dashed #999999;
  }

  .row {
    margin: 50px 0;
  }
</style>
