<template>
  <div>
    <bu-button @click="TestMessageBox"> TestMessageBox </bu-button>
    <bu-button @click="TestMessageConfirm"> TestMessageConfirm </bu-button>
    <bu-button @click="TestMessageAlert"> TestMessageAlert </bu-button>
    <bu-button @click="TestMessagePrompt"> TestMessagePrompt </bu-button>
  </div>
</template>

<script>
  export default {
    name: "TestMessageBox",
    methods: {
      TestMessageBox() {
        this.$msgbox({
          title: "消息",
          message: "TestMessageBox",
          confirmButtonText: "确定",
          type: "confirm",
          callback(action) {
            console.log(action);
          },
        });
      },
      TestMessageConfirm() {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示");
      },
      TestMessageAlert() {
        this.$alert("这是一段内容", "标题名称", {
          confirmButtonText: "确定",
          showCancelButton: true,
        }).then(res => {
          console.log(res);
        }).catch(error => {
          console.log(error);
        });
      },
      TestMessagePrompt() {
        this.$prompt("请输入邮箱", "提示", {}).then((res) => {
          console.log(res);
        });
      },
    },
  };
</script>

<style>
</style>