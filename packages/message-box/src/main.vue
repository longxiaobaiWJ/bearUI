<template>
  <transition name="msgbox-fade">
    <div
      class="bu-message-box__wrapper"
      v-show="visible"
      @click.self="handleWrapperClick"
    >
      <div :class="['bu-message-box', customClass]">
        <div v-if="title" :class="['bu-message-box__header']">
          <div class="bu-message-box__title">{{ title }}</div>
          <i
            v-if="showClose"
            class="bu-message__closeBtn bu-icon-close"
            @click="msgClose"
          ></i>
        </div>
        <div :class="['bu-message-box__content']">
          <div class="bu-message-box__container">
            <i
              v-if="customIcon"
              :class="['message-box__status', 'bu-message__icon', customIcon]"
            ></i>
            <slot>
              <div v-if="dangerouslyUseHTMLString" v-html="message"></div>
              <div v-else v-text="message"></div>
            </slot>
          </div>
          <div class="bu-message-box__input" v-if="showInput">
            <bu-input
              :type="inputType"
              v-model="isValidValue"
              :placeholder="inputPlaceholder"
            ></bu-input>
            <div class="bu-message-box__errors" v-show="validIsError">
              bu-message-box__errors
            </div>
          </div>
        </div>
        <div :class="['bu-message-box__footer']">
          <slot name="footer">
            <bu-button
              v-if="showCancelButton"
              @click.native="handleAction('cancel')"
              size="small"
            >
              {{ cancelButtonText }}
            </bu-button>
            <bu-button
              v-if="showConfirmButton"
              @click.native="handleAction('confirm')"
              size="small"
              type="primary"
            >
              {{ confirmButtonText }}
            </bu-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import Popup from "@/src/utils/popup"; // 辅助函数，禁止页面滚动等

  export default {
    name: "MessageBox",
    props: {
      modal: {
        default: true,
      },
    },
    data() {
      return {
        visible: false,
        dangerouslyUseHTMLString: false,
        customClass: "",
        title: "",
        message: "",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "",
        cancelButtonText: "",
        showInput: false,
        usefulIcon: "",
        iconClass: "",
        validIsError: false,
        isValidValue: "",
        showClose: false,
        inputPlaceholder: "请输入内容",
        inputType: "text",
        callback: null,
        action: "",
      };
    },
    computed: {
      customIcon() {
        return this.iconClass || this.usefulIcon;
      },
    },
    methods: {
      msgClose() {
        if (!this.visible) return;
        this.visible = false;
        setTimeout(() => {
          document.body.style.overflow = "inherit";
          this.$el.parentNode.removeChild(this.$el);
        }, 40);
        if (this.callback) {
          setTimeout(() => {
            this.callback(this.action);
          }, 50);
        }
      },
      handleAction(action) {
        this.action = action;
        this.msgClose();
      },
      handleWrapperClick() {},
    },
    mounted() {
      setTimeout(() => {
        document.body.style.overflow = "hidden";
      }, 40);
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

.bu-message-box__container {
  display: flex;
  align-items: center;
}

.bu-message__icon {
  margin-right: 10px;
}

.bu-message-box__input {
  margin-top: 15px;
}

.bu-message-box__errors {
  color: #f56c6c;
  font-size: 12px;
  min-height: 18px;
  margin-top: 2px;
}

.bu-message-box__footer {
  padding: 5px 15px 0;
  text-align: right;
}

.msgbox-fade-enter-active {
  animation: msgbox-fade-in 0.3s;
}

.msgbox-fade-leave-active {
  animation: msgbox-fade-out 0.3s;
}

@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes msgbox-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>