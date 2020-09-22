<template>
  <div
    :class="[
      type === 'textarea' ? 'bu-textarea' : 'bu-input',
      inputSize ? 'bu-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'bu-input--prefix': $slots.prefix || prefixIcon,
        'bu-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <input
        ref="input"
        class="bu-input__inner"
        v-bind="$attrs"
        :disabled="inputDisabled"
        :readonly="readonly"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />

      <!-- 前置内容 -->
      <span class="bu-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="bu-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>

      <!-- 后置内容 -->
      <span class="bu-input__suffix" v-if="getSuffixVisible()">
        <span class="bu-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="bu-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
          </template>
          <i
            v-if="showClear"
            class="bu-input__icon bu-icon-circle-close bu-input__clear"
            @mousedown.prevent
            @click="clear"
          ></i>
          <i
            v-if="showPwdVisible"
            class="bu-input__icon bu-icon-view bu-input__clear"
            @click="handlePasswordVisible"
          ></i>
        </span>
      </span>
    </template>
    <textarea
      v-else
      ref="textarea"
      class="bu-textarea__inner"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    ></textarea>
  </div>
</template>

<script>
export default {
  // 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件
  name: 'BuInput',
  inheritAttrs: false,

  props: {
    // 默认值
    value: [Number, String],
    // 文本框尺寸
    size: {
      type: String,
      default: 'large',
      validator(val) {
        if (!val || val === 'large') {
          return true
        } else {
          return ['large', 'medium', 'small', 'mini'].includes(val)
        }
      }
    },
    // 文本框类型
    type: {
      type: String,
      default: 'text'
    },
    // 是否允许清空
    clearable: Boolean,
    // 是否禁用
    disabled: Boolean,
    // 是否只读
    readonly: Boolean,
    // 是否显示切换密码图标
    showPassword: Boolean,
    // 头部图标
    prefixIcon: String,
    // 尾部图标
    suffixIcon: String
  },

  data() {
    return {
      focused: false,
      hovering: false,
      passwordVisible: false
    }
  },

  computed: {
    // 原生 value
    nativeInputValue() {
      // 判断是否为 null 或 undefined
      // 一律转为 string 类型
      return this.value == null ? '' : String(this.value)
    },
    // 控制展示清空按钮
    showClear() {
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
      )
    },
    // 控制是否展示密码试图切换按钮
    showPwdVisible() {
      return (
        this.showPassword &&
        !this.inputDisabled &&
        !this.readonly &&
        (!!this.nativeInputValue || this.focused)
      )
    },
    isWordLimitVisible() {
      return false
      // return this.showWordLimit &&
      //   this.$attrs.maxlength &&
      //   (this.type === 'text' || this.type === 'textarea') &&
      //   !this.inputDisabled &&
      //   !this.readonly &&
      //   !this.showPassword;
    },
    // 兼容表单的 disabled
    inputDisabled() {
      // TODO Input：兼容表单的 disabled
      return this.disabled
    },
    // 文本框尺寸
    inputSize() {
      // 指定有效的默认值，防止全局设置size后无法使用默认尺寸
      const thisSize = this.size == 'large' ? '' : this.size
      return thisSize
      // return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  methods: {
    // 获取文本框DOM
    getInput() {
      return this.$refs.input || this.$refs.textarea
    },
    // 更新原生 value
    setNativeInputValue() {
      const input = this.getInput()
      if (!input) return
      if (input.value === this.nativeInputValue) return
      input.value = this.nativeInputValue
    },
    // 后置内容是否可见
    getSuffixVisible() {
      return this.suffixIcon || this.showClear || this.showPassword
      // return (
      //   this.$slots.suffix ||
      //
      //   this.showClear ||
      //   this.showPassword ||
      //   this.isWordLimitVisible ||
      //   (this.validateState && this.needStatusIcon)
      // )
    },

    // ---------- 事件 -----------
    handleInput(event) {
      if (event.target.value === this.nativeInputValue) return

      this.$emit('input', event.target.value)

      this.$nextTick(this.setNativeInputValue)
    },
    handleFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    handleBlur(event) {
      this.focused = false
      this.$emit('blur', event)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },

    // ---------- 操作 -----------
    focus() {
      this.getInput().focus()
    },
    blur() {
      this.getInput().blur()
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
      this.focus()
    }
  },

  watch: {
    nativeInputValue() {
      this.setNativeInputValue()
    },
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue()
      })
    }
    // value() {
    //   const input = this.$refs.input
    //   console.dir(input)
    // }
  },

  mounted() {
    this.setNativeInputValue()
  }
}
</script>

<style lang="scss">
@import './input.scss';
</style>
