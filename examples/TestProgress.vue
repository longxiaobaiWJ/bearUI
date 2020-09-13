<template>
  <div>
    <div>
      <bu-progress :percentage="50"></bu-progress>
      <bu-progress :percentage="100" :format="format"></bu-progress>
      <bu-progress :percentage="100" status="success"></bu-progress>
      <bu-progress :percentage="100" status="warning"></bu-progress>
      <bu-progress :percentage="50" status="exception"></bu-progress>
    </div>

    <div>
      <bu-progress :text-inside="true" :stroke-width="26" :percentage="70"></bu-progress>
      <bu-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></bu-progress>
      <bu-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></bu-progress>
      <bu-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></bu-progress>
    </div>

    <div>
      <bu-progress :percentage="percentage" :color="customColor"></bu-progress>

      <bu-progress :percentage="percentage" :color="customColorMethod"></bu-progress>

      <bu-progress :percentage="percentage" :color="customColors"></bu-progress>
      <div>
        <bu-button-group>
          <bu-button icon="bu-icon-minus" @click="decrease"></bu-button>
          <bu-button icon="bu-icon-plus" @click="increase"></bu-button>
        </bu-button-group>
      </div>
    </div>

    <div>
      <bu-progress type="circle" :percentage="0"></bu-progress>
      <bu-progress type="circle" :percentage="25"></bu-progress>
      <bu-progress type="circle" :percentage="100" status="success"></bu-progress>
      <bu-progress type="circle" :percentage="70" status="warning"></bu-progress>
      <bu-progress type="circle" :percentage="50" status="exception"></bu-progress>
    </div>

    <div>
      <bu-progress type="dashboard" :percentage="percentage" :color="colors"></bu-progress>
      <div>
        <bu-button-group>
          <bu-button icon="bu-icon-minus" @click="decrease"></bu-button>
          <bu-button icon="bu-icon-plus" @click="increase"></bu-button>
        </bu-button-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 20,
      customColor: '#409eff',
      customColors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ]
    };
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`;
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px 0;
}
.bu-button {
  margin-left: 10px;
}
</style>
