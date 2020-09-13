<template>
  <div role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" class="bu-progress bu-progress--line">
    <div class="bu-progress-bar">
      <div class="bu-progress-bar__outer" style="height: 6px;">
        <div class="bu-progress-bar__inner" style="width: 50%;">
          <!---->
        </div>
      </div>
    </div>
    <div class="bu-progress__text" style="font-size: 14.4px;">50%</div>
  </div>
</template>

<script>
export default {
  name: 'BuProgress',
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'line'
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    textInside: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: '--'
    },
    color: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 126
    },
    showText: {
      type: Boolean,
      default: true
    },
    strokeLinecap: {
      ype: String,
      default: 'round'
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang='scss'>
.bu-progress {
  position: relative;
  line-height: 1;
  &.bu-progress--line {
    margin-bottom: 15px;
    width: 350px;
  }
  & .bu-progress-bar {
    padding-right: 50px;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    margin-right: -55px;
    box-sizing: border-box;
  }
  & .bu-progress-bar__outer {
    height: 6px;
    border-radius: 100px;
    background-color: #ebeef5;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
  }
  & .bu-progress-bar__inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #409eff;
    text-align: right;
    border-radius: 100px;
    line-height: 1;
    white-space: nowrap;
    transition: width .6s ease;
  }
  & .bu-progress__text {
    font-size: 14px;
    color: #606266;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    line-height: 1;
  }
}

</style>
