<template>
  <div>
    <h2>按钮</h2>
    <div class="row bu-button">
      <bu-button plain @click="clickbtn">按钮</bu-button>
      <bu-button type="primary">按钮</bu-button>
      <bu-button type="success">按钮</bu-button>
      <bu-button type="info">按钮</bu-button>
      <bu-button type="warning">按钮</bu-button>
      <bu-button type="danger">按钮</bu-button>
    </div>
    <div class="row">
      <bu-button plain>按钮</bu-button>
      <bu-button plain type="primary">按钮</bu-button>
      <bu-button plain type="success">按钮</bu-button>
      <bu-button plain type="info">按钮</bu-button>
      <bu-button plain type="warning">按钮</bu-button>
      <bu-button plain type="danger">按钮</bu-button>
    </div>
    <div class="rowbu">
      <bu-button round plain>按钮</bu-button>
      <bu-button round plain type="primary">按钮</bu-button>
      <bu-button round plain type="success">按钮</bu-button>
      <bu-button round plain type="info">按钮</bu-button>
      <bu-button round plain type="warning">按钮</bu-button>
      <bu-button round plain type="danger">按钮</bu-button>
    </div>
    <div class="row">
      <bu-button icon="bu-icon-check" circle plain></bu-button>
      <bu-button icon="bu-icon-check" circle plain type="primary"></bu-button>
      <bu-button icon="bu-icon-check" circle plain type="success"></bu-button>
      <bu-button icon="bu-icon-check" circle plain type="info"></bu-button>
      <bu-button icon="bu-icon-check" circle plain type="warning"></bu-button>
      <bu-button icon="bu-icon-check" circle plain type="danger"></bu-button>
    </div>
    <h2>按钮组</h2>
    <div class="row">
      <bu-button-group>
        <bu-button type="primary" icon="bu-icon-arrow-left">上一页</bu-button>
        <bu-button type="primary">
          下一页
          <i class="bu-icon-arrow-right bu-icon--right"></i>
        </bu-button>
      </bu-button-group>
      <bu-button-group>
        <bu-button type="primary" icon="bu-icon-edit"></bu-button>
        <bu-button type="primary" icon="bu-icon-share"></bu-button>
        <bu-button type="primary" icon="bu-icon-delete"></bu-button>
      </bu-button-group>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickbtn () {
      console.log('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px 0;
}
.bu-button {
  margin: 0 10px 0 10px;
}
</style>
