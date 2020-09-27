<template>
  <div>
    <bu-button @click="onClickOpen"> TestMessage </bu-button>
    <!-- <message></message> -->
  </div>
</template>

<script>
  export default {
    name: "test-message",
    data () {
      return {};
    },
    methods: {
      onClickOpen () {
        console.log(this.$message);
        this.$message({
          message: "警告哦，这是一条警告消息",
          type: "warning",
        });
      },
    },
  };
</script>

<style>
</style>