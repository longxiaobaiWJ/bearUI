// 导入组件，组件必须声明 name
import Main from './src/main.vue'
// 为组件提供 install 安装方法，供按需引入
Main.install = function (Vue) {
  Vue.component(Main.name, Main)
}
// 默认导出组件
export default Main
