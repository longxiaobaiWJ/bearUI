<template>
  <div class="testInput">
    <h2>Input 输入框</h2>
    <div class="row">
      <h3>基础用法</h3>
      <div class="source">
        <bu-input v-model="value" placeholder="请输入内容"></bu-input>
      </div>
    </div>
    <div class="row">
      <h3>禁用状态</h3>
      <div class="source">
        <bu-input v-model="value2" disabled placeholder="请输入内容"></bu-input>
      </div>
    </div>
    <div class="row">
      <h3>文本域</h3>
      <div class="source">
        <bu-input
          v-model="value3"
          type="textarea"
          placeholder="请输入内容"
        ></bu-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      value2: '',
      value3: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.testInput {
  h2 {
    font-size: 28px;
  }
  h2,
  h3 {
    font-weight: 400;
    color: #1f2f3d;
  }
  .row {
    margin-bottom: 55px;
    &:last-child {
      margin-top: 0px;
    }
    h3 {
      margin-bottom: 20px;
      font-size: 22px;
    }
    .source {
      border: 1px solid #ebebeb;
      border-radius: 3px;
      padding: 24px;
    }
    .bu-input {
      width: 180px;
    }
    .bu-textarea {
      width: 420px;
    }
  }
}
</style>
