<template>
  <div class='pagination-test'>
     <h2>pagination 分页器</h2>
     <div class="row">
      <h3>基础用法</h3>
      <div class="source">
        <bu-pagination :currentPage='1' :pageCount='10' :total ='500'></bu-pagination>
      </div>
    </div>
    <div class="row">
      <h3>带背景色的分页</h3>
      <div class="source">
        <bu-pagination :currentPage='1' :pageCount='10' :total ='500' :background='true'></bu-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestPagination'
}
</script>

<style lang="scss" scoped>
.pagination-test {
  width: 100%;
  border: 1px dashed #ccc;
}
</style>