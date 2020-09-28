<template>
  <transition name="bu-message-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      :class="['bu-message', 'bu-message-radius', customClass]"
      :style="positionStyle"
    >
      <i :class="['bu-message__icon', typeClass]"></i>
      <slot>
        <div
          class="bu-message__content"
          v-if="dangerouslyUseHTMLString"
          v-html="message"
        ></div>
        <div class="bu-message__content" v-else v-text="message"></div>
      </slot>
      <i
        v-if="showClose"
        class="bu-message__closeBtn bu-icon-close"
        @click="close"
      ></i>
    </div>
  </transition>
</template>

<script>
  import { isFunctionValid, StaticTypes, defaultOffset } from "./main.js";

  export default {
    name: "Message",
    data() {
      return {
        verticalOffset: defaultOffset,
        duration: 5000,
        timer: null,
        onClose: null,
        visible: false,
        message: "",
        showClose: false,
        customClass: "",
        type: "info",
        iconClass: "",
        dangerouslyUseHTMLString: false,
      };
    },
    computed: {
      positionStyle() {
        return {
          top: `${this.verticalOffset}px`,
        };
      },
      typeClass() {
        if (this.iconClass) {
          return this.iconClass;
        } else {
          return `bu-icon-${StaticTypes[this.type] || ""}`;
        }
      },
    },
    methods: {
      handleAfterLeave() {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },
      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (this.visible) {
              this.close();
            }
          }, this.duration);
        }
      },
      clearTimer() {
        clearTimeout(this.timer);
      },
      close() {
        this.visible = false;
        if (isFunctionValid(this.onClose)) {
          this.onClose(this);
        }
      },
    },
    mounted() {
      this.startTimer();
    },
  };
</script>

<style lang="scss" scoped>
.bu-message {
  min-width: 380px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #ebeef5;
  position: fixed;
  left: 50%;
  background-color: #edf2ef;
  transform: translateX(-50%);
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
}

.bu-message-radius {
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.bu-message__content {
  display: flex;
  flex: 1;
  padding: 0 10px;
  font-size: 14px;
}

.bu-icon-close {
  cursor: pointer;
}

.bu-message-fade-enter,
.bu-message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>