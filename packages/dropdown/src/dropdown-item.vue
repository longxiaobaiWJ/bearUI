<template>
  <li
    class="bu-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'bu-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </li>
</template>
<script>
import Emitter from '@/src/mixins/emitter'

export default {
  name: 'BuDropdownItem',

  mixins: [Emitter],

  props: {
    command: {},
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },

  methods: {
    handleClick () {
      this.dispatch('BUDropdown', 'menu-item-click', [this.command, this])
    }
  }
};
</script>
