/**
 * @author 张英丹
 */
// 导入组件，组件必须声明 name
import Input from './src/input.vue'
// 为组件提供 install 安装方法，供按需引入
Input.install = function (Vue) {
  Vue.component(Input.name, Input)
}
// 默认导出组件
export default Input
