<template>
  <div>
    <h2>基础用法</h2>
    <div class="row">
      <bu-breadcrumb separator="/">
        <bu-breadcrumb-item :to="{ path: '/' }">首页</bu-breadcrumb-item>
        <bu-breadcrumb-item>
          <a href="/">活动管理</a>
        </bu-breadcrumb-item>
        <bu-breadcrumb-item>活动列表</bu-breadcrumb-item>
        <bu-breadcrumb-item>活动详情</bu-breadcrumb-item>
      </bu-breadcrumb>
    </div>
    <h2>图标分隔符</h2>
    <div class="row">
      <bu-breadcrumb separator-class="bu-icon-arrow-right">
        <bu-breadcrumb-item :to="{ path: '/' }">首页</bu-breadcrumb-item>
        <bu-breadcrumb-item>活动管理</bu-breadcrumb-item>
        <bu-breadcrumb-item>活动列表</bu-breadcrumb-item>
        <bu-breadcrumb-item>活动详情</bu-breadcrumb-item>
      </bu-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px 0;
}
</style>