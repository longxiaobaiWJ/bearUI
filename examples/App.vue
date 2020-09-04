<template>
  <div>
    <test-button></test-button>
  </div>
</template>

<script>
import TestButton from './TestButton'
// console.log(TestButton)
export default {
  components: {
    TestButton
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
