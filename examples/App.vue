<template>
  <div>
    <test-button></test-button>
    <test-link></test-link>
    <test-input></test-input>
  </div>
</template>

<script>
import TestButton from './TestButton'
import TestLink from './TestLink'
import TestInput from './TestInput'
// console.log(TestButton)
export default {
  components: {
    TestButton,
    TestLink,
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
