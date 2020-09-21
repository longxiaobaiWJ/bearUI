<template>
  <div
    v-bind="$data.attrs"
    :class="['bu-divider', `bu-divider--${$props.direction}`]"
  >
    <div
      v-if="$props.direction !== 'vertical'"
      :class="['bu-divider__text', `is-${$props.contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'BuDivider',
  props: {
    test: {
      type: String,
      default: '123',
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator (val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1
      },
    },
    contentPosition: {
      type: String,
      default: 'center',
      validator (val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1
      },
    },
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
  .bu-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
  }

  .bu-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }

  .bu-divider {
    background-color: #dcdfe6;
    position: relative;
  }

  .bu-divider__text {
    position: absolute;
    background-color: #fff;
    padding: 0 20px;
    font-weight: 500;
    color: #303133;
    font-size: 14px;
  }

  .bu-divider__text.is-center {
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .bu-divider__text.is-left {
    left: 20px;
    transform: translateY(-50%);
  }

  .bu-divider__text.is-right {
    right: 20px;
    transform: translateY(-50%);
  }
</style>
