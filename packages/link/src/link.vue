<template>
  <!-- @click: 点击事件  href：原生属性 v-bind：额外属性 underline：下划线 disabled：禁用 -->
  <a class="bu-link"
     @click="handleClick"
     :href="disabled ? null : href"
     v-bind="$attrs"
     :class="[
      `bu-link--${type}`,
      {
        'is-underline': underline,
        'is-disabled': disabled
      }
    ]">
    <!-- 字体图标的支持 -->
    <i :class="icon"
       v-if="icon"></i>
    <span>
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  name: 'BuLink',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: ''
    }
  },
  created () {
  },
  methods: {
    handleClick (e) {
      if (!this.disabled && !this.href)
      {
        this.$emit('click', e)
      }

    }
  }
}
</script>

<style lang='scss'>
.bu-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: none;
    width: 100%;
    height: 1px;
    background: #409eff;
  }

  &:hover,
  &:focus {
    color: #409eff;
  }
  // 下划线
  &.is-underline {
    &:hover,
    &:focus {
      &::after {
        display: block;
      }
      &.is-disabled {
        &::after {
          display: none;
        }
      }
    }
  }
  &.is-disabled {
    cursor: not-allowed;
    color: #c0c4cc;
  }

  &--primary {
    color: #409eff;
    &:hover,
    &:focus {
      color: #66b1ff;
      &::after {
        background: #66b1ff;
      }
    }
    &.is-disabled {
      color: #a0cfff;
    }
  }
  &--success {
    color: #67c23a;
    &:hover,
    &:focus {
      color: #85ce61;
      &::after {
        background: #85ce61;
      }
    }
    &.is-disabled {
      color: #b3e19d;
    }
  }
  &--info {
    color: #909399;
    &:hover,
    &:focus {
      color: #a6a9ad;
      &::after {
        background: #a6a9ad;
      }
    }
    &.is-disabled {
      color: #c8c9cc;
    }
  }
  &--warning {
    color: #e6a23c;
    &:hover,
    &:focus {
      color: #ebb563;
      &::after {
        background: #ebb563;
      }
    }
    &.is-disabled {
      color: #f3d19e;
    }
  }
  &--danger {
    color: #f56c6c;
    &:hover,
    &:focus {
      color: #f78989;
      &::after {
        background: #f78989;
      }
    }
    &.is-disabled {
      color: #fab6b6;
    }
  }
}
</style>
