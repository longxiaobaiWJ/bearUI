<template>
  <div>
    <div class="row">
      <p>默认</p>
      <bu-link href="baidu.com"
               @click="onClick"
               target="_blank">测试链接</bu-link>
      <bu-link type="primary"
               @click="onClick"
               @mousedown="onMouseover">测试链接</bu-link>
      <bu-link type="success">测试链接</bu-link>
      <bu-link type="info">测试链接</bu-link>
      <bu-link type="warning">测试链接</bu-link>
      <bu-link type="danger">测试链接</bu-link>
    </div>
    <div class="row">
      <p>下划线</p>
      <bu-link :underline="underline">测试链接</bu-link>
      <bu-link :underline="false"
               type="primary">测试链接</bu-link>
      <bu-link underline
               type="success">测试链接</bu-link>
      <bu-link :underline="underline"
               type="info">测试链接</bu-link>
      <bu-link :underline="false"
               type="warning">测试链接</bu-link>
      <bu-link underline
               type="danger">测试链接</bu-link>
    </div>
    <div class="row">
      <p>禁用</p>
      <bu-link :disabled="disabled"
               @click="onClick">测试链接</bu-link>
      <bu-link type="primary"
               :disabled="false">测试链接</bu-link>
      <bu-link type="success"
               disabled>测试链接</bu-link>
      <bu-link type="info"
               :disabled="disabled">测试链接</bu-link>
      <bu-link type="warning"
               :disabled="false">测试链接</bu-link>
      <bu-link type="danger"
               disabled>测试链接</bu-link>
    </div>
    <div class="row">
      <p>图标</p>
      <bu-link icon="el-icon-check">测试链接</bu-link>
      <bu-link type="primary"><i class="el-icon-check"></i>测试链接</bu-link>
      <bu-link type="success">测试链接<i class="el-icon-check"></i></bu-link>
      <bu-link icon="el-icon-check"
               type="info">测试链接</bu-link>
      <bu-link type="warning"><i class="el-icon-check"></i>测试链接</bu-link>
      <bu-link type="danger">测试链接<i class="el-icon-check"></i></bu-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestLink",
  data () {
    return {
      underline: false,
      disabled: true
    }
  },
  methods: {
    onClick (e) {
      console.log(e)
    },
    onMouseover (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px 0;
}
.bu-link {
  margin-left: 10px;
}
</style>
