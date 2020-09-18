<template>
  <div>
    <h2>button</h2>
    <test-button></test-button>
    <h2>breadcrumb</h2>
    <test-breadcrumb></test-breadcrumb>
    <h2>dropdown</h2>
    <test-dropdown></test-dropdown>
  </div>
</template>

<script>
import TestButton from './TestButton'
import TestBreadcrumb from './TestBreadcrumb'
import TestDropdown from './TestDropdown'

export default {
  components: {
    TestButton,
    TestBreadcrumb,
    TestDropdown
  }
}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px 0;
}
.hm-button {
  margin-left: 10px;
}
</style>
