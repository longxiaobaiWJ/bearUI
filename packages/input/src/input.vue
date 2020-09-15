<template>
  <div
    :class="[
      type === 'textarea' ? 'bu-textarea' : 'bu-input',
      {
        'is-disabled': inputDisabled
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
    showPassword: Boolean
  },

  data() {
    return {
      focuesd: false,
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
        (this.focuesd || this.hovering)
      )
    },
    // 兼容表单的 disabled
    inputDisabled() {
      // TODO Input：兼容表单的 disabled
      return this.disabled
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

    // ---------- 事件 -----------
    handleInput(event) {
      if (event.target.value === this.nativeInputValue) return

      this.$emit('input', event.target.value)

      this.$nextTick(this.setNativeInputValue)
    },
    handleFocus(event) {
      this.focuesd = true
      this.$emit('focus', event)
    },
    handleBlur(event) {
      this.focused = false
      this.$emit('blur', event)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
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
