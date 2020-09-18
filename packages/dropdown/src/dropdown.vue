<script>
import Clickoutside from '@/src/utils/clickoutside'
import Emitter from '@/src/mixins/emitter'
import Migrating from '@/src/mixins/migrating'
import buButton from '@/packages/button'
import buButtonGroup from '@/packages/button-group'
import { generateId } from '@/src/utils/util'

export default {
  name: 'BuDropdown',

  componentName: 'BuDropdown',

  mixins: [Emitter, Migrating],

  directives: { Clickoutside },

  components: {
    buButton,
    buButtonGroup
  },

  provide () {
    return {
      dropdown: this
    }
  },

  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    type: String,
    size: {
      type: String,
      default: ''
    },
    splitButton: Boolean,
    hideOnClick: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'bottom-end'
    },
    visibleArrow: {
      default: true
    },
    showTimeout: {
      type: Number,
      default: 250
    },
    hideTimeout: {
      type: Number,
      default: 150
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      timeout: null,
      visible: false,
      triggerElm: null,
      menuItems: null,
      menuItemsArray: null,
      dropdownElm: null,
      focusing: false,
      listId: `dropdown-menu-${generateId()}`
    }
  },

  computed: {
    dropdownSize () {
      return this.size || (this.$ELEMENT || {}).size
    }
  },

  mounted () {
    this.$on('menu-item-click', this.handleMenuItemClick)
  },

  watch: {
    visible (val) {
      this.broadcast('BuDropdownMenu', 'visible', val)
      this.$emit('visible-change', val)
    },
    focusing (val) {
      const selfDefine = this.$el.querySelector('.bu-dropdown-selfdefine')
      if (selfDefine) { // 自定义
        if (val) {
          selfDefine.className += ' focusing'
        } else {
          selfDefine.className = selfDefine.className.replace('focusing', '')
        }
      }
    }
  },

  methods: {
    getMigratingConfig () {
      return {
        props: {
          'menu-align': 'menu-align is renamed to placement.'
        }
      }
    },
    show () {
      if (this.triggerElm.disabled) return
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = true
      }, this.trigger === 'click' ? 0 : this.showTimeout)
    },
    hide () {
      if (this.triggerElm.disabled) return
      this.removeTabindex()
      if (this.tabindex >= 0) {
        this.resetTabindex(this.triggerElm)
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = false
      }, this.trigger === 'click' ? 0 : this.hideTimeout)
    },
    handleClick () {
      if (this.triggerElm.disabled) return
      if (this.visible) {
        this.hide()
      } else {
        this.show()
      }
    },
    handleTriggerKeyDown (ev) {
      const keyCode = ev.keyCode
      if ([38, 40].indexOf(keyCode) > -1) { // up/down
        this.removeTabindex()
        this.resetTabindex(this.menuItems[0])
        this.menuItems[0].focus()
        ev.preventDefault()
        ev.stopPropagation()
      } else if (keyCode === 13) { // space enter选中
        this.handleClick()
      } else if ([9, 27].indexOf(keyCode) > -1) { // tab || esc
        this.hide()
      }
    },
    handleItemKeyDown (ev) {
      const keyCode = ev.keyCode
      const target = ev.target
      const currentIndex = this.menuItemsArray.indexOf(target)
      const max = this.menuItemsArray.length - 1
      let nextIndex
      if ([38, 40].indexOf(keyCode) > -1) { // up/down
        if (keyCode === 38) { // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
        } else { // down
          nextIndex = currentIndex < max ? currentIndex + 1 : max
        }
        this.removeTabindex()
        this.resetTabindex(this.menuItems[nextIndex])
        this.menuItems[nextIndex].focus()
        ev.preventDefault()
        ev.stopPropagation()
      } else if (keyCode === 13) { // enter选中
        this.triggerElmFocus()
        target.click()
        if (this.hideOnClick) { // click关闭
          this.visible = false
        }
      } else if ([9, 27].indexOf(keyCode) > -1) { // tab // esc
        this.hide()
        this.triggerElmFocus()
      }
    },
    resetTabindex (ele) { // 下次tab时组件聚焦元素
      this.removeTabindex()
      ele.setAttribute('tabindex', '0') // 下次期望的聚焦元素
    },
    removeTabindex () {
      this.triggerElm.setAttribute('tabindex', '-1')
      this.menuItemsArray.forEach((item) => {
        item.setAttribute('tabindex', '-1')
      })
    },
    initAria () {
      this.dropdownElm.setAttribute('id', this.listId)
      this.triggerElm.setAttribute('aria-haspopup', 'list')
      this.triggerElm.setAttribute('aria-controls', this.listId)

      if (!this.splitButton) { // 自定义
        this.triggerElm.setAttribute('role', 'button')
        this.triggerElm.setAttribute('tabindex', this.tabindex)
        this.triggerElm.setAttribute('class', (this.triggerElm.getAttribute('class') || '') + ' bu-dropdown-selfdefine') // 控制
      }
    },
    initEvent () {
      let { trigger, show, hide, handleClick, splitButton, handleTriggerKeyDown, handleItemKeyDown } = this
      this.triggerElm = splitButton
        ? this.$refs.trigger.$el
        : this.$slots.default[0].elm

      let dropdownElm = this.dropdownElm

      this.triggerElm.addEventListener('keydown', handleTriggerKeyDown) // triggerElm keydown
      dropdownElm.addEventListener('keydown', handleItemKeyDown, true) // item keydown
      // 控制自定义元素的样式
      if (!splitButton) {
        this.triggerElm.addEventListener('focus', () => {
          this.focusing = true
        })
        this.triggerElm.addEventListener('blur', () => {
          this.focusing = false
        })
        this.triggerElm.addEventListener('click', () => {
          this.focusing = false
        })
      }
      if (trigger === 'hover') {
        this.triggerElm.addEventListener('mouseenter', show)
        this.triggerElm.addEventListener('mouseleave', hide)
        dropdownElm.addEventListener('mouseenter', show)
        dropdownElm.addEventListener('mouseleave', hide)
      } else if (trigger === 'click') {
        this.triggerElm.addEventListener('click', handleClick)
      }
    },
    handleMenuItemClick (command, instance) {
      if (this.hideOnClick) {
        this.visible = false
      }
      this.$emit('command', command, instance)
    },
    triggerElmFocus () {
      this.triggerElm.focus && this.triggerElm.focus()
    },
    initDomOperation () {
      this.dropdownElm = this.popperElm
      this.menuItems = this.dropdownElm.querySelectorAll("[tabindex='-1']")
      this.menuItemsArray = [].slice.call(this.menuItems)

      this.initEvent()
      this.initAria()
    }
  },

  render () {
    let { hide, splitButton, type, dropdownSize } = this

    const handleMainButtonClick = (event) => {
      this.$emit('click', event)
      hide()
    }

    let triggerElm = !splitButton
      ? this.$slots.default
      : (<bu-button-group>
        <bu-button type={type} size={dropdownSize} nativeOn-click={handleMainButtonClick}>
          {this.$slots.default}
        </bu-button>
        <bu-button ref="trigger" type={type} size={dropdownSize} class="bu-dropdown__caret-button">
          <i class="bu-dropdown__icon bu-icon-arrow-down"></i>
        </bu-button>
      </bu-button-group>)

    return (
      <div class="bu-dropdown" v-clickoutside={hide}>
        {triggerElm}
        {this.$slots.dropdown}
      </div>
    )
  }
};
</script>
<style lang='scss'>
.bu-button-group > .bu-button.is-active,
.bu-button-group > .bu-button.is-disabled,
.bu-button-group > .bu-button:active,
.bu-button-group > .bu-button:focus,
.bu-button-group > .bu-button:hover {
  z-index: 1;
}
.bu-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.bu-button + .bu-button {
  margin-left: 10px;
}
.bu-button:focus,
.bu-button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.bu-button:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: 0;
}
.bu-button::-moz-focus-inner {
  border: 0;
}
.bu-button [class*='bu-icon-'] + span {
  margin-left: 5px;
}
.bu-button.is-plain:focus,
.bu-button.is-plain:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
.bu-button.is-active,
.bu-button.is-plain:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
}
.bu-button.is-plain:active {
  background: #fff;
  outline: 0;
}
.bu-button.is-disabled,
.bu-button.is-disabled:focus,
.bu-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.bu-button.is-disabled.bu-button--text {
  background-color: transparent;
}
.bu-button.is-disabled.is-plain,
.bu-button.is-disabled.is-plain:focus,
.bu-button.is-disabled.is-plain:hover {
  background-color: #fff;
  border-color: #ebeef5;
  color: #c0c4cc;
}
.bu-button.is-loading {
  position: relative;
  pointer-events: none;
}
.bu-button.is-loading:before {
  pointer-events: none;
  content: '';
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: inherit;
  background-color: rgba(255, 255, 255, 0.35);
}
.bu-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}
.bu-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}
.bu-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.bu-button--primary:focus,
.bu-button--primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.bu-button--primary.is-active,
.bu-button--primary:active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #fff;
}
.bu-button--primary:active {
  outline: 0;
}
.bu-button--primary.is-disabled,
.bu-button--primary.is-disabled:active,
.bu-button--primary.is-disabled:focus,
.bu-button--primary.is-disabled:hover {
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
}
.bu-button--primary.is-plain {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.bu-button--primary.is-plain:focus,
.bu-button--primary.is-plain:hover {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
.bu-button--primary.is-plain:active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #fff;
  outline: 0;
}
.bu-button--primary.is-plain.is-disabled,
.bu-button--primary.is-plain.is-disabled:active,
.bu-button--primary.is-plain.is-disabled:focus,
.bu-button--primary.is-plain.is-disabled:hover {
  color: #8cc5ff;
  background-color: #ecf5ff;
  border-color: #d9ecff;
}
.bu-button--success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.bu-button--success:focus,
.bu-button--success:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}
.bu-button--success.is-active,
.bu-button--success:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
}
.bu-button--success:active {
  outline: 0;
}
.bu-button--success.is-disabled,
.bu-button--success.is-disabled:active,
.bu-button--success.is-disabled:focus,
.bu-button--success.is-disabled:hover {
  color: #fff;
  background-color: #b3e19d;
  border-color: #b3e19d;
}
.bu-button--success.is-plain {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
}
.bu-button--success.is-plain:focus,
.bu-button--success.is-plain:hover {
  background: #67c23a;
  border-color: #67c23a;
  color: #fff;
}
.bu-button--success.is-plain:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
  outline: 0;
}
.bu-button--success.is-plain.is-disabled,
.bu-button--success.is-plain.is-disabled:active,
.bu-button--success.is-plain.is-disabled:focus,
.bu-button--success.is-plain.is-disabled:hover {
  color: #a4da89;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.bu-button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.bu-button--warning:focus,
.bu-button--warning:hover {
  background: #ebb563;
  border-color: #ebb563;
  color: #fff;
}
.bu-button--warning.is-active,
.bu-button--warning:active {
  background: #cf9236;
  border-color: #cf9236;
  color: #fff;
}
.bu-button--warning:active {
  outline: 0;
}
.bu-button--warning.is-disabled,
.bu-button--warning.is-disabled:active,
.bu-button--warning.is-disabled:focus,
.bu-button--warning.is-disabled:hover {
  color: #fff;
  background-color: #f3d19e;
  border-color: #f3d19e;
}
.bu-button--warning.is-plain {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
}
.bu-button--warning.is-plain:focus,
.bu-button--warning.is-plain:hover {
  background: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
}
.bu-button--warning.is-plain:active {
  background: #cf9236;
  border-color: #cf9236;
  color: #fff;
  outline: 0;
}
.bu-button--warning.is-plain.is-disabled,
.bu-button--warning.is-plain.is-disabled:active,
.bu-button--warning.is-plain.is-disabled:focus,
.bu-button--warning.is-plain.is-disabled:hover {
  color: #f0c78a;
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.bu-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.bu-button--danger:focus,
.bu-button--danger:hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
.bu-button--danger.is-active,
.bu-button--danger:active {
  background: #dd6161;
  border-color: #dd6161;
  color: #fff;
}
.bu-button--danger:active {
  outline: 0;
}
.bu-button--danger.is-disabled,
.bu-button--danger.is-disabled:active,
.bu-button--danger.is-disabled:focus,
.bu-button--danger.is-disabled:hover {
  color: #fff;
  background-color: #fab6b6;
  border-color: #fab6b6;
}
.bu-button--danger.is-plain {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
.bu-button--danger.is-plain:focus,
.bu-button--danger.is-plain:hover {
  background: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}
.bu-button--danger.is-plain:active {
  background: #dd6161;
  border-color: #dd6161;
  color: #fff;
  outline: 0;
}
.bu-button--danger.is-plain.is-disabled,
.bu-button--danger.is-plain.is-disabled:active,
.bu-button--danger.is-plain.is-disabled:focus,
.bu-button--danger.is-plain.is-disabled:hover {
  color: #f9a7a7;
  background-color: #fef0f0;
  border-color: #fde2e2;
}
.bu-button--info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}
.bu-button--info:focus,
.bu-button--info:hover {
  background: #a6a9ad;
  border-color: #a6a9ad;
  color: #fff;
}
.bu-button--info.is-active,
.bu-button--info:active {
  background: #82848a;
  border-color: #82848a;
  color: #fff;
}
.bu-button--info:active {
  outline: 0;
}
.bu-button--info.is-disabled,
.bu-button--info.is-disabled:active,
.bu-button--info.is-disabled:focus,
.bu-button--info.is-disabled:hover {
  color: #fff;
  background-color: #c8c9cc;
  border-color: #c8c9cc;
}
.bu-button--info.is-plain {
  color: #909399;
  background: #f4f4f5;
  border-color: #d3d4d6;
}
.bu-button--info.is-plain:focus,
.bu-button--info.is-plain:hover {
  background: #909399;
  border-color: #909399;
  color: #fff;
}
.bu-button--info.is-plain:active {
  background: #82848a;
  border-color: #82848a;
  color: #fff;
  outline: 0;
}
.bu-button--info.is-plain.is-disabled,
.bu-button--info.is-plain.is-disabled:active,
.bu-button--info.is-plain.is-disabled:focus,
.bu-button--info.is-plain.is-disabled:hover {
  color: #bcbec2;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
}
.bu-button--text,
.bu-button--text.is-disabled,
.bu-button--text.is-disabled:focus,
.bu-button--text.is-disabled:hover,
.bu-button--text:active {
  border-color: transparent;
}
.bu-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.bu-button--mini,
.bu-button--small {
  font-size: 12px;
  border-radius: 3px;
}
.bu-button--medium.is-round {
  padding: 10px 20px;
}
.bu-button--medium.is-circle {
  padding: 10px;
}
.bu-button--small,
.bu-button--small.is-round {
  padding: 9px 15px;
}
.bu-button--small.is-circle {
  padding: 9px;
}
.bu-button--mini,
.bu-button--mini.is-round {
  padding: 7px 15px;
}
.bu-button--mini.is-circle {
  padding: 7px;
}
.bu-button--text {
  color: #409eff;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}
.bu-button--text:focus,
.bu-button--text:hover {
  color: #66b1ff;
  border-color: transparent;
  background-color: transparent;
}
.bu-button--text:active {
  color: #3a8ee6;
  background-color: transparent;
}
.bu-button-group {
  display: inline-block;
  vertical-align: middle;
}
.bu-button-group::after,
.bu-button-group::before {
  display: table;
  content: '';
}
.bu-button-group::after {
  clear: both;
}
.bu-button-group > .bu-button {
  float: left;
  position: relative;
}
.bu-button-group > .bu-button + .bu-button {
  margin-left: 0;
}
.bu-button-group > .bu-button:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.bu-button-group > .bu-button:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.bu-button-group > .bu-button:first-child:last-child {
  border-radius: 4px;
}
.bu-button-group > .bu-button:first-child:last-child.is-round {
  border-radius: 20px;
}
.bu-button-group > .bu-button:first-child:last-child.is-circle {
  border-radius: 50%;
}
.bu-button-group > .bu-button:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.bu-button-group > .bu-button:not(:last-child) {
  margin-right: -1px;
}
.bu-button-group > .bu-dropdown > .bu-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--primary:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--primary:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--primary:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--success:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--success:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--success:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--warning:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--warning:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--warning:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--danger:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--danger:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--danger:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--info:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--info:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}
.bu-button-group .bu-button--info:not(:first-child):not(:last-child) {
  border-left-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(255, 255, 255, 0.5);
}
.bu-popper .popper__arrow,
.bu-popper .popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.bu-popper .popper__arrow {
  border-width: 6px;
  -webkit-filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}
.bu-popper .popper__arrow::after {
  content: ' ';
  border-width: 6px;
}
.bu-popper[x-placement^='top'] {
  margin-bottom: 12px;
}
.bu-popper[x-placement^='top'] .popper__arrow {
  bottom: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-color: #ebeef5;
  border-bottom-width: 0;
}
.bu-popper[x-placement^='top'] .popper__arrow::after {
  bottom: 1px;
  margin-left: -6px;
  border-top-color: #fff;
  border-bottom-width: 0;
}
.bu-popper[x-placement^='bottom'] {
  margin-top: 12px;
}
.bu-popper[x-placement^='bottom'] .popper__arrow {
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}
.bu-popper[x-placement^='bottom'] .popper__arrow::after {
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
.bu-popper[x-placement^='right'] {
  margin-left: 12px;
}
.bu-popper[x-placement^='right'] .popper__arrow {
  top: 50%;
  left: -6px;
  margin-bottom: 3px;
  border-right-color: #ebeef5;
  border-left-width: 0;
}
.bu-popper[x-placement^='right'] .popper__arrow::after {
  bottom: -6px;
  left: 1px;
  border-right-color: #fff;
  border-left-width: 0;
}
.bu-popper[x-placement^='left'] {
  margin-right: 12px;
}
.bu-popper[x-placement^='left'] .popper__arrow {
  top: 50%;
  right: -6px;
  margin-bottom: 3px;
  border-right-width: 0;
  border-left-color: #ebeef5;
}
.bu-popper[x-placement^='left'] .popper__arrow::after {
  right: 1px;
  bottom: -6px;
  margin-left: -6px;
  border-right-width: 0;
  border-left-color: #fff;
}
.bu-dropdown {
  display: inline-block;
  position: relative;
  color: #606266;
  font-size: 14px;
}
.bu-dropdown .bu-button-group {
  display: block;
}
.bu-dropdown .bu-button-group .bu-button {
  float: none;
}
.bu-dropdown .bu-dropdown__caret-button {
  padding-left: 5px;
  padding-right: 5px;
  position: relative;
  border-left: none;
}
.bu-dropdown .bu-dropdown__caret-button::before {
  content: '';
  position: absolute;
  display: block;
  width: 1px;
  top: 5px;
  bottom: 5px;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
}
.bu-dropdown .bu-dropdown__caret-button.bu-button--default::before {
  background: rgba(220, 223, 230, 0.5);
}
.bu-dropdown .bu-dropdown__caret-button:hover::before {
  top: 0;
  bottom: 0;
}
.bu-dropdown .bu-dropdown__caret-button .bu-dropdown__icon {
  padding-left: 0;
}
.bu-dropdown__icon {
  font-size: 12px;
  margin: 0 3px;
}
.bu-dropdown .bu-dropdown-selfdefine:focus:active,
.bu-dropdown .bu-dropdown-selfdefine:focus:not(.focusing) {
  outline-width: 0;
}
.bu-dropdown-menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 10px 0;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bu-dropdown-menu__item {
  list-style: none;
  line-height: 36px;
  padding: 0 20px;
  margin: 0;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  outline: 0;
}
.bu-dropdown-menu__item:focus,
.bu-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}
.bu-dropdown-menu__item i {
  margin-right: 5px;
}
.bu-dropdown-menu__item--divided {
  position: relative;
  margin-top: 6px;
  border-top: 1px solid #ebeef5;
}
.bu-dropdown-menu__item--divided:before {
  content: '';
  height: 6px;
  display: block;
  margin: 0 -20px;
  background-color: #fff;
}
.bu-dropdown-menu__item.is-disabled {
  cursor: default;
  color: #bbb;
  pointer-events: none;
}
.bu-dropdown-menu--medium {
  padding: 6px 0;
}
.bu-dropdown-menu--medium .bu-dropdown-menu__item {
  line-height: 30px;
  padding: 0 17px;
  font-size: 14px;
}
.bu-dropdown-menu--medium
  .bu-dropdown-menu__item.bu-dropdown-menu__item--divided {
  margin-top: 6px;
}
.bu-dropdown-menu--medium
  .bu-dropdown-menu__item.bu-dropdown-menu__item--divided:before {
  height: 6px;
  margin: 0 -17px;
}
.bu-dropdown-menu--small {
  padding: 6px 0;
}
.bu-dropdown-menu--small .bu-dropdown-menu__item {
  line-height: 27px;
  padding: 0 15px;
  font-size: 13px;
}
.bu-dropdown-menu--small
  .bu-dropdown-menu__item.bu-dropdown-menu__item--divided {
  margin-top: 4px;
}
.bu-dropdown-menu--small
  .bu-dropdown-menu__item.bu-dropdown-menu__item--divided:before {
  height: 4px;
  margin: 0 -15px;
}
.bu-dropdown-menu--mini {
  padding: 3px 0;
}
.bu-dropdown-menu--mini .bu-dropdown-menu__item {
  line-height: 24px;
  padding: 0 10px;
  font-size: 12px;
}
.bu-dropdown-menu--mini
  .bu-dropdown-menu__item.bu-dropdown-menu__item--divided {
  margin-top: 3px;
}
.bu-dropdown-menu--mini
  .bu-dropdown-menu__item.bu-dropdown-menu__item--divided:before {
  height: 3px;
  margin: 0 -10px;
}
</style>