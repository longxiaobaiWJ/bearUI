<template>
  <transition name="bu-zoom-in-top" @after-leave="doDestroy">
    <ul
      class="bu-dropdown-menu bu-popper"
      :class="[size && `bu-dropdown-menu--${size}`]"
      v-show="showPopper"
    >
      <slot></slot>
    </ul>
  </transition>
</template>
<script>
import Popper from '@/src/utils/vue-popper'

export default {
  name: 'BuDropdownMenu',

  componentName: 'BuDropdownMenu',

  mixins: [Popper],

  props: {
    visibleArrow: {
      type: Boolean,
      default: true
    },
    arrowOffset: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      size: this.dropdown.dropdownSize
    }
  },

  inject: ['dropdown'],

  created () {
    this.$on('updatePopper', () => {
      if (this.showPopper) this.updatePopper()
    })
    this.$on('visible', val => {
      this.showPopper = val
    })
  },

  mounted () {
    this.dropdown.popperElm = this.popperElm = this.$el
    this.referenceElm = this.dropdown.$el
    this.dropdown.initDomOperation()
  },

  watch: {
    'dropdown.placement': {
      immediate: true,
      handler (val) {
        this.currentPlacement = val
      }
    }
  }
};
</script>
