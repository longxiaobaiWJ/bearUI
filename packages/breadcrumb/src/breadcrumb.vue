<template>
  <div class="bu-breadcrumb" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'BuBreadcrumb',

  props: {
    separator: {
      type: String,
      default: '/'
    },
    separatorClass: {
      type: String,
      default: ''
    }
  },

  provide () {
    return {
      buBreadcrumb: this
    }
  },

  mounted () {
    const items = this.$el.querySelectorAll('.bu-breadcrumb__item')
    if (items.length) {
      items[items.length - 1].setAttribute('aria-current', 'page')
    }
  }
};
</script>
<style lang='scss'>
.bu-breadcrumb {
  font-size: 14px;
  line-height: 1;
}
.bu-breadcrumb::after,
.bu-breadcrumb::before {
  display: table;
  content: '';
}
.bu-breadcrumb::after {
  clear: both;
}
</style>