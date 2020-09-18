<template>
  <div>
    <h2>button</h2>
    <test-button></test-button>
<<<<<<< HEAD
    <h2>breadcrumb</h2>
    <test-breadcrumb></test-breadcrumb>
    <h2>dropdown</h2>
    <test-dropdown></test-dropdown>
=======
    <test-input></test-input>
>>>>>>> 020bcf52b9d98251cd08c1be639bdcfddf81d621
  </div>
</template>

<script>
import TestButton from './TestButton'
<<<<<<< HEAD
import TestBreadcrumb from './TestBreadcrumb'
import TestDropdown from './TestDropdown'

export default {
  components: {
    TestButton,
    TestBreadcrumb,
    TestDropdown
=======
import TestInput from './TestInput'
// console.log(TestButton)
export default {
  components: {
    TestButton,
    TestInput
>>>>>>> 020bcf52b9d98251cd08c1be639bdcfddf81d621
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
