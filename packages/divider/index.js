// 导入组件，组件必须声明 name
import Divider from './src/divider'
// 为组件提供 install 安装方法，供按需引入
Divider.install = function (Vue) {
  Vue.component(Divider.name, Divider)
}
// 默认导出组件
export default Divider
