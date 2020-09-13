<template>
  <div>
    <test-button></test-button>
    <test-progress></test-progress>
  </div>
</template>

<script>
import TestButton from './TestButton'
import TestProgress from './TestProgress'
// console.log(TestButton)
export default {
  components: {
    TestButton,
    TestProgress
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
