<template>
  <div>
    <bu-button @click="onClickOpenText"> TestMessageText </bu-button>
    <bu-button @click="onClickOpenHtml"> TestMessageHtml </bu-button>
    <bu-button @click="onClickOpenVnode"> TestMessageVnode </bu-button>
  </div>
</template>

<script>
  export default {
    name: "test-message",
    data() {
      return {};
    },
    methods: {
      onClickOpenText() {
        this.$message({
          message: "警告哦，这是一条警告消息",
          type: "success",
          onClose() {
            console.log("XXXXXXXXXXXXX");
          },
        });
      },
      onClickOpenHtml() {
        this.$message({
          message: "<strong>这是 <i>HTML</i> 片段</strong>",
          type: "warning",
          offset: 90,
          showClose: true,
        });
      },
      onClickOpenVnode() {
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          type: "error",
          offset: 90,
          showClose: true
        });
      },
    },
  };
</script>

<style>
</style>