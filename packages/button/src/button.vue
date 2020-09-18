<template>
  <button
    class="bu-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'bu-button--' + type : '',
      buttonSize ? 'bu-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="bu-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'BuButton',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },

  computed: {
    _elFormItemSize () {
      return (this.elFormItem || {}).elFormItemSize
    },
    buttonSize () {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled () {
      return this.disabled || (this.elForm || {}).disabled
    }
  },

  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang='scss'>
.bu-button-group > .bu-button.is-active,
.bu-button-group > .bu-button.is-disabled,
.bu-button-group > .bu-button:active,
.bu-button-group > .bu-button:focus,
.bu-button-group > .bu-button:hover {
  z-index: 1;
}
.bu-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.bu-button + .bu-button {
  margin-left: 10px;
}
.bu-button:focus,
.bu-button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.bu-button:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: 0;
}
.bu-button::-moz-focus-inner {
  border: 0;
}
.bu-button [class*='bu-icon-'] + span {
  margin-left: 5px;
}
.bu-button.is-plain:focus,
.bu-button.is-plain:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
.bu-button.is-active,
.bu-button.is-plain:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
}
.bu-button.is-plain:active {
  background: #fff;
  outline: 0;
}
.bu-button.is-disabled,
.bu-button.is-disabled:focus,
.bu-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.bu-button.is-disabled.bu-button--text {
  background-color: transparent;
}
.bu-button.is-disabled.is-plain,
.bu-button.is-disabled.is-plain:focus,
.bu-button.is-disabled.is-plain:hover {
  background-color: #fff;
  border-color: #ebeef5;
  color: #c0c4cc;
}
.bu-button.is-loading {
  position: relative;
  pointer-events: none;
}
.bu-button.is-loading:before {
  pointer-events: none;
  content: '';
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: inherit;
  background-color: rgba(255, 255, 255, 0.35);
}
.bu-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}
.bu-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}
.bu-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.bu-button--primary:focus,
.bu-button--primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.bu-button--primary.is-active,
.bu-button--primary:active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #fff;
}
.bu-button--primary:active {
  outline: 0;
}
.bu-button--primary.is-disabled,
.bu-button--primary.is-disabled:active,
.bu-button--primary.is-disabled:focus,
.bu-button--primary.is-disabled:hover {
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
}
.bu-button--primary.is-plain {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.bu-button--primary.is-plain:focus,
.bu-button--primary.is-plain:hover {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
.bu-button--primary.is-plain:active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #fff;
  outline: 0;
}
.bu-button--primary.is-plain.is-disabled,
.bu-button--primary.is-plain.is-disabled:active,
.bu-button--primary.is-plain.is-disabled:focus,
.bu-button--primary.is-plain.is-disabled:hover {
  color: #8cc5ff;
  background-color: #ecf5ff;
  border-color: #d9ecff;
}
.bu-button--success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.bu-button--success:focus,
.bu-button--success:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}
.bu-button--success.is-active,
.bu-button--success:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
}
.bu-button--success:active {
  outline: 0;
}
.bu-button--success.is-disabled,
.bu-button--success.is-disabled:active,
.bu-button--success.is-disabled:focus,
.bu-button--success.is-disabled:hover {
  color: #fff;
  background-color: #b3e19d;
  border-color: #b3e19d;
}
.bu-button--success.is-plain {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
}
.bu-button--success.is-plain:focus,
.bu-button--success.is-plain:hover {
  background: #67c23a;
  border-color: #67c23a;
  color: #fff;
}
.bu-button--success.is-plain:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
  outline: 0;
}
.bu-button--success.is-plain.is-disabled,
.bu-button--success.is-plain.is-disabled:active,
.bu-button--success.is-plain.is-disabled:focus,
.bu-button--success.is-plain.is-disabled:hover {
  color: #a4da89;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.bu-button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.bu-button--warning:focus,
.bu-button--warning:hover {
  background: #ebb563;
  border-color: #ebb563;
  color: #fff;
}
.bu-button--warning.is-active,
.bu-button--warning:active {
  background: #cf9236;
  border-color: #cf9236;
  color: #fff;
}
.bu-button--warning:active {
  outline: 0;
}
.bu-button--warning.is-disabled,
.bu-button--warning.is-disabled:active,
.bu-button--warning.is-disabled:focus,
.bu-button--warning.is-disabled:hover {
  color: #fff;
  background-color: #f3d19e;
  border-color: #f3d19e;
}
.bu-button--warning.is-plain {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
}
.bu-button--warning.is-plain:focus,
.bu-button--warning.is-plain:hover {
  background: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
}
.bu-button--warning.is-plain:active {
  background: #cf9236;
  border-color: #cf9236;
  color: #fff;
  outline: 0;
}
.bu-button--warning.is-plain.is-disabled,
.bu-button--warning.is-plain.is-disabled:active,
.bu-button--warning.is-plain.is-disabled:focus,
.bu-button--warning.is-plain.is-disabled:hover {
  color: #f0c78a;
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.bu-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.bu-button--danger:focus,
.bu-button--danger:hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
.bu-button--danger.is-active,
.bu-button--danger:active {
  background: #dd6161;
  border-color: #dd6161;
  color: #fff;
}
.bu-button--danger:active {
  outline: 0;
}
.bu-button--danger.is-disabled,
.bu-button--danger.is-disabled:active,
.bu-button--danger.is-disabled:focus,
.bu-button--danger.is-disabled:hover {
  color: #fff;
  background-color: #fab6b6;
  border-color: #fab6b6;
}
.bu-button--danger.is-plain {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
.bu-button--danger.is-plain:focus,
.bu-button--danger.is-plain:hover {
  background: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}
.bu-button--danger.is-plain:active {
  background: #dd6161;
  border-color: #dd6161;
  color: #fff;
  outline: 0;
}
.bu-button--danger.is-plain.is-disabled,
.bu-button--danger.is-plain.is-disabled:active,
.bu-button--danger.is-plain.is-disabled:focus,
.bu-button--danger.is-plain.is-disabled:hover {
  color: #f9a7a7;
  background-color: #fef0f0;
  border-color: #fde2e2;
}
.bu-button--info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}
.bu-button--info:focus,
.bu-button--info:hover {
  background: #a6a9ad;
  border-color: #a6a9ad;
  color: #fff;
}
.bu-button--info.is-active,
.bu-button--info:active {
  background: #82848a;
  border-color: #82848a;
  color: #fff;
}
.bu-button--info:active {
  outline: 0;
}
.bu-button--info.is-disabled,
.bu-button--info.is-disabled:active,
.bu-button--info.is-disabled:focus,
.bu-button--info.is-disabled:hover {
  color: #fff;
  background-color: #c8c9cc;
  border-color: #c8c9cc;
}
.bu-button--info.is-plain {
  color: #909399;
  background: #f4f4f5;
  border-color: #d3d4d6;
}
.bu-button--info.is-plain:focus,
.bu-button--info.is-plain:hover {
  background: #909399;
  border-color: #909399;
  color: #fff;
}
.bu-button--info.is-plain:active {
  background: #82848a;
  border-color: #82848a;
  color: #fff;
  outline: 0;
}
.bu-button--info.is-plain.is-disabled,
.bu-button--info.is-plain.is-disabled:active,
.bu-button--info.is-plain.is-disabled:focus,
.bu-button--info.is-plain.is-disabled:hover {
  color: #bcbec2;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
}
.bu-button--text,
.bu-button--text.is-disabled,
.bu-button--text.is-disabled:focus,
.bu-button--text.is-disabled:hover,
.bu-button--text:active {
  border-color: transparent;
}
.bu-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.bu-button--mini,
.bu-button--small {
  font-size: 12px;
  border-radius: 3px;
}
.bu-button--medium.is-round {
  padding: 10px 20px;
}
.bu-button--medium.is-circle {
  padding: 10px;
}
.bu-button--small,
.bu-button--small.is-round {
  padding: 9px 15px;
}
.bu-button--small.is-circle {
  padding: 9px;
}
.bu-button--mini,
.bu-button--mini.is-round {
  padding: 7px 15px;
}
.bu-button--mini.is-circle {
  padding: 7px;
}
.bu-button--text {
  color: #409eff;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}
.bu-button--text:focus,
.bu-button--text:hover {
  color: #66b1ff;
  border-color: transparent;
  background-color: transparent;
}
.bu-button--text:active {
  color: #3a8ee6;
  background-color: transparent;
}
.bu-button-group {
  display: inline-block;
  vertical-align: middle;
}
.bu-button-group::after,
.bu-button-group::before {
  display: table;
  content: '';
}
.bu-button-group::after {
  clear: both;
}
.bu-button-group > .bu-button {
  float: left;
  position: relative;
}
.bu-button-group > .bu-button + .bu-button {
  margin-left: 0;
}
.bu-button-group > .bu-button:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.bu-button-group > .bu-button:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.bu-button-group > .bu-button:first-child:last-child {
  border-radius: 4px;
}
.bu-button-group > .bu-button:first-child:last-child.is-round {
  border-radius: 20px;
}
.bu-button-group > .bu-button:first-child:last-child.is-circle {
  border-radius: 50%;
}
.bu-button-group > .bu-button:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.bu-button-group > .bu-button:not(:last-child) {
  margin-right: -1px;
}
.bu-button-group > .bu-dropdown > .bu-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--primary:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--primary:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--primary:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--success:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--success:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--success:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--warning:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--warning:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--warning:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--danger:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--danger:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--danger:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--info:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--info:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--info:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
</style>
