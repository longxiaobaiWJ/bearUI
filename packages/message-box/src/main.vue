<template>
<transition name="msgbox-fade">
	<div class="bu-message-box__wrapper">
    <div :class="['bu-message-box', customClass]">
      <div :class="['bu-message-box__header']">
        <div class="bu-message-box__title">提示</div>
        <i
          class="bu-message__closeBtn bu-icon-close"
          @click="msgClose"
        ></i>
      </div>
      <div :class="['bu-message-box__content']">
        <slot> bu-message-box__wrapper </slot>
      </div>
      <div :class="['bu-message-box__footer']">
        <slot name="footer"> bu-message-box__wrapper </slot>
      </div>
    </div>
  </div>
</transition>
  
</template>

<script>
  export default {
    name: "MessageBox",
    data() {
      return {
        dangerouslyUseHTMLString: false,
        customClass: "",
      };
    },
    methods: {
      msgClose() {},
    },
  };
</script>

<style lang="scss" scoped>
.bu-message-box__wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.bu-message-box__wrapper::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}

.v-shadow {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}

.bu-message-box {
  display: inline-block;
  min-width: 420px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
}

.bu-message-box__header {
  position: relative;
  padding: 15px 15px 10px;
  display: flex;
  justify-content: space-between;
}

.bu-icon-close {
  cursor: pointer;
}

.bu-message-box__content {
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
}

.bu-message-box__footer {
  padding: 5px 15px 0;
  text-align: right;
}
</style>