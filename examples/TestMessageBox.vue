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
        });
      },
      TestMessageConfirm() {
        this.$prompt({});
      },
      TestMessageAlert() {
        this.$alert({});
      },
      TestMessagePrompt() {
        this.$prompt({});
      },
    },
  };
</script>

<style>
</style>