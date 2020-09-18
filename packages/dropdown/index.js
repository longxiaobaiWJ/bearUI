import BUDropdown from "./src/dropdown";

/* istanbul ignore next */
BUDropdown.install = function(Vue) {
  Vue.component(BUDropdown.name, BUDropdown);
};

export default BUDropdown;
