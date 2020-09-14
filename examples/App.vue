<template>
  <div>
    <test-button></test-button>
    <test-link></test-link>
  </div>
</template>

<script>
import TestButton from './TestButton'
import TestLink from './TestLink'
// console.log(TestButton)
export default {
  components: {
    TestButton,
    TestLink
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
