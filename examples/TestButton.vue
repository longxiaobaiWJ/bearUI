<template>
  <div>
    <div class="row">
      <bu-button>按钮</bu-button>
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
      <bu-button icon="el-icon-check" circle plain></bu-button>
      <bu-button icon="el-icon-check" circle plain type="primary"></bu-button>
      <bu-button icon="el-icon-check" circle plain type="success"></bu-button>
      <bu-button icon="el-icon-check" circle plain type="info"></bu-button>
      <bu-button icon="el-icon-check" circle plain type="warning"></bu-button>
      <bu-button icon="el-icon-check" circle plain type="danger"></bu-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px 0;
}
.bu-button {
  margin-left: 10px;
}
</style>
