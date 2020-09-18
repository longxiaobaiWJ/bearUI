import buButtonGroup from "../button/src/button-group";

/* istanbul ignore next */
buButtonGroup.install = function(Vue) {
  Vue.component(buButtonGroup.name, buButtonGroup);
};

export default buButtonGroup;
