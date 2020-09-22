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
      <h3>可清空</h3>
      <div class="source">
        <bu-input
          v-model="value3"
          placeholder="请输入内容"
          clearable
        ></bu-input>
      </div>
    </div>
    <div class="row">
      <h3>密码框</h3>
      <div class="source">
        <bu-input
          v-model="value4"
          type="password"
          showPassword
          placeholder="请输入密码"
        ></bu-input>
      </div>
    </div>
    <div class="row">
      <h3>文本域</h3>
      <div class="source">
        <bu-input
          v-model="value5"
          type="textarea"
          rows="3"
          placeholder="请输入内容"
        ></bu-input>
      </div>
    </div>
    <div class="row">
      <h3>尺寸</h3>
      <div class="source demo-input">
        <bu-input
          v-model="value6"
          size="large"
          suffix-icon="bu-icon-date"
          placeholder="large(默认)"
        ></bu-input>
        <bu-input
          v-model="value6"
          size="medium"
          suffix-icon="bu-icon-date"
          placeholder="medium"
        ></bu-input>
        <bu-input
          v-model="value6"
          size="small"
          suffix-icon="bu-icon-date"
          placeholder="small"
        ></bu-input>
        <bu-input
          v-model="value6"
          size="mini"
          suffix-icon="bu-icon-date"
          placeholder="mini"
        ></bu-input>
      </div>
    </div>
    <div class="row">
      <h3>带 icon 的输入框</h3>
      <div class="source demo-input">
        <bu-input
          v-model="value7"
          placeholder="请输入日期"
          suffix-icon="bu-icon-date"
        ></bu-input>
        <bu-input
          placeholder="请输入内容"
          prefix-icon="bu-icon-search"
          v-model="value7"
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
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: ''
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
.demo-input .bu-input {
  vertical-align: top;
  margin: 0 10px 10px 0;
}
</style>
