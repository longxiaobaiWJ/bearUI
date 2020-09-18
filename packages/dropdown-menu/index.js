import BUDropdownMenu from "../dropdown/src/dropdown-menu";

/* istanbul ignore next */
BUDropdownMenu.install = function(Vue) {
  Vue.component(BUDropdownMenu.name, BUDropdownMenu);
};

export default BUDropdownMenu;
