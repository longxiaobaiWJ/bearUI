<template>
  <bu-main>
    <h2>TestMessage</h2>
    <test-message></test-message>
    <h2>TestMessageBox</h2>
    <test-message-box></test-message-box>
    <!-- <h2>button</h2>
    <test-button></test-button>
    <h2>breadcrumb</h2>
    <test-breadcrumb></test-breadcrumb>
    <h2>dropdown</h2>
    <test-dropdown></test-dropdown>
    <h2>input</h2>
    <test-input></test-input>
    <h2>progress</h2>
    <test-progress></test-progress>
    <h2>divider</h2>
    <test-divider></test-divider> -->
  </bu-main>
</template>

<script>
// import TestButton from './TestButton'
// import TestBreadcrumb from './TestBreadcrumb'
// import TestDropdown from './TestDropdown'
// import TestInput from './TestInput'
// import TestProgress from './TestProgress'
// import TestDivider from './TestDivider'
import TestMessage from './TestMessage'
import TestMessageBox from './TestMessageBox'

export default {
  components: {
    // TestButton,
    // TestBreadcrumb,
    // TestDropdown,
    // TestInput,
    // TestProgress,
    // TestDivider,
    TestMessage,
    TestMessageBox
  },
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
