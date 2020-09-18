<template>
  <div>
    <h2>基础用法</h2>
    <div class="row">
      <bu-dropdown>
        <span class="bu-dropdown-link">
          下拉菜单
          <i class="bu-icon-arrow-down bu-icon--right"></i>
        </span>
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item>黄金糕</bu-dropdown-item>
          <bu-dropdown-item>狮子头</bu-dropdown-item>
          <bu-dropdown-item>螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item disabled>双皮奶</bu-dropdown-item>
          <bu-dropdown-item divided>蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>
    </div>
    <h2>触发对象</h2>
    <div class="row">
      <bu-dropdown>
        <bu-button type="primary">
          更多菜单
          <i class="bu-icon-arrow-down bu-icon--right"></i>
        </bu-button>
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item>黄金糕</bu-dropdown-item>
          <bu-dropdown-item>狮子头</bu-dropdown-item>
          <bu-dropdown-item>螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item>双皮奶</bu-dropdown-item>
          <bu-dropdown-item>蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>
      <bu-dropdown split-button type="primary" @click="handleClick">
        更多菜单
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item>黄金糕</bu-dropdown-item>
          <bu-dropdown-item>狮子头</bu-dropdown-item>
          <bu-dropdown-item>螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item>双皮奶</bu-dropdown-item>
          <bu-dropdown-item>蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>
    </div>
    <h2>触发方式</h2>
    <h3>hover 激活</h3>
    <div class="row">
      <bu-dropdown>
        <span class="bu-dropdown-link">
          下拉菜单
          <i class="bu-icon-arrow-down bu-icon--right"></i>
        </span>
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item icon="bu-icon-plus">黄金糕</bu-dropdown-item>
          <bu-dropdown-item icon="bu-icon-circle-plus">狮子头</bu-dropdown-item>
          <bu-dropdown-item icon="bu-icon-circle-plus-outline">螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item icon="bu-icon-check">双皮奶</bu-dropdown-item>
          <bu-dropdown-item icon="bu-icon-circle-check">蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>
    </div>
    <h3>click 激活</h3>
    <div class="row">
      <bu-dropdown trigger="click">
        <span class="bu-dropdown-link">
          下拉菜单
          <i class="bu-icon-arrow-down bu-icon--right"></i>
        </span>
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item icon="bu-icon-plus">黄金糕</bu-dropdown-item>
          <bu-dropdown-item icon="bu-icon-circle-plus">狮子头</bu-dropdown-item>
          <bu-dropdown-item icon="bu-icon-circle-plus-outline">螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item icon="bu-icon-check">双皮奶</bu-dropdown-item>
          <bu-dropdown-item icon="bu-icon-circle-check">蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>
    </div>
    <h3>菜单隐藏方式</h3>
    <div class="row">
      <bu-dropdown :hide-on-click="false">
        <span class="bu-dropdown-link">
          下拉菜单
          <i class="bu-icon-arrow-down bu-icon--right"></i>
        </span>
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item>黄金糕</bu-dropdown-item>
          <bu-dropdown-item>狮子头</bu-dropdown-item>
          <bu-dropdown-item>螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item disabled>双皮奶</bu-dropdown-item>
          <bu-dropdown-item divided>蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>
    </div>
    <h3>指令事件</h3>
    <div class="row">
      <bu-dropdown @command="handleCommand">
        <span class="bu-dropdown-link">
          下拉菜单
          <i class="bu-icon-arrow-down bu-icon--right"></i>
        </span>
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item command="a">黄金糕</bu-dropdown-item>
          <bu-dropdown-item command="b">狮子头</bu-dropdown-item>
          <bu-dropdown-item command="c">螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item command="d" disabled>双皮奶</bu-dropdown-item>
          <bu-dropdown-item command="e" divided>蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>
    </div>
    <h3>不同尺寸</h3>
    <div class="row">
      <bu-dropdown split-button type="primary">
        默认尺寸
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item>黄金糕</bu-dropdown-item>
          <bu-dropdown-item>狮子头</bu-dropdown-item>
          <bu-dropdown-item>螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item>双皮奶</bu-dropdown-item>
          <bu-dropdown-item>蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>

      <bu-dropdown size="medium" split-button type="primary">
        中等尺寸
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item>黄金糕</bu-dropdown-item>
          <bu-dropdown-item>狮子头</bu-dropdown-item>
          <bu-dropdown-item>螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item>双皮奶</bu-dropdown-item>
          <bu-dropdown-item>蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>

      <bu-dropdown size="small" split-button type="primary">
        小型尺寸
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item>黄金糕</bu-dropdown-item>
          <bu-dropdown-item>狮子头</bu-dropdown-item>
          <bu-dropdown-item>螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item>双皮奶</bu-dropdown-item>
          <bu-dropdown-item>蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>

      <bu-dropdown size="mini" split-button type="primary">
        超小尺寸
        <bu-dropdown-menu slot="dropdown">
          <bu-dropdown-item>黄金糕</bu-dropdown-item>
          <bu-dropdown-item>狮子头</bu-dropdown-item>
          <bu-dropdown-item>螺蛳粉</bu-dropdown-item>
          <bu-dropdown-item>双皮奶</bu-dropdown-item>
          <bu-dropdown-item>蚵仔煎</bu-dropdown-item>
        </bu-dropdown-menu>
      </bu-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      alert('button click')
    },
    handleCommand (command) {
      this.$message('click on item ' + command)
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px 0;
}
.bu-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.bu-icon-arrow-down {
  font-size: 12px;
}
.bu-dropdown {
  vertical-align: top;
}
.bu-dropdown + .bu-dropdown {
  margin-left: 15px;
}
.bu-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>