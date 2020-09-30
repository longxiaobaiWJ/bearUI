<template>
  <div :class="['bu-pagination', {'is-background': background}]">
    <button
      type="button"
      class="btn-prev"
      :disabled="disabled ||internalCurrentPage <= 1"
      @click="prev"
    >
      <template v-if="prevText">
        <span>{ prevText }</span>
      </template>
      <template v-else>
        <i class="bu-icon bu-icon-arrow-left"></i>
      </template>
    </button>
    <pager
      :currentPage="internalCurrentPage"
      :pageCount="internalPageCount"
      :pagerCount="pagerCount"
      :disabled="disabled"
      @change="handleCurrentChange"
    >
    </pager>
    <button
      type="button"
      class="btn-next"
      :disabled="
        disabled ||
        internalCurrentPage === internalPageCount ||
        internalPageCount === 0
      "
      @click="next"
    >
      <template v-if="prevText">
        <span>{ prevText }</span>
      </template>
      <template v-else>
        <i class="bu-icon bu-icon-arrow-right"></i>
      </template>
    </button>
  </div>
</template>

<script>
import pager from "./pager";
export default {
  name: "BuPagination",
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },

    small: Boolean,

    total: Number,

    pageCount: Number,

    pagerCount: {
      type: Number,
      validator(value) {
        return (
          (value | 0) === value && value > 4 && value < 22 && value % 2 === 1
        );
      },
      default: 7,
    },

    currentPage: {
      type: Number,
      default: 1,
    },

    layout: {
      default: "prev, pager, next, jumper, ->, total",
    },

    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100];
      },
    },

    popperClass: String,

    prevText: String,

    nextText: String,

    background: Boolean,

    disabled: Boolean,

    hideOnSinglePage: Boolean,
  },
  watch: {
    currentPage: {
      immediate: true,
      handler(val) {
        this.internalCurrentPage = this.getValidCurrentPage(val);
      },
    },

    pageSize: {
      immediate: true,
      handler(val) {
        this.internalPageSize = isNaN(val) ? 10 : val;
      },
    },

    internalCurrentPage: {
      immediate: true,
      handler(newVal) {
        this.$emit("update:currentPage", newVal);
        this.lastEmittedPage = -1;
      },
    },

    internalPageCount(newVal) {
      /* istanbul ignore if */
      const oldPage = this.internalCurrentPage;
      if (newVal > 0 && oldPage === 0) {
        this.internalCurrentPage = 1;
      } else if (oldPage > newVal) {
        this.internalCurrentPage = newVal === 0 ? 1 : newVal;
        this.userChangePageSize && this.emitChange();
      }
      this.userChangePageSize = false;
    },
  },
  computed: {
    internalPageCount() {
      if (typeof this.total === "number") {
        return Math.max(1, Math.ceil(this.total / this.internalPageSize));
      } else if (typeof this.pageCount === "number") {
        return Math.max(1, this.pageCount);
      }
      return null;
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.internalCurrentPage = this.getValidCurrentPage(val);
      this.userChangePageSize = true;
      this.emitChange();
    },
    emitChange() {
      this.$nextTick(() => {
        if (
          this.internalCurrentPage !== this.lastEmittedPage ||
          this.userChangePageSize
        ) {
          this.$emit("current-change", this.internalCurrentPage);
          this.lastEmittedPage = this.internalCurrentPage;
          this.userChangePageSize = false;
        }
      });
    },
    prev() {
      if (this.disabled) return;
      const newVal = this.internalCurrentPage - 1;
      this.internalCurrentPage = this.getValidCurrentPage(newVal);
      this.emitChange();
    },
    next() {
      if (this.disabled) return;
      const newVal = this.internalCurrentPage + 1;
      this.internalCurrentPage = this.getValidCurrentPage(newVal);
      this.emitChange();
    },
    getValidCurrentPage(value) {
      value = parseInt(value, 10);

      const havePageCount = typeof this.internalPageCount === "number";

      let resetValue;
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else if (value > this.internalPageCount) {
          resetValue = this.internalPageCount;
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    },
  },
  data() {
    return {
      internalCurrentPage: 1,
      internalPageSize: 0,
      lastEmittedPage: -1,
      userChangePageSize: false,
    };
  },
  components: {
    pager,
  },
};
</script>

<style lang="scss">
.bu-pagination{
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  button {
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    box-sizing: border-box;
    border: none;
    padding: 0 6px;
    background: transparent;
    &:focus {
      outline:none;
    }
  }
  .btn-next, .btn-prev {
    background: 50% no-repeat;
    background-size: 16px;
    background-color: #fff;
    cursor: pointer;
    margin: 0;
    color: #303133;
  }
  button:disabled {
    color: #c0c4cc;
    background-color: #fff;
    cursor: not-allowed;
  }
  &.is-background .btn-next, &.is-background .btn-prev, &.is-background .bu-pager li {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    min-width: 30px;
    border-radius: 2px;
  }
  &.is-background .bu-pager li:not(.disabled).active {
    background-color: #409eff;
    color: #fff;
  }
  .bu-pager li.active {
    color: #409eff;
    cursor: default;
  }
}

</style>
