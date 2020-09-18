<template>
  <div>
    <h2>button</h2>
    <test-button></test-button>
    <h2>breadcrumb</h2>
    <test-breadcrumb></test-breadcrumb>
    <h2>dropdown</h2>
    <test-dropdown></test-dropdown>
    <h2>input</h2>
    <test-input></test-input>
  </div>
</template>

<script>
import TestButton from './TestButton'
import TestBreadcrumb from './TestBreadcrumb'
import TestDropdown from './TestDropdown'
import TestInput from './TestInput'

export default {
  components: {
    TestButton,
    TestBreadcrumb,
    TestDropdown,
    TestInput
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
