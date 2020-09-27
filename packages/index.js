// 导入颜色选择器组件
import Button from "./button";
import ButtonGroup from "./button-group";
import Breadcrumb from "./breadcrumb";
import BreadcrumbItem from "./breadcrumb-item";
import Dropdown from "./dropdown";
import DropdownItem from "./dropdown-item";
import DropdownMenu from "./dropdown-menu";
import Progress from './progress'
import Main from './main'
import Message from './message'
import Input from "./input";
import Divider from './divider'
// import ColorPicker from './color-picker'
// import Dialog from './dialog'
// import Checkbox from './checkbox'
// import Radio from './radio'
// import Switch from './switch'

import "./fonts/font.scss";


// 存储组件列表
const components = [
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Progress,
  Main,
  Divider,
  Input,
  // ColorPicker,
  // Dialog,
  // Checkbox,
  // Radio,
  // Switch
];
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 遍历注册全局组件
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$message = Message;
};
// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Progress,
  Main,
  Message,
  Divider,
  Input,
  // ColorPicker,
  // Dialog,
  // Checkbox,
  // Radio,
  // Switch
};
