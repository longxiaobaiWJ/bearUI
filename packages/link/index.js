// 导入组件，组件必须声明 name
import Link from './src/link.vue'
// 为组件提供 install 安装方法，供按需引入
Link.install = function (Vue) {
  Vue.component(Link.name, Link)
}
// 默认导出组件
export default Link
