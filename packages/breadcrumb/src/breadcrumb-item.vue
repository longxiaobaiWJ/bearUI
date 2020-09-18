<template>
  <span class="bu-breadcrumb__item">
    <span :class="['bu-breadcrumb__inner', to ? 'is-link' : '']" ref="link" role="link">
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="bu-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="bu-breadcrumb__separator" role="presentation">{{separator}}</span>
  </span>
</template>
<script>
export default {
  name: 'BuBreadcrumbItem',
  props: {
    to: {},
    replace: Boolean
  },
  data () {
    return {
      separator: '',
      separatorClass: ''
    }
  },

  inject: ['buBreadcrumb'],

  mounted () {
    this.separator = this.buBreadcrumb.separator
    this.separatorClass = this.buBreadcrumb.separatorClass
    const link = this.$refs.link
    link.setAttribute('role', 'link')
    link.addEventListener('click', () => {
      const { to, $router } = this
      if (!to || !$router) return
      this.replace ? $router.replace(to) : $router.push(to)
    })
  }
};
</script>
<style lang="scss">
.bu-breadcrumb__separator {
  margin: 0 9px;
  font-weight: 700;
  color: #c0c4cc;
}
.bu-breadcrumb__separator[class*='icon'] {
  margin: 0 6px;
  font-weight: 400;
}
.bu-breadcrumb__inner {
  color: #606266;
}
.bu-breadcrumb__inner a,
.bu-breadcrumb__inner.is-link {
  font-weight: 700;
  text-decoration: none;
  -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #303133;
}
.bu-breadcrumb__inner a:hover,
.bu-breadcrumb__inner.is-link:hover {
  color: #409eff;
  cursor: pointer;
}
.bu-breadcrumb__item {
  float: left;
}
.bu-breadcrumb__item:last-child .bu-breadcrumb__inner,
.bu-breadcrumb__item:last-child .bu-breadcrumb__inner a,
.bu-breadcrumb__item:last-child .bu-breadcrumb__inner a:hover,
.bu-breadcrumb__item:last-child .bu-breadcrumb__inner:hover {
  font-weight: 400;
  color: #606266;
  cursor: text;
}
.bu-breadcrumb__item:last-child .bu-breadcrumb__separator {
  display: none;
}
</style>